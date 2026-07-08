// ============================================================
// 千葉大ナビ MVP
// 画面: top / quiz / result / list
// ============================================================

const state = {
  step: 0,            // 0=キャンパス 1=部活orサークル 2〜13=スライダー 14=金額 15=頻度
  campus: null,
  pref: null,          // club / circle / any
  budget: null,        // 5000 / 15000 / 30000 / null(こだわらない)
  freq: null,          // 1 / 3 / 7
  scores: { a: 0, g: 0, w: 0, s: 0, drink: 0, event: 0, exp: 0, gender: 0 },
  answers: [],
  typeKey: null,
  resultKubun: "all",
  listKubun: "all"
};

const TOTAL_STEPS = 16;

function show(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById("view-" + id).classList.remove("hidden");
  window.scrollTo(0, 0);
  if (id === "list") renderList();
}

// ---------------- 診断フロー ----------------
function startQuiz() {
  state.step = 0;
  state.campus = null; state.pref = null; state.budget = null; state.freq = null;
  state.scores = { a: 0, g: 0, w: 0, s: 0, drink: 0, event: 0, exp: 0, gender: 0 };
  state.answers = [];
  show("quiz");
  renderStep();
}

function renderStep() {
  const bar = document.getElementById("quiz-bar");
  bar.style.width = Math.round((state.step / TOTAL_STEPS) * 100) + "%";
  const body = document.getElementById("quiz-body");
  const s = state.step;

  if (s === 0) {
    body.innerHTML = stepHTML("Q1", "キャンパスは?", optButtons([
      ["西千葉", "nishichiba"], ["亥鼻", "inohana"], ["松戸", "matsudo"]
    ], "answerCampus"));
  } else if (s === 1) {
    body.innerHTML = stepHTML("Q2", "部活とサークル、どっち?", optButtons([
      ["部活も視野に入れたい", "club"], ["サークル中心で考えたい", "circle"], ["まだ決めてない", "any"]
    ], "answerPref"), true);
  } else if (s >= 2 && s <= 13) {
    const q = QUESTIONS[s - 2];
    body.innerHTML = stepHTML("Q" + (s + 1), q.text, scaleHTML(), true);
  } else if (s === 14) {
    body.innerHTML = stepHTML("Q15", "半年で出せる金額は?<span style='display:block;font-size:13px;color:var(--sub);font-weight:400;margin-top:4px'>(会費のみ・合宿等は別)</span>", optButtons([
      ["〜5,000円", "5000"], ["〜15,000円", "15000"], ["〜30,000円", "30000"], ["こだわらない", "any"]
    ], "answerBudget"), true);
  } else if (s === 15) {
    body.innerHTML = stepHTML("Q16", "週何日活動できる?", optButtons([
      ["週1以下", "1"], ["週2〜3", "3"], ["週4以上OK", "7"]
    ], "answerFreq"), true);
  }
}

function stepHTML(no, q, inner, backBtn) {
  return `<div class="quiz-step">
    <p class="quiz-no">${no} / ${TOTAL_STEPS}</p>
    <h2 class="quiz-q">${q}</h2>
    ${inner}
    ${backBtn ? '<button class="quiz-back" onclick="goBack()">← ひとつ戻る</button>' : ""}
  </div>`;
}

function optButtons(opts, fn) {
  return '<div class="opt-list">' + opts.map(([label, val]) =>
    `<button class="opt" onclick="${fn}('${val}')">${label}</button>`
  ).join("") + "</div>";
}

function scaleHTML() {
  const dots = [
    [3, "s3 agree"], [2, "s2 agree"], [1, "s1 agree"],
    [0, "s0 neutral"],
    [-1, "s1 disagree"], [-2, "s2 disagree"], [-3, "s3 disagree"]
  ].map(([v, cls]) =>
    `<button class="scale-dot ${cls}" aria-label="${v}" onclick="answerScale(${v})"></button>`
  ).join("");
  return `<div class="scale">${dots}</div>
    <div class="scale-labels"><span class="l-agree">そう思う</span><span class="l-disagree">そう思わない</span></div>`;
}

function answerCampus(v) { state.campus = v; next(); }
function answerPref(v)   { state.pref = v; next(); }
function answerBudget(v) { state.budget = v === "any" ? null : Number(v); next(); }
function answerFreq(v)   { state.freq = Number(v); finishQuiz(); }

function answerScale(v) {
  const q = QUESTIONS[state.step - 2];
  const val = q.rev ? -v : v;
  state.scores[q.axis] += val;
  state.answers.push({ step: state.step, axis: q.axis, val });
  next();
}

function goBack() {
  if (state.step <= 0) return;
  if (state.step >= 3 && state.step <= 14) {
    const last = state.answers.pop();
    if (last) state.scores[last.axis] -= last.val;
  }
  state.step--;
  renderStep();
}

