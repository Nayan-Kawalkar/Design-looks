import { spawn } from 'child_process';

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:5173";
const width = process.argv[2] || "1440";
const height = process.argv[3] || "900";
const PORT = 9240;

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--disable-gpu",
  `--window-size=${width},${height}`,
  "--no-first-run",
  `--user-data-dir=C:/Users/pathf/AppData/Local/Temp/chrome-cdp-wheel-${width}x${height}`,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/json`);
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
  return { sectionDocTop: Math.round(r0.top + window.scrollY), innerWidth: window.innerWidth, innerHeight: window.innerHeight };
})()`);

// scroll down to just above the pin start using wheel, then walk through pin
async function wheel(deltaY) {
  await send("Input.dispatchMouseEvent", {
    type: "mouseWheel",
    x: Math.round(width / 2),
    y: Math.round(height / 2),
    deltaX: 0,
    deltaY,
  });
}

const results = [];
// approach
let y = await evalJs(`window.scrollY`);
while (y < info.sectionDocTop - 50) {
  await wheel(600);
  await sleep(120);
  y = await evalJs(`window.scrollY`);
}
// walk through pin + beyond
for (let i = 0; i < 14; i++) {
  await wheel(500);
  await sleep(350);
  const s = await evalJs(`(() => {
    const cards = [...document.querySelectorAll('.playground-card')];
    const last = cards[cards.length - 1];
    const lr = last.getBoundingClientRect();
    const c5 = cards[4].getBoundingClientRect();
    const c6 = cards[5].getBoundingClientRect();
    return {
      y: Math.round(window.scrollY),
      lastRight: Math.round(lr.right),
      lastLeft: Math.round(lr.left),
      c5InVp: c5.right > 0 && c5.left < window.innerWidth && c5.bottom > 0 && c5.top < window.innerHeight,
      c6InVp: c6.right > 0 && c6.left < window.innerWidth && c6.bottom > 0 && c6.top < window.innerHeight,
    };
  })()`);
  results.push(s);
}

const anyVisible = results.some((r) => r.c6InVp);
const bestRight = Math.min(...results.map((r) => (r.lastRight > 0 ? r.lastRight : 99999)));
console.log(`WHEEL ${width}x${height} inner=${info.innerWidth}x${info.innerHeight} sectionTop=${info.sectionDocTop}`);
console.log(`c6 became visible during wheel walk: ${anyVisible} | best last-right: ${bestRight} | best step: ${JSON.stringify(results.reduce((a, b) => (a.lastRight < b.lastRight && b.lastRight > 0 ? a : b), results[0]))}`);

ws.close();
chrome.kill();
process.exit(0);
