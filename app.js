(() => {
  const ANDROID_MODELS = [
    { id: "pixel", name: "Pixelish 9", color: "linear-gradient(160deg,#4a5568,#1a202c)" },
    { id: "nova", name: "Nova X1", color: "linear-gradient(160deg,#2a2d35,#0e0f12)" },
    { id: "aurora", name: "Aurora Pro", color: "linear-gradient(160deg,#1a3a4a,#0a1520)" },
    { id: "void", name: "Void Ultra", color: "#000" },
    { id: "gold", name: "Gold Limited", color: "linear-gradient(160deg,#d4a017,#5c3d0a)" },
  ];
  const IOS_MODELS = [
    { id: "iphone15", name: "iPhone 15", color: "linear-gradient(160deg,#3a3a3c,#0a0a0a)" },
    { id: "iphone-blue", name: "iPhone Blue", color: "linear-gradient(160deg,#4a6fa5,#1a2a40)" },
    { id: "iphone-pink", name: "iPhone Pink", color: "linear-gradient(160deg,#e8a0b0,#5a3040)" },
    { id: "void", name: "iPhone Black", color: "#000" },
  ];
  const GAMES = [
    { id: "cookie", name: "Cookie Clicker", icon: "🍪", color: "#d97706" },
    { id: "gems", name: "Idle Gems", icon: "💎", color: "#8b5cf6" },
    { id: "mine", name: "Mine Click", icon: "⛏️", color: "#78716c" },
    { id: "rocket", name: "Rocket Idle", icon: "🚀", color: "#3b82f6" },
    { id: "shooter", name: "Space Shooter", icon: "🔫", color: "#0ea5e9" },
    { id: "zombie", name: "Zombie Wave", icon: "🧟", color: "#22c55e" },
    { id: "arena", name: "Tap Arena", icon: "🎯", color: "#ef4444" },
    { id: "drift", name: "Drift Sim", icon: "🏎️", color: "#f59e0b" },
  ];
  const REAL_ANDROID = [
    { name: "Subway Surfers", icon: "🏄", url: "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf" },
    { name: "Clash of Clans", icon: "🏰", url: "https://play.google.com/store/apps/details?id=com.supercell.clashofclans" },
    { name: "Roblox", icon: "🧱", url: "https://play.google.com/store/apps/details?id=com.roblox.client" },
    { name: "Minecraft", icon: "🟫", url: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe" },
    { name: "Brawl Stars", icon: "⭐", url: "https://play.google.com/store/apps/details?id=com.supercell.brawlstars" },
    { name: "Genshin Impact", icon: "⚔️", url: "https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact" },
  ];
  const REAL_IOS = [
    { name: "Subway Surfers", icon: "🏄", url: "https://apps.apple.com/app/subway-surfers/id512939461" },
    { name: "Clash of Clans", icon: "🏰", url: "https://apps.apple.com/app/clash-of-clans/id529479190" },
    { name: "Roblox", icon: "🧱", url: "https://apps.apple.com/app/roblox/id431946152" },
    { name: "Minecraft", icon: "🟫", url: "https://apps.apple.com/app/minecraft/id479516143" },
    { name: "Brawl Stars", icon: "⭐", url: "https://apps.apple.com/app/brawl-stars/id1229016807" },
    { name: "Genshin Impact", icon: "⚔️", url: "https://apps.apple.com/app/genshin-impact/id1517783697" },
  ];
  const state = {
    os: "android", model: "pixel", screen: "home", gameLoop: null,
    cookie: { n: 0, perClick: 1, perSec: 0 },
    gems: { n: 0, perClick: 1, perSec: 0 },
    mine: { n: 0, perClick: 1, perSec: 0 },
    rocket: { n: 0, perClick: 1, perSec: 0 },
  };
  const phone = document.getElementById("phone");
  const screen = document.getElementById("screen");
  const modelList = document.getElementById("modelList");
  const clockEl = document.getElementById("clock");
  const statusRight = document.getElementById("statusRight");
  const btnAndroid = document.getElementById("osAndroid");
  const btnIOS = document.getElementById("osIOS");
  function tickClock() {
    const d = new Date();
    clockEl.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  tickClock();
  setInterval(tickClock, 15000);
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    screen.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  function stopGameLoop() {
    if (state.gameLoop) { cancelAnimationFrame(state.gameLoop); state.gameLoop = null; }
  }
  function setOS(os) {
    state.os = os;
    phone.classList.toggle("os-android", os === "android");
    phone.classList.toggle("os-ios", os === "ios");
    btnAndroid.classList.toggle("active", os === "android");
    btnIOS.classList.toggle("active", os === "ios");
    btnIOS.classList.toggle("ios-active", os === "ios");
    statusRight.textContent = os === "ios" ? "5G  ·  🔋" : "5G · 84%";
    const models = os === "ios" ? IOS_MODELS : ANDROID_MODELS;
    state.model = models[0].id;
    renderModels();
    setModel(state.model);
    goHome();
  }
  function setModel(id) {
    state.model = id;
    const keep = state.os === "ios" ? "os-ios" : "os-android";
    phone.className = "phone " + keep + " model-" + id;
    document.querySelectorAll(".model-btn").forEach((b) => b.classList.toggle("active", b.dataset.id === id));
  }
  function renderModels() {
    const models = state.os === "ios" ? IOS_MODELS : ANDROID_MODELS;
    modelList.innerHTML = "";
    models.forEach((m) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "model-btn" + (state.model === m.id ? " active" : "");
      btn.dataset.id = m.id;
      btn.innerHTML = `<div class="model-swatch" style="background:${m.color}"></div><div><b style="font-size:0.85rem">${m.name}</b></div>`;
      btn.onclick = () => setModel(m.id);
      modelList.appendChild(btn);
    });
  }
  function openApp(id) { stopGameLoop(); state.screen = id; render(); }
  function goHome() { stopGameLoop(); state.screen = "home"; render(); }
  function goBack() { if (state.screen !== "home") goHome(); }
  function homeIcons() {
    const store = state.os === "ios"
      ? { id: "appstore", name: "App Store", icon: "A", color: "#0a84ff" }
      : { id: "play", name: "Play", icon: "▶", color: "#34d399" };
    return [store, ...GAMES.map((g) => ({ id: g.id, name: g.name.split(" ")[0], icon: g.icon, color: g.color }))];
  }
  function renderHome() {
    const grid = homeIcons().map((a) => `
      <button type="button" class="app-icon" data-open="${a.id}">
        <div class="ico" style="background:${a.color}">${a.icon}</div><span>${a.name}</span>
      </button>`).join("");
    const dock = state.os === "ios" ? `<div class="ios-dock">
      <button type="button" class="app-icon" data-open="appstore"><div class="ico" style="background:#0a84ff">A</div></button>
      <button type="button" class="app-icon" data-open="cookie"><div class="ico" style="background:#d97706">🍪</div></button>
      <button type="button" class="app-icon" data-open="shooter"><div class="ico" style="background:#0ea5e9">🔫</div></button>
      <button type="button" class="app-icon" data-open="arena"><div class="ico" style="background:#ef4444">🎯</div></button>
    </div>` : "";
    return `<div class="home"><div class="home-grid">${grid}</div>${dock}</div>`;
  }
  function renderStore() {
    const isIOS = state.os === "ios";
    const title = isIOS ? "App Store" : "Play Store";
    const real = isIOS ? REAL_IOS : REAL_ANDROID;
    const btnCls = isIOS ? "btn btn-ios" : "btn btn-get";
    const builtIn = GAMES.map((g) => `
      <div class="store-card">
        <div class="ico" style="background:${g.color}">${g.icon}</div>
        <div class="meta"><b>${g.name}</b><small>Встроено · PhoneSim</small></div>
        <button type="button" class="${btnCls}" data-open="${g.id}">Играть</button>
      </div>`).join("");
    const external = real.map((g) => `
      <div class="store-card">
        <div class="ico" style="background:#333">${g.icon}</div>
        <div class="meta"><b>${g.name}</b><small>Реальный ${isIOS ? "App Store" : "Google Play"}</small></div>
        <a class="${btnCls}" href="${g.url}" target="_blank" rel="noopener">Открыть</a>
      </div>`).join("");
    return `<div class="app-view"><div class="app-header">${title}</div><div class="app-body">
      <p style="color:#8b93a7;font-size:0.75rem;margin-bottom:8px">Мини-игры внутри телефона</p>${builtIn}
      <p style="color:#8b93a7;font-size:0.75rem;margin:12px 0 8px">Настоящий магазин</p>${external}
    </div></div>`;
  }
  function clickerUI(key, emoji, label) {
    const d = state[key];
    return `<div class="app-view"><div class="app-header">${emoji} ${label}</div><div class="app-body">
      <div class="stat-line"><b id="cVal">${Math.floor(d.n)}</b> · +${d.perSec}/сек</div>
      <button type="button" class="clicker-big" id="cBtn">${emoji}</button>
      <div class="upgrade-row"><span>Сила клика (x${d.perClick})</span>
        <button type="button" class="btn btn-get" id="upClick">Купить ${10 * d.perClick}</button></div>
      <div class="upgrade-row"><span>Авто (+1/сек)</span>
        <button type="button" class="btn btn-get" id="upAuto">Купить ${25 * (d.perSec + 1)}</button></div>
    </div></div>`;
  }
  function bindClicker(key) {
    const d = state[key];
    const val = document.getElementById("cVal");
    const btn = document.getElementById("cBtn");
    const upC = document.getElementById("upClick");
    const upA = document.getElementById("upAuto");
    if (btn) btn.onclick = () => { d.n += d.perClick; if (val) val.textContent = Math.floor(d.n); };
    if (upC) upC.onclick = () => { const cost = 10 * d.perClick; if (d.n >= cost) { d.n -= cost; d.perClick++; render(); } else toast("Мало ресурсов"); };
    if (upA) upA.onclick = () => { const cost = 25 * (d.perSec + 1); if (d.n >= cost) { d.n -= cost; d.perSec++; render(); } else toast("Мало ресурсов"); };
    const iv = setInterval(() => {
      if (state.screen !== key) { clearInterval(iv); return; }
      d.n += d.perSec / 10;
      const v = document.getElementById("cVal");
      if (v) v.textContent = Math.floor(d.n);
    }, 100);
  }
  function renderShooter(title, zombieMode) {
    return `<div class="app-view"><div class="app-header">${zombieMode ? "🧟" : "🔫"} ${title}</div>
      <div class="app-body game-wrap">
        <div class="game-hud"><span>Очки: <b id="gScore">0</b></span><span>Жизни: <b id="gHp">3</b></span></div>
        <canvas class="game-canvas" id="gCanvas" width="280" height="320"></canvas>
        <p style="text-align:center;color:#8b93a7;font-size:0.7rem;margin-top:6px">Тап = стрельба</p>
      </div></div>`;
  }
  function startShooter(zombieMode) {
    const canvas = document.getElementById("gCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let score = 0, hp = 3, px = 140, bullets = [], enemies = [], t = 0, over = false;
    function spawn() {
      enemies.push({ x: 20 + Math.random() * 240, y: -20, s: zombieMode ? 1.2 + Math.random() : 1.5 + Math.random() * 1.5, r: zombieMode ? 14 : 10 });
    }
    function draw() {
      if (state.screen !== "shooter" && state.screen !== "zombie") return;
      ctx.fillStyle = zombieMode ? "#0a1a0a" : "#060a14";
      ctx.fillRect(0, 0, 280, 320);
      ctx.fillStyle = "#fff4";
      for (let i = 0; i < 30; i++) ctx.fillRect((i * 47) % 280, (i * 71 + t) % 320, 2, 2);
      ctx.fillStyle = zombieMode ? "#4ade80" : "#38bdf8";
      ctx.fillRect(px - 14, 290, 28, 18);
      bullets.forEach((b) => { ctx.fillStyle = "#fde047"; ctx.fillRect(b.x - 2, b.y, 4, 10); });
      enemies.forEach((e) => { ctx.fillStyle = zombieMode ? "#86efac" : "#f87171"; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill(); });
      if (over) { ctx.fillStyle = "#fff"; ctx.font = "16px Inter"; ctx.fillText("Game Over · " + score, 70, 160); }
    }
    function loop() {
      if (over) { draw(); return; }
      t++;
      if (t % 40 === 0) spawn();
      bullets.forEach((b) => (b.y -= 8));
      bullets = bullets.filter((b) => b.y > -10);
      enemies.forEach((e) => (e.y += e.s));
      enemies = enemies.filter((e) => {
        for (let i = 0; i < bullets.length; i++) {
          const b = bullets[i];
          if (Math.hypot(b.x - e.x, b.y - e.y) < e.r + 4) { bullets.splice(i, 1); score += 10; document.getElementById("gScore").textContent = score; return false; }
        }
        if (e.y > 300) { hp--; document.getElementById("gHp").textContent = hp; if (hp <= 0) over = true; return false; }
        return true;
      });
      draw();
      state.gameLoop = requestAnimationFrame(loop);
    }
    canvas.onpointerdown = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 280;
      if (over) return;
      px = Math.max(20, Math.min(260, x));
      bullets.push({ x: px, y: 280 });
    };
    state.gameLoop = requestAnimationFrame(loop);
  }
  function renderArena() {
    return `<div class="app-view"><div class="app-header">🎯 Tap Arena</div><div class="app-body" style="text-align:center">
      <div class="stat-line">Очки: <b id="aScore">0</b> · Время: <b id="aTime">20</b></div>
      <button type="button" class="clicker-big" id="aBtn" style="background:radial-gradient(circle at 30% 30%,#f87171,#b91c1c)">🎯</button>
      <button type="button" class="btn btn-get" id="aStart">Старт 20 сек</button>
    </div></div>`;
  }
  function bindArena() {
    let score = 0, left = 0, timer = null;
    const btn = document.getElementById("aBtn");
    const start = document.getElementById("aStart");
    const sEl = document.getElementById("aScore");
    const tEl = document.getElementById("aTime");
    if (btn) btn.onclick = () => { if (left <= 0) return; score++; if (sEl) sEl.textContent = score; };
    if (start) start.onclick = () => {
      score = 0; left = 20; if (sEl) sEl.textContent = "0"; if (tEl) tEl.textContent = "20";
      clearInterval(timer);
      timer = setInterval(() => { left--; if (tEl) tEl.textContent = left; if (left <= 0) { clearInterval(timer); toast("Итог: " + score); } }, 1000);
    };
  }
  function renderDrift() {
    return `<div class="app-view"><div class="app-header">🏎️ Drift Sim</div><div class="app-body game-wrap">
      <div class="game-hud"><span>Скорость: <b id="dSpd">0</b></span><span>Дрифт: <b id="dDrift">0</b></span></div>
      <canvas class="game-canvas" id="dCanvas" width="280" height="320"></canvas>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
        <button type="button" class="btn btn-open" id="dLeft">◀</button>
        <button type="button" class="btn btn-get" id="dGas">Газ</button>
        <button type="button" class="btn btn-open" id="dRight">▶</button>
      </div>
    </div></div>`;
  }
  function startDrift() {
    const canvas = document.getElementById("dCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let x = 140, spd = 0, drift = 0, angle = 0, gas = false, dir = 0;
    document.getElementById("dGas").onpointerdown = () => (gas = true);
    document.getElementById("dGas").onpointerup = () => (gas = false);
    document.getElementById("dGas").onpointerleave = () => (gas = false);
    document.getElementById("dLeft").onpointerdown = () => (dir = -1);
    document.getElementById("dLeft").onpointerup = () => (dir = 0);
    document.getElementById("dRight").onpointerdown = () => (dir = 1);
    document.getElementById("dRight").onpointerup = () => (dir = 0);
    function loop() {
      if (state.screen !== "drift") return;
      if (gas) spd = Math.min(12, spd + 0.15); else spd = Math.max(0, spd - 0.1);
      if (dir && spd > 1) { angle += dir * 0.04; drift += Math.abs(dir) * spd * 0.1; }
      x += Math.sin(angle) * spd; x = Math.max(30, Math.min(250, x));
      ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 0, 280, 320);
      ctx.strokeStyle = "#444"; ctx.lineWidth = 2;
      for (let y = 0; y < 320; y += 40) { ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(140, y + 20); ctx.stroke(); }
      ctx.save(); ctx.translate(x, 260); ctx.rotate(angle); ctx.fillStyle = "#f59e0b"; ctx.fillRect(-12, -20, 24, 40); ctx.restore();
      document.getElementById("dSpd").textContent = Math.floor(spd * 10);
      document.getElementById("dDrift").textContent = Math.floor(drift);
      state.gameLoop = requestAnimationFrame(loop);
    }
    state.gameLoop = requestAnimationFrame(loop);
  }
  function render() {
    stopGameLoop();
    let html = "";
    if (state.screen === "home") html = renderHome();
    else if (state.screen === "play" || state.screen === "appstore") html = renderStore();
    else if (state.screen === "cookie") html = clickerUI("cookie", "🍪", "Cookie Clicker");
    else if (state.screen === "gems") html = clickerUI("gems", "💎", "Idle Gems");
    else if (state.screen === "mine") html = clickerUI("mine", "⛏️", "Mine Click");
    else if (state.screen === "rocket") html = clickerUI("rocket", "🚀", "Rocket Idle");
    else if (state.screen === "shooter") html = renderShooter("Space Shooter", false);
    else if (state.screen === "zombie") html = renderShooter("Zombie Wave", true);
    else if (state.screen === "arena") html = renderArena();
    else if (state.screen === "drift") html = renderDrift();
    else html = renderHome();
    screen.innerHTML = html;
    screen.querySelectorAll("[data-open]").forEach((el) => { el.onclick = () => openApp(el.dataset.open); });
    if (["cookie", "gems", "mine", "rocket"].includes(state.screen)) bindClicker(state.screen);
    if (state.screen === "shooter") startShooter(false);
    if (state.screen === "zombie") startShooter(true);
    if (state.screen === "arena") bindArena();
    if (state.screen === "drift") startDrift();
  }
  btnAndroid.onclick = () => setOS("android");
  btnIOS.onclick = () => setOS("ios");
  document.getElementById("btnHome").onclick = goHome;
  document.getElementById("btnBack").onclick = goBack;
  document.getElementById("btnRecent").onclick = () => toast("Недавние");
  document.getElementById("iosHome").onclick = goHome;
  setOS("android");
})();