function next() { state.step++; renderStep(); }

function finishQuiz() {
  const sc = state.scores;
  state.typeKey =
    (sc.a >= 0 ? "A" : "C") +
    (sc.g >= 0 ? "G" : "E") +
    (sc.w >= 0 ? "W" : "F") +
    (sc.s >= 0 ? "S" : "H");
  renderResult();
  show("result");
}

// ---------------- マッチング ----------------
const AXIS_LABEL = {
  A: "アクティブ", C: "まったり", G: "ガチ", E: "エンジョイ",
  W: "大人数", F: "少人数", S: "スキル志向", H: "居場所重視"
};

function calcMatch(g) {
  // 満点設計: 4軸48 + 回答強度8 + 条件21 + 加点4 + 基礎10 = 91(注意点1つにつき-5)
  const t = state.typeKey;
  let score = 10;
  const gTags = [g.axes.a, g.axes.g, g.axes.w, g.axes.s];
  for (let i = 0; i < 4; i++) if (t[i] === gTags[i]) score += 12;

  // 回答の強さ(同点を散らす): 一致軸ごとに最大+2
  score += ["a", "g", "w", "s"].reduce((acc, ax, i) =>
    acc + (t[i] === gTags[i] ? Math.min(2, Math.abs(state.scores[ax])) : 0), 0);

  const cautions = [];

  if (state.campus === g.campus) score += 6;
  else cautions.push("キャンパスが違う");

  if (state.freq !== null) {
    if (g.days <= state.freq) score += 6;
    else cautions.push("活動頻度が希望より多め");
  }
  if (state.budget !== null && g.feeHalf !== null) {
    if (g.feeHalf <= state.budget) score += 5;
    else cautions.push("会費が予算オーバー");
  } else score += 3;

  if (state.scores.drink < -2 && g.drink === 2) cautions.push("飲み会多め");
  else score += 4;

  if (state.scores.event > 0 && g.eventLove) score += 2;
  if (state.scores.exp < 0 && g.beginner) score += 2;
  else if (state.scores.exp >= 0) score += 1;

  score -= cautions.length * 5;
  return { score: Math.min(98, Math.max(20, score)), cautions };
}

function matchedGroups() {
  let pool = GROUPS.slice();
  if (state.pref === "club") {
    // 部活も視野 → 全対象だが部活を優遇
  } else if (state.pref === "circle") {
    pool = pool.filter(g => g.kubun !== "club");
  }
  const scored = pool.map(g => {
    const m = calcMatch(g);
    let s = m.score;
    if (state.pref === "club" && g.kubun === "club") s += 5;
    return { g, score: Math.min(99, s), cautions: m.cautions };
  });
  scored.sort((x, y) => y.score - x.score);
  return scored;
}

// ---------------- 結果描画 ----------------
function renderResult() {
  const t = TYPES[state.typeKey];
  document.getElementById("result-type").textContent = t.name;
  document.getElementById("result-copy").textContent = t.copy;
  document.getElementById("result-axes").textContent =
    state.typeKey.split("").map(c => AXIS_LABEL[c]).join(" × ");
  document.getElementById("result-desc").textContent = t.desc;
  state.resultKubun = "all";
  document.querySelectorAll("#result-chips .chip").forEach(c =>
    c.classList.toggle("active", c.dataset.kubun === "all"));
  renderResultList();
}

