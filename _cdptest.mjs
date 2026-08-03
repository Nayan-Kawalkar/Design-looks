import { spawn } from 'child_process';

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9222;
const URL = "http://localhost:5173";

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new", "--window-size=1440,900",
  "--disable-gpu",
  "--no-first-run",
  "--user-data-dir=C:/Users/pathf/AppData/Local/Temp/chrome-cdp-test",
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
await sleep(4000);

async function evalJs(expr) {
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails));
  return res.result.value;
}

const initial = await evalJs(`(() => {
  const cards = document.querySelectorAll('.playground-card');
  const track = document.querySelector('.playground-track');
  return {
    cardCount: cards.length,
    trackWidth: track ? track.scrollWidth : 0,
    viewportW: window.innerWidth,
    hasImages: [...document.querySelectorAll('.playground-card-image img, .playground-card-image video')].map(el => el.tagName + ':' + (el.tagName === 'IMG' ? (el.complete ? el.naturalWidth + 'x' + el.naturalHeight : 'not-loaded') : 'video')),
  };
})()`);
console.log("INITIAL:", JSON.stringify(initial));

const section = await evalJs(`(() => { const s = document.querySelector('.playground-section'); const t = document.querySelector('.playground-track'); return { top: s.offsetTop, scrollAmt: t.scrollWidth - window.innerWidth }; })()`);
console.log("SECTION:", JSON.stringify(section));

const targetY = section.top + section.scrollAmt + 400;
await evalJs(`window.scrollTo(0, ${targetY})`);
await sleep(1200);

const atEnd = await evalJs(`(() => {
  const cards = [...document.querySelectorAll('.playground-card')];
  return {
    scrollY: window.scrollY,
    maxScroll: document.documentElement.scrollHeight - window.innerHeight,
    cards: cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { title: c.querySelector('.playground-card-title').textContent, left: Math.round(r.left), right: Math.round(r.right), inViewport: r.left < window.innerWidth && r.right > 0 };
    }),
  };
})()`);
console.log("AT_END:", JSON.stringify(atEnd));

ws.close();
chrome.kill();
process.exit(0);

