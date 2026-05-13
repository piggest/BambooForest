// プラットフォームの定義。バッジ表示と色分けに使う。
// 値は: "web" | "mac" | "ios" | "android" | "windows"
// icon は index.html の <symbol id="icon-..."> を参照
const PLATFORMS = {
  web:     { label: "Web",     icon: "icon-web" },
  mac:     { label: "Mac",     icon: "icon-monitor" },
  ios:     { label: "iOS",     icon: "icon-mobile" },
  android: { label: "Android", icon: "icon-mobile" },
  windows: { label: "Windows", icon: "icon-monitor" },
};

// 作品データ。後で追加していく。
const works = [
  {
    title: "英単語クイズ",
    platform: "web",
    tag: "Quiz",
    description: "英単語を出題するシンプルなクイズアプリ。",
    url: "https://piggest.github.io/english-quiz/",
  },
  {
    title: "漢字クイズ",
    platform: "web",
    tag: "Quiz",
    description: "漢字を出題するシンプルなクイズアプリ。",
    url: "https://piggest.github.io/kanji-quiz/",
  },
  {
    title: "テスト回答欄作成ツール",
    platform: "web",
    tag: "Tool",
    description: "テストの回答欄を手早く作成するツール。",
    url: "https://piggest.github.io/test-form-creator/",
  },
  {
    title: "Mas",
    platform: "mac",
    tag: "App",
    description: "まるでマスですくうように。macOS 向けスクリーンショット & 注釈アプリ。",
    url: "https://piggest.github.io/Mas/",
  },
  {
    title: "FairyOperator",
    platform: "mac",
    tag: "App",
    description: "macOS の入力・ウインドウ・Dock 操作を妖精たちが手伝う道具箱。",
    url: "https://piggest.github.io/FairyOperator-releases/",
  },
];

// プレースホルダーカードを 4 枚埋めておく（作品が増えたら works を増やすだけ）
const PLACEHOLDER_COUNT = 4;

const grid = document.getElementById("works-grid");

function renderCard(work) {
  const li = document.createElement("li");
  li.className = "work-card";
  const p = PLATFORMS[work.platform];
  const platformBadge = p
    ? `<span class="work-card-platform platform-${work.platform}">
         <svg class="platform-icon" aria-hidden="true"><use href="#${p.icon}"/></svg>
         ${p.label}
       </span>`
    : "";
  li.innerHTML = `
    ${platformBadge}
    <span class="work-card-tag">${work.tag ?? "Work"}</span>
    <h3 class="work-card-title">${work.title}</h3>
    <p class="work-card-desc">${work.description ?? ""}</p>
    ${work.url ? `<a class="work-card-link" href="${work.url}" rel="noopener">見る</a>` : ""}
  `;
  return li;
}

function renderPlaceholder(index) {
  const li = document.createElement("li");
  li.className = "work-card is-placeholder";
  li.innerHTML = `
    <span class="work-card-tag">soon</span>
    <h3 class="work-card-title">— 準備中 —</h3>
    <p class="work-card-desc">地下茎の先で、まだ芽吹く前。</p>
  `;
  return li;
}

if (grid) {
  works.forEach((w) => grid.appendChild(renderCard(w)));
  const remaining = Math.max(0, PLACEHOLDER_COUNT - works.length);
  for (let i = 0; i < remaining; i++) grid.appendChild(renderPlaceholder(i));

  // スクロール時に順番にフェードイン
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            e.target.style.animationDelay = `${i * 80}ms`;
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    grid.querySelectorAll(".work-card").forEach((c) => io.observe(c));
  } else {
    grid.querySelectorAll(".work-card").forEach((c) => c.classList.add("is-visible"));
  }
}

// フッター年号
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
