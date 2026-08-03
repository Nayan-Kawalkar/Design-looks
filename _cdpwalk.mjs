import { spawn } from 'child_process';

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9224;
const URL = "http://localhost:5173";

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--disable-gpu",
  "--window-size=1440,900",
  "--no-first-run",
  "--user-data-dir=C:/Users/pathf/AppData/Local/Temp/chrome-cdp-test3",
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
const consoleMsgs = [];

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.method === "Runtime.consoleAPICalled") {
    const args = msg.params.args.map((a) => a.value ?? a.description ?? "").join(" ");
    consoleMsgs.push(`[${msg.params.type}] ${args}`);
  }
  if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
    consoleMsgs.push(`[log-error] ${msg.params.entry.text}`);
  }
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
await send("Log.enable");
await send("Page.navigate", { url: URL });
await sleep(5000);

async function evalJs(expr) {
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails?.text));
  return res.result.value;
}

const info = await evalJs(`(() => {
  const section = document.querySelector('.playground-section');
  const track = document.querySelector('.playground-track');
  const spacer = document.querySelector('.pin-spacer');
  const last = [...document.querySelectorAll('.playground-card')].slice(-1)[0];
  const first = document.querySelector('.playground-card');
  const r0 = section.getBoundingClientRect();
  return {
    sectionDocTop: Math.round(r0.top + window.scrollY),
    spacerExists: !!spacer,
    spacerHasSection: spacer ? spacer.contains(section) : false,
    sectionPosition: getComputedStyle(section).position,
    trackTransform: getComputedStyle(track).transform,
    firstCardTop: Math.round(first.getBoundingClientRect().top + window.scrollY),
    scrollY: window.scrollY,
    maxScroll: document.documentElement.scrollHeight - window.innerHeight,
  };
})()`);
console.log("INFO:", JSON.stringify(info, null, 2));

const startY = info.sectionDocTop;
const walk = [];
let y = startY - 200;
while (y < startY + 2500) {
  await evalJs(`window.scrollTo(0, ${y})`);
  await sleep(600);
  const s = await evalJs(`(() => {
    const track = document.querySelector('.playground-track');
    const last = [...document.querySelectorAll('.playground-card')].slice(-1)[0];
    const section = document.querySelector('.playground-section');
    const lr = last.getBoundingClientRect();
    const sr = section.getBoundingClientRect();
    return {
      y: window.scrollY,
      trackTx: new DOMMatrix(getComputedStyle(track).transform).m41,
      lastLeft: Math.round(lr.left),
      lastRight: Math.round(lr.right),
      lastInVp: lr.right > 0 && lr.left < window.innerWidth,
      secPos: getComputedStyle(section).position,
      secTop: Math.round(sr.top),
    };
  })()`);
  walk.push(s);
  y += 300;
}

console.log("WALK:");
for (const w of walk) console.log(JSON.stringify(w));
console.log("CONSOLE (errors/warnings):");
console.log(consoleMsgs.filter((m) => m.includes("error") || m.includes("warn") || m.includes("fail") || m.includes("404") || m.includes("deprecat")).join("\n") || "(none)");
console.log("ALL CONSOLE: " + (consoleMsgs.length ? consoleMsgs.join(" | ") : "(none)"));

ws.close();
chrome.kill();
process.exit(0);
