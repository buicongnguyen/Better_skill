// Apply the saved theme before styles load. Storage may be disabled by the browser.
(() => {
  let theme;
  let language;
  try {
    theme = localStorage.getItem('better-book-theme');
    language = localStorage.getItem('better-book-language');
  } catch { /* Reading works without persistent storage. */ }
  const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  // Explicit translated URLs take priority; the English home remembers a choice.
  if (document.documentElement.lang === 'en' && ['vi', 'ko'].includes(language) && !new URLSearchParams(location.search).has('lang')) {
    location.replace(`${language}.html${location.search}${location.hash}`);
  }
})();