function setResultFilter(btn) {
  state.resultKubun = btn.dataset.kubun;
  document.querySelectorAll("#result-chips .chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderResultList();
}

function isKonin(g) { return g.kubun === "club" || g.kubun === "circle_k"; }

function renderResultList() {
  let rows = matchedGroups();
  if (state.resultKubun === "konin") rows = rows.filter(r => isKonin(r.g));
  if (state.resultKubun === "hinin") rows = rows.filter(r => !isKonin(r.g));
  document.getElementById("result-count").textContent = rows.length + "件";
  document.getElementById("result-list").innerHTML =
    rows.length ? rows.map(r => groupRow(r.g, r.score, r.cautions)).join("")
    : '<p class="empty">条件に合う団体が見つかりませんでした</p>';
}

// ---------------- 一覧ページ ----------------
function setListKubun(btn) {
  state.listKubun = btn.dataset.kubun;
  document.querySelectorAll("#view-list .chips .chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderList();
}

function renderList() {
  const q = document.getElementById("list-search").value.trim();
  const genre = document.getElementById("f-genre").value;
  const campus = document.getElementById("f-campus").value;
  const mid = document.getElementById("f-mid").checked;
  const beg = document.getElementById("f-beginner").checked;

  let rows = GROUPS.filter(g => {
    if (state.listKubun !== "all" && g.kubun !== state.listKubun) return false;
    if (genre !== "all" && g.genre !== genre) return false;
    if (campus !== "all" && g.campus !== campus) return false;
    if (mid && !g.midEntry) return false;
    if (beg && !g.beginner) return false;
    if (q && !(g.name + g.activity).includes(q)) return false;
    return true;
  });
  document.getElementById("list-count").textContent = rows.length + "件の団体";
  document.getElementById("list-body").innerHTML =
    rows.length ? rows.map(g => groupRow(g)).join("")
    : '<p class="empty">条件に合う団体が見つかりませんでした</p>';
}

// ---------------- 行の描画(共通) ----------------
const KUBUN_LABEL = {
  club: ["部活(公認)", "badge-konin"],
  circle_k: ["公認サークル", "badge-konin"],
  circle_h: ["非公認", "badge-hinin"],
  gakusei: ["学生団体", "badge-gakusei"]
};
const CAMPUS_LABEL = { nishichiba: "西千葉", inohana: "亥鼻", matsudo: "松戸" };

function groupRow(g, score, cautions) {
  const [kLabel, kClass] = KUBUN_LABEL[g.kubun];
  const fee = g.feeHalf === null || g.feeHalf === undefined ? "会費未確認"
    : g.feeHalf === 0 ? "会費なし"
    : "半期" + g.feeHalf.toLocaleString() + "円";
  const badges = [
    `<span class="badge ${kClass}">${kLabel}</span>`,
    g.incare ? '<span class="badge badge-incare">インカレ</span>' : "",
    g.midEntry ? '<span class="badge badge-mid">途中入会OK</span>' : "",
    !g.verified ? '<span class="badge badge-hinin">情報は推定・確認中</span>' : "",
    (cautions && cautions.length) ? `<span class="badge badge-caution">注意: ${cautions[0]}</span>` : ""
  ].join("");
  const matchTag = score !== undefined
    ? `<span class="match ${score >= 80 ? "match-hi" : "match-mid"}">${score}%</span>` : "";
  const hasInsta = g.insta && g.insta.startsWith("http");
  const link = hasInsta ? g.insta
    : "https://www.google.com/search?q=" + encodeURIComponent("千葉大学 " + g.name);
  const icon = hasInsta
    ? `<svg class="ig-icon" viewBox="0 0 24 24" fill="none" stroke="#993556" stroke-width="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>
      <circle cx="17.2" cy="6.8" r="1.1" fill="#993556" stroke="none"/></svg>`
    : `<svg class="ig-icon" viewBox="0 0 24 24" fill="none" stroke="#5b6675" stroke-width="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>`;
  return `<a class="group-row" href="${link}" target="_blank" rel="noopener">
    <div class="group-main">
      <p class="group-name">${g.name}</p>
      <p class="group-meta">${g.activity}・週${g.days}・${fee}・${CAMPUS_LABEL[g.campus]}</p>
      <div class="badges">${badges}</div>
    </div>
    ${matchTag}
    ${icon}
  </a>`;
}

// ---------------- シェア画像生成 ----------------
function shareStory() {
  const t = TYPES[state.typeKey];
  const cv = document.getElementById("share-canvas");
  const ctx = cv.getContext("2d");

  ctx.fillStyle = "#1e50a2";
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "#14376f";
  ctx.fillRect(0, 0, 1080, 340);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "500 44px 'Noto Sans JP', sans-serif";
  ctx.fillText("千葉大サークル・部活診断", 540, 200);

  ctx.font = "400 40px 'Noto Sans JP', sans-serif";
  ctx.fillText("私のタイプは…", 540, 560);

  ctx.fillStyle = "#ffd83d";
  ctx.font = "800 120px 'M PLUS Rounded 1c', sans-serif";
  ctx.fillText(t.name, 540, 760);

  ctx.fillStyle = "#ffffff";
  ctx.font = "500 44px 'Noto Sans JP', sans-serif";
  ctx.fillText(t.copy, 540, 880);

  ctx.font = "400 36px 'Noto Sans JP', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(state.typeKey.split("").map(c => AXIS_LABEL[c]).join(" × "), 540, 970);

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(190, 1160, 700, 220, 30);
  else ctx.rect(190, 1160, 700, 220);
  ctx.fill();
  ctx.fillStyle = "#1e50a2";
  ctx.font = "700 48px 'Noto Sans JP', sans-serif";
  ctx.fillText("あなたも診断してみる", 540, 1250);
  ctx.font = "400 34px 'Noto Sans JP', sans-serif";
  ctx.fillText("@chibadai_navi", 540, 1320);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "400 30px 'Noto Sans JP', sans-serif";
  ctx.fillText("千葉大ナビ|16タイプ診断", 540, 1780);

  cv.toBlob(blob => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chibadai-navi-" + state.typeKey + ".png";
    a.click();
    URL.revokeObjectURL(a.href);
  }, "image/png");
}
