# pargame.github.io Design System v1

Concept: **"Midnight Terminal"**. It uses a deep indigo-black base, a cyan/violet engineering accent, and glass only on floating layers. Content surfaces stay opaque, so long reading stays comfortable.

---

## 1. Typography

```css
:root {
  /* Font stacks: Korean falls back to Pretendard, then system fonts */
  --font-sans: "Pretendard Variable", Pretendard, "Inter", -apple-system, BlinkMacSystemFont,
               "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif;
  --font-display: "Inter Tight", "Pretendard Variable", var(--font-sans);
  --font-mono: "JetBrains Mono", "D2Coding", "Fira Code", ui-monospace, SFMono-Regular,
               Menlo, Consolas, monospace;

  /* Fluid type scale (ratio ≈ 1.2) */
  --fs-xs:  0.75rem;
  --fs-sm:  0.875rem;
  --fs-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);  /* 16 → 17px */
  --fs-lg:  1.1875rem;
  --fs-h4:  1.25rem;
  --fs-h3:  clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem);
  --fs-h2:  clamp(1.625rem, 1.4rem + 1vw, 2.125rem);
  --fs-h1:  clamp(2.125rem, 1.7rem + 2vw, 3.25rem);

  /* Line height: Korean needs more leading than Latin */
  --lh-body: 1.8;
  --lh-tight: 1.3;
  --lh-code: 1.65;

  --measure: 68ch;        /* body width 65–75ch */
  --measure-wide: 100ch;  /* code, widgets, tables */
  --space-flow: 1.4em;    /* paragraph rhythm */
}

body {
  font-family: var(--font-sans);
  font-size: var(--fs-base);
  line-height: var(--lh-body);
  letter-spacing: -0.011em;       /* tighten Hangul slightly */
  word-break: keep-all;           /* do not break Korean mid-word */
  overflow-wrap: break-word;
  text-wrap: pretty;
  font-feature-settings: "ss01", "cv11", "tnum" 0;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: var(--lh-tight);
  letter-spacing: -0.03em;
  font-weight: 700;
  text-wrap: balance;
  scroll-margin-top: 5rem;
}
h2 { margin-block: 2.6em 0.7em; }
h3 { margin-block: 2em 0.5em; }

.prose { max-width: var(--measure); margin-inline: auto; }
.prose > * + * { margin-top: var(--space-flow); }
.prose .wide { max-width: var(--measure-wide); margin-inline: auto; }   /* breakout */
.prose .full { width: min(100vw - 2rem, 1200px); margin-left: 50%; transform: translateX(-50%); }

/* Inline code */
:not(pre) > code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  padding: 0.15em 0.4em;
  border-radius: 6px;
  background: var(--code-inline-bg);
  border: 1px solid var(--border-subtle);
  font-variant-ligatures: none;
}
```

Notes:
- Use `word-break: keep-all` only for body text. Inside `pre` or tables, use `overflow-wrap: anywhere`.
- Subset the Pretendard Variable font, `font-display: swap`, and preload only the Latin and Hangul 400/700 weights.
- JetBrains Mono ligatures: enable them only in code blocks, as `font-variant-ligatures: contextual`.

---

## 2. Color and Theme Tokens

Dark is the default. Switch themes with `[data-theme="light"]`, and fall back to `prefers-color-scheme` when no theme is stored.

