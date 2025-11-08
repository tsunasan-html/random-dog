<template>
  <div id="app">
    <!-- Header -->
    <header class="site-header">
      <nav class="nav-bar">
        <router-link to="/" class="brand">
          🐾 Doggo
        </router-link>
        <ul class="nav">
          <li><router-link exact to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/favorite" class="nav-link">My Dogs</router-link></li>
          <li><router-link to="/about" class="nav-link">About</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main -->
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style>
/* ========== Reset & Theme Tokens ========== */
*,
*::before,
*::after { box-sizing: border-box; }

:root {
  --fg: #1f2937;          /* メインテキスト */
  --muted: #6b7280;       /* サブテキスト・グレー */
  --brand: #111827;       /* 濃いアクセント */
  --cardGlass: rgba(255,255,255,0.9);
  --ring: rgba(17,24,39,0.08);
  --shadow-lg: 0 20px 40px rgba(16,24,40,0.12);
  --nav-h: 60px;        /* PCの高さ */
  --nav-h-sp: 56px;     /* 〜767px */
  --nav-h-xxs: 50px;    /* 〜360px */
  --nav-gap: 24px;
  --nav-gap-sp: 16px;
  --nav-gap-xs: 12px;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: transparent;     /* ← htmlの背景を見せる */
  color: var(--fg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;          /* 横スクロールのはみ出し対策 */
  background:
    radial-gradient(1200px 600px at 20% -10%, #f0f7ff 0%, transparent 60%) no-repeat,
    linear-gradient(180deg, #ffffff, #f7f9fc);
}

#app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* ========== Header ========== */

.site-header {
  position: sticky;
  top: 12px;
  z-index: 50;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 0 12px;
  /* ノッチ端末の上辺安全領域 */
  padding-top: calc(env(safe-area-inset-top, 0px));
}

.nav-bar {
  width: min(96vw, 960px);
  height: var(--nav-h);
  padding: 0 14px;
  border-radius: 16px;
  background: var(--cardGlass);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px var(--ring);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 左右の安全領域（iOSノッチ対策） */
  padding-left: calc(14px + env(safe-area-inset-left, 0px));
  padding-right: calc(14px + env(safe-area-inset-right, 0px));
  touch-action: manipulation;             /* タップ反応を軽く */
}

/* クリック波紋のハイライトを消す（モバイルの見た目向上） */
.nav-link, .brand {
  -webkit-tap-highlight-color: transparent;
}

/* 左のロゴ/ブランド */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--brand);
  font-weight: 800;
  letter-spacing: .2px;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background .2s ease, transform .06s ease;
}
.brand:hover { background: rgba(0,0,0,0.04); transform: translateY(-1px); }

/* 右のナビ（下線スタイル） */
.nav {
  list-style: none;
  display: flex;
  gap: var(--nav-gap);
  margin: 0;
  padding: 0;
}
.nav li { display: inline-flex; }

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  text-decoration: none;
  color: var(--fg);
  padding: 10px 0;                 /* タッチ領域を縦方向に確保 */
  line-height: 1;
  transition: color .2s ease;
  font-size: clamp(14px, 2.4vw, 16px);
  min-height: 40px;                /* タップ最小高さの目安 */
}

/* 下線はアクティブのみで表示 */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0; bottom: -4px;
  width: 100%;
  height: 2px;
  background: currentColor;
  opacity: 0;
  transform: scaleX(0);
  transition: transform .25s ease, opacity .25s ease;
}

/* hoverでは色だけ変更（下線なし） */
.nav-link:hover { color: var(--brand); }

/* アクティブ時だけ下線を表示 */
.nav-link.router-link-exact-active,
.nav-link.router-link-active { color: var(--brand); }
.nav-link.router-link-exact-active::after,
.nav-link.router-link-active::after {
  opacity: 1;
  transform: scaleX(1);
  background: var(--brand);
}

/* =========================================
   1) スマホ基本（〜767px）
   ========================================= */
@media (max-width: 767px) {
  .nav-bar {
    width: 100%;
    height: var(--nav-h-sp);
    border-radius: 14px;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 8px 24px var(--ring);
  }

  .brand { padding: 6px 8px; }
  .nav { gap: var(--nav-gap-sp); }

  .nav-link {
    padding: 8px 0;
    font-size: clamp(13px, 3.4vw, 15px);
    min-height: 38px;
  }

  /* 横幅が狭いときにナビを横スクロール可能に（折返し防止） */
  .nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
  }
  .nav::-webkit-scrollbar { display: none; }
  .nav li { scroll-snap-align: center; }
}

/* =========================================
   2) さらに狭い端末（〜560px）
   - 余白・フォント縮小、gap調整
   ========================================= */
@media (max-width: 560px) {
  .nav-bar {
    height: calc(var(--nav-h-sp) - 2px);
    padding-left: calc(10px + env(safe-area-inset-left, 0px));
    padding-right: calc(10px + env(safe-area-inset-right, 0px));
  }
  .nav { gap: var(--nav-gap-xs); }
  .nav-link {
    font-weight: 700;
    font-size: clamp(12px, 3.6vw, 14px);
    padding: 6px 0;
    min-height: 36px;
  }

  /* ブランドのテキストを短くしたい場合は .brand-text を用意して隠す */
  .brand-text { display: none; }  /* 例：ロゴ + 省略テキスト運用 */
}

