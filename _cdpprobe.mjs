import { spawn } from 'child_process';

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9223;
const URL = "http://localhost:5173";

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--disable-gpu",
  "--window-size=1440,900",
  "--no-first-run",
  "--user-data-dir=C:/Users/pathf/AppData/Local/Temp/chrome-cdp-test2",
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
await sleep(4500);

async function evalJs(expr) {
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails));
  return res.result.value;
}

const probe = await evalJs(`(() => {
  const out = [];
  const section = document.querySelector('.playground-section');
  const track = document.querySelector('.playground-track');
  const lastCard = [...document.querySelectorAll('.playground-card')].slice(-1)[0];
  const cards = [...document.querySelectorAll('.playground-card')];
  const rect0 = section.getBoundingClientRect();
  out.push('section doc offset (scrollY=0): rect.top=' + Math.round(rect0.top + window.scrollY) + ' rect.height=' + Math.round(rect0.height));
  out.push('track scrollWidth=' + track.scrollWidth + ' viewport=' + window.innerWidth + ' computedWidth=' + getComputedStyle(track).width);
  out.push('track transform=' + getComputedStyle(track).transform);
  out.push('maxScroll=' + (document.documentElement.scrollHeight - window.innerHeight));
  // stepwise scroll
  const results = [];
  for (let y = 0; y <= document.documentElement.scrollHeight; y += 400) {
    window.scrollTo(0, y);
  }
  // after overscroll to bottom
  window.scrollTo(0, document.documentElement.scrollHeight);
  results.push('after scroll to bottom: scrollY=' + window.scrollY);
  const r = lastCard.getBoundingClientRect();
  results.push('last card rect at bottom: left=' + Math.round(r.left) + ' right=' + Math.round(r.right) + ' top=' + Math.round(r.top));
  results.push('track transform now=' + getComputedStyle(track).transform);
  // now go back up to find where last card is in view
  for (let y = document.documentElement.scrollHeight; y > 0; y -= 100) {
    window.scrollTo(0, y);
    const rr = lastCard.getBoundingClientRect();
    if (rr.right <= window.innerWidth && rr.right > 0) {
      results.push('last card fully reachable at scrollY=' + y + ' right=' + Math.round(rr.right));
      break;
    }
  }
  return { log: out, results };
})()`);
console.log("PROBE:", JSON.stringify(probe, null, 2));

ws.close();
chrome.kill();
process.exit(0);