```css
:root, [data-theme="dark"] {
  color-scheme: dark;

  /* Background / surface (elevation = lighter) */
  --bg:            hsl(232 28% 7%);   /* #0B0D14 */
  --surface-1:     hsl(232 24% 10%);  /* #12141E  cards, code */
  --surface-2:     hsl(232 22% 13%);  /* #191C28  hover, tabs */
  --surface-3:     hsl(232 20% 17%);  /* #222636  popover */
  --glass:         hsl(232 28% 10% / 0.62);
  --glass-blur:    saturate(160%) blur(16px);

  /* Border */
  --border-subtle: hsl(232 20% 100% / 0.07);
  --border:        hsl(232 20% 100% / 0.12);
  --border-strong: hsl(232 20% 100% / 0.22);

  /* Text */
  --text-1: hsl(225 25% 94%);   /* #EBEEF5 headings */
  --text-2: hsl(228 14% 76%);   /* #B9BFCE body (contrast 11:1) */
  --text-3: hsl(228 10% 56%);   /* #82889A meta (contrast 5.2:1) */
  --text-inverse: hsl(232 28% 7%);

  /* Accent */
  --accent:        hsl(189 94% 60%);  /* #3DDCF7 cyan: links, focus */
  --accent-strong: hsl(189 90% 70%);
  --accent-muted:  hsl(189 94% 60% / 0.14);
  --accent-2:      hsl(258 90% 72%);  /* #A98BFA violet: nung_lang, gradients */
  --accent-grad:   linear-gradient(120deg, var(--accent), var(--accent-2));
  --glow:          0 0 0 1px var(--accent-muted), 0 8px 40px -8px hsl(189 94% 60% / 0.25);

  /* Semantic */
  --info:    hsl(212 96% 68%);
  --success: hsl(152 66% 56%);
  --warn:    hsl(38 96% 62%);
  --danger:  hsl(354 90% 68%);
  --deep:    hsl(268 85% 72%);

  --code-bg: hsl(232 30% 8.5%);
  --code-inline-bg: hsl(232 22% 15%);
  --selection: hsl(189 94% 60% / 0.28);
  --shadow-1: 0 1px 2px hsl(0 0% 0% / .4), 0 8px 24px -12px hsl(0 0% 0% / .6);
}

[data-theme="light"] {
  color-scheme: light;
  --bg:        hsl(40 20% 98%);    /* #FAF9F7 warm paper */
  --surface-1: hsl(0 0% 100%);
  --surface-2: hsl(220 20% 96%);   /* #F2F4F7 */
  --surface-3: hsl(220 18% 92%);
  --glass:     hsl(0 0% 100% / 0.7);
  --border-subtle: hsl(225 20% 10% / 0.06);
  --border:        hsl(225 20% 10% / 0.12);
  --border-strong: hsl(225 20% 10% / 0.24);
  --text-1: hsl(228 30% 10%);      /* #121521 */
  --text-2: hsl(228 16% 28%);      /* #3C4156 */
  --text-3: hsl(228 10% 42%);      /* #62677A (4.9:1) */
  --text-inverse: #fff;
  --accent:        hsl(197 95% 34%);   /* #0A7AA8 meets AA on white */
  --accent-strong: hsl(197 95% 26%);
  --accent-muted:  hsl(197 95% 34% / 0.1);
  --accent-2:      hsl(258 70% 52%);
  --glow: 0 0 0 1px var(--accent-muted), 0 8px 30px -10px hsl(197 95% 34% / 0.3);
  --info: hsl(214 90% 46%); --success: hsl(152 70% 30%);
  --warn: hsl(32 95% 36%);  --danger: hsl(354 75% 46%); --deep: hsl(268 65% 48%);
  --code-bg: hsl(220 25% 97%);
  --code-inline-bg: hsl(220 20% 94%);
  --selection: hsl(197 95% 34% / 0.2);
  --shadow-1: 0 1px 2px hsl(225 30% 20% / .06), 0 8px 24px -12px hsl(225 30% 20% / .18);
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme]) { /* same values as the light block, so there is no flash before JS runs */ }
}

/* Shape and spacing */
:root {
  --radius-sm: 6px; --radius: 12px; --radius-lg: 18px;
  --ease: cubic-bezier(.2,.8,.2,1);
  --dur-fast: 150ms; --dur: 250ms; --dur-slow: 400ms;
}

::selection { background: var(--selection); }
a { color: var(--accent); text-decoration: underline; text-decoration-color: var(--accent-muted);
    text-underline-offset: 0.2em; transition: text-decoration-color var(--dur-fast); }
a:hover { text-decoration-color: currentColor; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
```

