import { spawn } from 'child_process';

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:5173";
const width = process.argv[2] || "1440";
const height = process.argv[3] || "900";

const chrome = spawn(CHROME, [
  `--remote-debugging-port=9230`,
  "--headless=new",
  "--disable-gpu",
  `--window-size=${width},${height}`,
  "--no-first-run",
  `--user-data-dir=C:/Users/pathf/AppData/Local/Temp/chrome-cdp-w${width}`,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://localhost:9230/json`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {}
    await sleep(400);
  }
  throw new Error("no cdp endpoint");
}

const ws = new WebSocket(await getWsUrl());
let id = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
};

await new Promise((r) => (ws.onopen = r));
await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: URL });
await sleep(5000);

async function evalJs(expr) {
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails?.text));
  return res.result.value;
}

const info = await evalJs(`(() => {
  const section = document.querySelector('.playground-section');
  const r0 = section.getBoundingClientRect();
  return { sectionDocTop: Math.round(r0.top + window.scrollY), innerWidth: window.innerWidth };
})()`);

const results = [];
let y = info.sectionDocTop - 100;
const maxY = info.sectionDocTop + 2600;
let bestRight = 9999;
while (y < maxY) {
  await evalJs(`window.scrollTo(0, ${y})`);
  await sleep(500);
  const s = await evalJs(`(() => {
    const cards = [...document.querySelectorAll('.playground-card')];
    const last = cards[cards.length - 1];
    const lr = last.getBoundingClientRect();
    const c5 = cards[4].getBoundingClientRect();
    const c6 = cards[5].getBoundingClientRect();
    return {
      y: window.scrollY,
      lastRight: Math.round(lr.right),
      lastLeft: Math.round(lr.left),
      c5InVp: c5.right > 0 && c5.left < window.innerWidth,
      c6InVp: c6.right > 0 && c6.left < window.innerWidth,
    };
  })()`);
  if (s.lastRight > 0 && s.lastRight < bestRight) bestRight = s.lastRight;
  results.push(s);
  y += 250;
}

const end = results[results.length - 1];
console.log(`WIDTH=${width}x${height} innerWidth=${info.innerWidth} sectionTop=${info.sectionDocTop}`);
console.log(`best last-card right edge during walk: ${bestRight} (viewport ${info.innerWidth}) => lastCardReachable=${bestRight < info.innerWidth}`);
console.log(`final step: y=${end.y} lastRight=${end.lastRight} c5=${end.c5InVp} c6=${end.c6InVp}`);

ws.close();
chrome.kill();
process.exit(0);
