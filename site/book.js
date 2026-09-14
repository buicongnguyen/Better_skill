const readerMessages = JSON.parse(document.querySelector('#reader-messages').textContent);
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function syncTheme() { themeButton.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark')); }
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('better-book-theme', theme); } catch {}
  syncTheme();
});
systemTheme.addEventListener('change', event => {
  let saved;
  try { saved = localStorage.getItem('better-book-theme'); } catch {}
  if (!saved) { document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'; syncTheme(); }
});
syncTheme();
document.querySelectorAll('[data-language]').forEach(link => link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const language = link.dataset.language;
  if (language === document.documentElement.lang) return;
  let anchor = location.hash;
  const linkedSection = document.getElementById(location.hash.slice(1));
  const linkedTop = linkedSection?.getBoundingClientRect().top;
  // Focusing a sticky control can scroll the viewport. Keep a still-visible
  // explicit destination; otherwise follow the reader's current subsection.
  if (linkedTop === undefined || linkedTop < -120 || linkedTop > innerHeight) {
    for (const heading of document.querySelectorAll('#cover, article h2[id], article h3[id], .source-list > li[id]')) {
      if (heading.getBoundingClientRect().top <= innerHeight * .3) anchor = `#${heading.id}`;
    }
  }
  try { localStorage.setItem('better-book-language', language); } catch {}
  const url = new URL(link.getAttribute('href'), location.href);
  // Explicit English remains reachable even when persistent storage is unavailable.
  url.searchParams.set('lang', language);
  url.hash = anchor;
  location.assign(url.href);
}));
const menu = document.querySelector('#menu-toggle');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.menu-backdrop');
const links = [...document.querySelectorAll('.chapter-nav a')];
const headings = links.map(link => document.querySelector(link.getAttribute('href')));
const mobile = matchMedia('(max-width: 800px)');
function syncMenuAccess() { sidebar.inert = mobile.matches && !sidebar.classList.contains('open'); }
function closeMenu(returnFocus = false) {
  sidebar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); backdrop.hidden = true;
  syncMenuAccess();
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); backdrop.hidden = !open;
  syncMenuAccess();
  if (open) links[0]?.focus();
});
backdrop.addEventListener('click', () => closeMenu(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebar.classList.contains('open')) closeMenu(true);
  if (event.key === 'Tab' && mobile.matches && sidebar.classList.contains('open')) {
    const focusable = [menu, ...sidebar.querySelectorAll('a')];
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index === 0) { event.preventDefault(); focusable.at(-1).focus(); }
    else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); menu.focus(); }
  }
});
sidebar.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const hash = link.getAttribute('href');
  closeMenu();
  if (mobile.matches && hash.startsWith('#')) {
    const target = document.querySelector(hash);
    target?.setAttribute('tabindex', '-1'); target?.focus({preventScroll:true});
  }
});
mobile.addEventListener('change', () => { closeMenu(); syncMenuAccess(); });
syncMenuAccess();
document.querySelector('.print-button').addEventListener('click', () => window.print());
let toastTimer;
function notify(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600); }
document.querySelectorAll('.copy-button').forEach(button => button.addEventListener('click', async () => {
  const text = button.closest('.prompt-block').querySelector('code').textContent;
  try { await navigator.clipboard.writeText(text); button.textContent = readerMessages.copied; notify(readerMessages.promptCopied); setTimeout(() => { button.textContent = readerMessages.copy; }, 2200); }
  catch { const range = document.createRange(); range.selectNodeContents(button.closest('.prompt-block').querySelector('code')); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); notify(readerMessages.copyFallback); }
}));
let scheduled = false;
function updateReading() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.round(Math.max(0, Math.min(1, scrollY / max)) * 100) : 100;
  document.querySelector('#progress-label').textContent = `${progress}%`;
  document.querySelector('#progress-fill').style.width = `${progress}%`;
  let current = -1;
  headings.forEach((heading, index) => { if (heading && heading.getBoundingClientRect().top < innerHeight * .38) current = index; });
  links.forEach((link, index) => { if (index === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { requestAnimationFrame(updateReading); scheduled = true; } }, { passive: true });
addEventListener('resize', updateReading);
updateReading();
document.querySelectorAll('.chapter-evidence').forEach(panel => panel.addEventListener('toggle', updateReading));
let printEvidenceState = [];
addEventListener('beforeprint', () => {
  printEvidenceState = [...document.querySelectorAll('.chapter-evidence')].map(panel => [panel, panel.open]);
  printEvidenceState.forEach(([panel]) => { panel.open = true; });
});
addEventListener('afterprint', () => {
  printEvidenceState.forEach(([panel, wasOpen]) => { panel.open = wasOpen; });
  updateReading();
});