Glass rule: apply glass only to the header, TOC popover, tooltips, and widget toolbars. Never apply it to body text blocks.

---

## 3. Code Blocks

### Shiki
Use `dual themes` with CSS variables, so the theme switch needs no re-render.
```ts
// astro.config / rehype-shiki
themes: { dark: "github-dark-dimmed" /* or "tokyo-night" */, light: "github-light" },
defaultColor: false,   // emit CSS variables only
```
```css
.shiki, .shiki span { color: var(--shiki-light); }
[data-theme="dark"] .shiki, [data-theme="dark"] .shiki span { color: var(--shiki-dark); }
.shiki { background: transparent !important; }   /* use the --code-bg of the container */
```
**Matching tip:** use `tokyo-night` for dark. Its background (#1a1b26) is close to `--code-bg`, and its cyan and violet tokens match the accent colors. Use `github-light` for light.
Custom grammar: register a TextMate grammar for `nung_lang` via `langs: [nungLangGrammar]`.

### Structure
```html
<figure class="code" data-lang="python">
  <figcaption class="code__bar">
    <span class="code__dots" aria-hidden></span>
    <span class="code__title">solver.py</span>
    <span class="code__lang">Python</span>
    <button class="code__copy" aria-label="코드 복사">Copy</button>
  </figcaption>
  <pre class="code__pre"><code>…</code></pre>
</figure>
```
```css
.code { margin-block: 1.8em; border: 1px solid var(--border); border-radius: var(--radius);
        background: var(--code-bg); box-shadow: var(--shadow-1); overflow: hidden; }
.code__bar { display:flex; align-items:center; gap:.75rem; height:2.5rem; padding-inline:.9rem;
        background: var(--surface-2); border-bottom: 1px solid var(--border-subtle);
        font: 500 var(--fs-xs)/1 var(--font-mono); color: var(--text-3); }
.code__title { color: var(--text-2); margin-right:auto; }
.code__lang { padding:.2rem .5rem; border-radius:999px; text-transform:uppercase; letter-spacing:.06em;
        font-size:.68rem; color: var(--lang, var(--accent)); background: color-mix(in srgb, var(--lang, var(--accent)) 14%, transparent); }
.code[data-lang="python"]   { --lang: #5aa9e6; }
.code[data-lang="nung"]     { --lang: var(--accent-2); }
.code[data-lang="ts"]       { --lang: #4a9df8; }
.code[data-lang="rust"]     { --lang: #f08a5d; }
.code[data-lang="glsl"]     { --lang: var(--success); }

.code__copy { padding:.3rem .6rem; border-radius: var(--radius-sm); border:1px solid var(--border);
        background: transparent; color: var(--text-2); cursor:pointer; transition: all var(--dur-fast); }
.code__copy:hover { background: var(--surface-3); color: var(--text-1); }
.code__copy[data-copied="true"] { color: var(--success); border-color: var(--success); }  /* switch the label to "Copied ✓" for 1.6s */

.code__pre { margin:0; padding: 1rem 0; overflow-x:auto; font: 400 .875rem/var(--lh-code) var(--font-mono);
        tab-size: 2; font-variant-ligatures: contextual; scrollbar-width: thin; }
.code__pre code { display:grid; counter-reset: line; }
.code__pre .line { padding: 0 1.1rem 0 0; min-height: 1.65em; }
.code__pre .line::before { counter-increment: line; content: counter(line); display:inline-block;
        width: 3.2ch; margin-right: 1.4ch; text-align:right; color: var(--text-3); opacity:.55; user-select:none; }
.code__pre .line.highlighted { background: var(--accent-muted); box-shadow: inset 2px 0 var(--accent); }
.code__pre .line.diff.add { background: hsl(152 66% 56% / .12); }
.code__pre .line.diff.remove { background: hsl(354 90% 68% / .12); opacity:.7; }
.code[data-no-lines] .line::before { display:none; }
```
Rules: collapse blocks of 30 lines or more with a "Show more" fade. Lines longer than 100 characters scroll horizontally and do not wrap. The copy button is always visible on mobile and shows on hover on desktop.

---

## 4. Callouts

```html
<aside class="callout" data-type="note"><div class="callout__title">Note</div>…</aside>
```
```css
.callout { --c: var(--info);
  margin-block: 1.8em; padding: 1rem 1.2rem 1rem 1.1rem; border-radius: var(--radius);
  border: 1px solid color-mix(in srgb, var(--c) 28%, transparent);
  border-left: 3px solid var(--c);
  background: color-mix(in srgb, var(--c) 8%, var(--surface-1));
  font-size: .95em; line-height: 1.7; }
.callout__title { display:flex; gap:.5rem; align-items:center; margin-bottom:.35rem;
  font: 700 var(--fs-xs)/1 var(--font-mono); text-transform:uppercase; letter-spacing:.08em; color: var(--c); }
.callout__title::before { content:""; width:1rem; height:1rem; background: currentColor;
  mask: var(--icon) center/contain no-repeat; }  /* use lucide SVG data URIs for --icon */
.callout > :last-child { margin-bottom: 0; }

[data-type="note"]    { --c: var(--info);    --icon: url("lucide:info"); }
[data-type="tip"]     { --c: var(--success); --icon: url("lucide:lightbulb"); }
[data-type="warning"] { --c: var(--warn);    --icon: url("lucide:triangle-alert"); }
[data-type="danger"]  { --c: var(--danger);  --icon: url("lucide:octagon-x"); }

/* Deep Dive: collapsible, with its own look */
.callout[data-type="deep"] { --c: var(--deep); --icon: url("lucide:telescope");
  background: linear-gradient(135deg, color-mix(in srgb, var(--deep) 12%, var(--surface-1)), var(--surface-1));
  border-left-width: 1px; border-image: var(--accent-grad) 1; padding: 0; }
details.callout[data-type="deep"] > summary { padding:1rem 1.2rem; cursor:pointer; list-style:none; }
details.callout[data-type="deep"] > summary::after { content:"＋"; float:right; transition: transform var(--dur) var(--ease); }
details[open].callout[data-type="deep"] > summary::after { transform: rotate(45deg); }
details.callout[data-type="deep"] > .callout__body { padding: 0 1.2rem 1.1rem; }
```
Note: `border-image` ignores `border-radius`. If you want rounded corners, use a `::before` pseudo-element with a mask gradient border. Replace the `url("lucide:…")` placeholders with inline SVG data URIs at build time.

---

## 5. Interactive Widgets

### Common container
```css
.widget { margin-block: 2.2em; border:1px solid var(--border); border-radius: var(--radius-lg);
  background: var(--surface-1); box-shadow: var(--shadow-1), var(--glow); overflow:hidden;
  contain: layout paint; }  /* isolate canvas repaints */
.widget__bar { display:flex; align-items:center; gap:.6rem; padding:.55rem .8rem;
  background: var(--glass); backdrop-filter: var(--glass-blur); border-bottom:1px solid var(--border-subtle);
  font: 500 var(--fs-xs)/1 var(--font-mono); color: var(--text-3); }
.widget__badge { padding:.2rem .5rem; border-radius:999px; background: var(--accent-muted); color: var(--accent); }
.widget__actions { margin-left:auto; display:flex; gap:.4rem; }   /* ▶ run, ↺ reset, ⛶ fullscreen */
.widget__btn { height:1.9rem; min-width:1.9rem; padding-inline:.55rem; border-radius: var(--radius-sm);
  border:1px solid var(--border); background: var(--surface-2); color: var(--text-2); }
.widget__btn:hover { border-color: var(--accent); color: var(--accent); }
.widget__btn--primary { background: var(--accent); color: var(--text-inverse); border-color: transparent; font-weight:600; }
```

### Simulation canvas frame
```css
.sim { position:relative; aspect-ratio: 16/9; background:
    radial-gradient(circle at 50% 0%, hsl(258 90% 72% / .10), transparent 60%), var(--bg); }
.sim canvas { width:100%; height:100%; display:block; touch-action: none; }
.sim--grid { background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px),
                               linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
             background-size: 32px 32px; }
.sim__hud { position:absolute; inset: .6rem auto auto .6rem; padding:.35rem .6rem; border-radius: var(--radius-sm);
  background: var(--glass); backdrop-filter: var(--glass-blur); border:1px solid var(--border-subtle);
  font: 500 .7rem/1.4 var(--font-mono); color: var(--text-2); pointer-events:none; }  /* FPS, step, params */
.sim__controls { display:flex; flex-wrap:wrap; gap:1rem; padding:.8rem 1rem; border-top:1px solid var(--border-subtle); }
.sim[data-loading]::after { content:"initializing…"; position:absolute; inset:0; display:grid; place-items:center;
  font-family: var(--font-mono); color: var(--text-3); background: var(--bg); }
.sim[data-fullscreen] { position:fixed; inset:0; z-index:100; aspect-ratio:auto; }
```
Rules: pause with `IntersectionObserver` when off-screen. Respect `prefers-reduced-motion` by starting paused. Cap DPR at 2. Have WebGL fall back to a static poster image.

### Pyodide console (terminal frame)
The terminal is always dark, in both themes, so it reads as a terminal.
```css
.repl { --t-bg: hsl(232 32% 6%); --t-fg: hsl(225 20% 88%);
  --t-prompt: var(--accent); --t-out: hsl(228 14% 72%); --t-err: hsl(354 90% 70%); --t-ok: hsl(152 66% 60%); }
.repl .widget__bar { background: hsl(232 24% 11%); color: hsl(228 10% 60%); }
.repl__editor { background: var(--t-bg); border-bottom:1px solid hsl(0 0% 100% / .08); }  /* CodeMirror/Shiki, dark theme */
.repl__term { background: var(--t-bg); color: var(--t-fg); min-height: 8rem; max-height: 22rem; overflow:auto;
  padding: .9rem 1.1rem; font: 400 .85rem/1.6 var(--font-mono); white-space: pre-wrap; overflow-wrap:anywhere; }
.repl__line--in::before  { content:">>> "; color: var(--t-prompt); user-select:none; }
.repl__line--cont::before{ content:"... "; color: var(--text-3); }
.repl__line--out { color: var(--t-out); }
.repl__line--err { color: var(--t-err); border-left:2px solid var(--t-err); padding-left:.6rem; }
.repl__status { display:inline-flex; align-items:center; gap:.4rem; }
.repl__status::before { content:""; width:.5rem; height:.5rem; border-radius:50%; background: var(--warn); }
.repl[data-state="ready"] .repl__status::before   { background: var(--t-ok); box-shadow: 0 0 8px var(--t-ok); }
.repl[data-state="loading"] .repl__status::before { animation: pulse 1.2s infinite; }
.repl[data-state="error"] .repl__status::before   { background: var(--t-err); }
.repl__caret { display:inline-block; width:.55ch; height:1.1em; background: var(--t-prompt); animation: blink 1.1s steps(1) infinite; vertical-align: text-bottom; }
@keyframes blink { 50% { opacity:0 } }
@keyframes pulse { 50% { opacity:.3 } }
```
UX rules:
- Do not load Pyodide (about 10 MB) until the user clicks "▶ Run". Until then show "Pyodide 로드 (~10MB)". Lazy-load with a progress bar.
- Run it in a Web Worker so the UI stays responsive. Add a "Stop" button that terminates the worker. Use a 10s timeout.
- Shortcuts: `Shift+Enter` runs the code and `Ctrl+L` clears the console.

---

## 6. Micro-interactions

### Scroll progress bar
```css
.progress { position:fixed; inset:0 0 auto 0; height:3px; z-index:200; background: var(--accent-grad);
  transform-origin: 0 50%; transform: scaleX(0); }
@supports (animation-timeline: scroll()) {
  .progress { animation: grow linear both; animation-timeline: scroll(root); }
  @keyframes grow { to { transform: scaleX(1); } }
}
```
JS fallback: `rAF` plus `el.style.transform = scaleX(scrollY / (scrollHeight - innerHeight))`. Animate only the `transform`.

### TOC active state
Use an `IntersectionObserver` with `rootMargin: "-80px 0px -70% 0px"` on the `h2` and `h3` elements.
```css
.toc a { display:block; padding:.25rem .8rem; border-left:2px solid var(--border-subtle);
  color: var(--text-3); font-size: var(--fs-sm); text-decoration:none; transition: color var(--dur-fast), border-color var(--dur-fast), padding var(--dur) var(--ease); }
.toc a:hover { color: var(--text-1); }
.toc a[aria-current="true"] { color: var(--accent); border-left-color: var(--accent); padding-left: 1rem; font-weight:600; }
.toc li ul a { padding-left: 1.6rem; }
.toc { position: sticky; top: 5.5rem; max-height: calc(100vh - 7rem); overflow:auto; }
@media (max-width: 1100px) { .toc { display:none; } }   /* collapse into a glass popover on mobile */
html { scroll-behavior: smooth; }
```

### Dark mode transition
Use the View Transitions API with a circular reveal from the toggle button. Use a CSS color transition as the fallback.
```css
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
::view-transition-new(root) { clip-path: circle(0 at var(--tx) var(--ty)); animation: reveal .55s var(--ease) forwards; }
@keyframes reveal { to { clip-path: circle(150vmax at var(--tx) var(--ty)); } }

/* Fallback: only during the swap, to avoid color transitions on every hover */
html.theme-switching *, html.theme-switching *::before, html.theme-switching *::after {
  transition: background-color .3s, color .3s, border-color .3s, fill .3s !important; }
```
```js
btn.onclick = e => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.style.setProperty("--tx", e.clientX+"px"); root.style.setProperty("--ty", e.clientY+"px");
  const swap = () => { root.dataset.theme = next; localStorage.theme = next; };
  document.startViewTransition ? document.startViewTransition(swap) : (root.classList.add("theme-switching"), swap(), setTimeout(()=>root.classList.remove("theme-switching"),350));
};
```
Add an inline `<script>` in `<head>` that sets `data-theme` from localStorage or `prefers-color-scheme` before first paint. This prevents a flash of the wrong theme.

### Other small details
- Heading anchors: a `#` that fades in on hover (`opacity 0 → .6`).
- Card hover: `translateY(-2px)` plus `--glow`, 250ms.
- Links in the TOC and nav use an underline slide: `background-size: 0 → 100%`.
- Image zoom on click, with a lightbox.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  ::view-transition-group(*) { animation: none; }
}
```

---

## Accessibility and Performance Checklist
- Body text contrast is 4.5:1 or higher and meta text is 4.5:1 or higher. The tokens above were chosen for this.
- Use `:focus-visible` rings everywhere, and a visible focus state on the widget buttons.
- Interactive widgets need `role="region"` with `aria-label`. The console output should be `aria-live="polite"`.
- Fonts: subset Pretendard, self-host, and preload only what is needed. Code blocks use a mono font with `font-display: swap`.
- Shiki runs at build time, so no client JS is needed for highlighting. The copy button, TOC, progress bar, and theme toggle are the only JS in the reading experience, and each needs less than 2 KB.