/* =========================================
   3) 極小端末（〜420px）
   - 高さ/角丸をさらに圧縮、ナビ最後尾を省略可能
   ========================================= */
@media (max-width: 420px) {
  .nav-bar { border-radius: 12px; }
  .nav-link { font-size: clamp(12px, 4vw, 13px); }

  /* 表示を絞りたい項目に .nav--optional を付けておくと隠れる */
  .nav li.nav--optional { display: none; }
}

/* =========================================
   4) 超コンパクト（〜360px）
   - ナビ高さをさらに下げて、上下余白を最小化
   ========================================= */
@media (max-width: 360px) {
  .nav-bar { height: var(--nav-h-xxs); }
  .nav-link {
    padding: 4px 0;
    min-height: 32px;
  }
}

/* =========================================
   5) スマホ横向き（ランドスケープ）時の微調整
   ========================================= */
@media (max-width: 767px) and (orientation: landscape) {
  .nav-bar { height: 48px; }
  .nav-link { min-height: 32px; }
}

/* =========================================
   6) 省エネ：動きに弱い人向け（アニメ減）
   ========================================= */
@media (prefers-reduced-motion: reduce) {
  .nav-link::after { transition: none; }
  .brand, .nav-link { transition: none; }
}

/* =========================================
   7) “SPで非表示”にしたい要素用のユーティリティ
   ========================================= */
.sp-hidden { display: none !important; }     /* SP 専用で隠したい時に付与 */
@media (min-width: 768px) {
  .sp-hidden { display: revert !important; } /* PCで再表示 */
}

/* 逆に“SPだけ表示”したい場合 */
.only-sp { display: none !important; }
@media (max-width: 767px) {
  .only-sp { display: initial !important; }
}

/* ========== Main ========== */
.main {
  min-height: calc(100vh - 88px);    /* ヘッダー分をざっくり差し引き */
  display: grid;
  place-items: center;
  padding: 18px 12px 40px;
}
@media (min-width: 768px) {
  .main { padding: 24px 16px 56px; }
}

/* ========== 共通パーツ（ボタン/カード/画像など） ========== */
.container { text-align: center; }
@media (min-width: 768px) { .container { width: min(92vw, 720px); } }

.title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.4px;
  margin: 0 0 16px;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 12px 0 20px;
  flex-wrap: wrap;
}
@media (max-width: 767px) {
  .actions { flex-direction: column; align-items: stretch; gap: 10px; }
  .actions .btn { width: 100%; height: 48px; font-size: 16px; }
}
@media (min-width: 768px) {
  .actions .btn { min-width: 160px; height: 44px; font-size: 15px; }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 9999px;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(17,24,39,0.15);
  transition: transform .06s ease, box-shadow .2s ease, opacity .2s ease, background .2s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn:disabled {
  opacity: .6; cursor: not-allowed;
  box-shadow: 0 4px 16px rgba(17,24,39,0.08);
}

.btn-outline {
  background: #ffffff;
  color: var(--brand);
  border: 2px solid var(--brand);
}
.btn-outline:disabled { opacity: .5; cursor: not-allowed; }

/* カード */
.card {
  position: relative;
  margin: 20px auto 8px;
  padding: 12px;
  border-radius: 16px;
  background: #fff;
  box-shadow: var(--shadow-lg);
  display: grid;
  place-items: center;
}

/* 画像 */
.img-wrap {
  position: relative;
  width: 100%;
  max-width: 560px;
  display: grid;
  place-items: center;
}
.dog-img {
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  user-select: none;
}
@media (max-width: 767px) {
  .dog-img { max-width: 100%; display: block; }
  .actions { margin: 12px 12px 20px 12px; }
}

/* フェード */
.fade-enter-active, .fade-leave-active { transition: opacity .28s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }

/* ローディング & スケルトン */
.loading-overlay {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.6);
  display: grid; place-items: center;
  z-index: 2; backdrop-filter: blur(1px);
}
.loader {
  width: 56px; height: 56px;
  border: 4px solid transparent;
  border-top-color: #9ca3af;
  border-right-color: #9ca3af;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.skeleton {
  width: 100%; max-width: 560px; aspect-ratio: 4 / 3;
  border-radius: 12px;
  background: linear-gradient(90deg, #f2f4f7 25%, #e6eaf0 37%, #f2f4f7 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

/* ハート（カード右上） */
.heart-btn {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  width: 40px; height: 40px; border: none; border-radius: 9999px;
  background: var(--cardGlass);
  box-shadow: 0 6px 16px rgba(0,0,0,.12);
  display: grid; place-items: center;
  cursor: pointer; color: var(--muted);
  backdrop-filter: blur(3px);
  transition: transform .12s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
}
.heart-btn:hover { transform: translateY(-1px) scale(1.03); }
.heart-btn:active { transform: translateY(0) scale(0.98); }
.heart-btn:disabled { opacity: .9; cursor: not-allowed; }
.heart-btn svg path { transition: fill .2s ease, stroke .2s ease; }
.heart-btn.active { background: #fff; color: var(--brand); }
.heart-btn.active svg path { fill: currentColor; stroke: currentColor; }
@media (max-width: 767px) {
  .heart-btn { width: 36px; height: 36px; top: 8px; right: 8px; }
  .heart-btn svg { width: 20px; height: 20px; }
}

/* フッターのヒント */
.hint {
  color: var(--muted);
  font-size: 12px;
  margin: 4px 0 0;
}

</style>
