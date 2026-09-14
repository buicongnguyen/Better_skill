// Render only the trusted, build-time diagram definitions in this book.
(async () => {
  const figures = [...document.querySelectorAll('.diagram')];
  for (const figure of figures) {
    const button = figure.querySelector('.diagram-copy');
    button.addEventListener('click', async () => {
      const code = figure.querySelector('.diagram-source code');
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = readerMessages.copied;
        notify(readerMessages.mermaidCopied);
        setTimeout(() => { button.textContent = readerMessages.copyMermaid; }, 2200);
      } catch {
        figure.querySelector('details').open = true;
        const range = document.createRange(); range.selectNodeContents(code);
        const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range);
        notify(readerMessages.sourceFallback);
      }
    });
  }
  if (!globalThis.mermaid) return;
  mermaid.initialize({
    startOnLoad: false, securityLevel: 'strict', theme: 'base',
    flowchart: { htmlLabels: false, curve: 'basis', nodeSpacing: 22, rankSpacing: 36, padding: 14 },
    themeVariables: {
      fontFamily: 'Arial, sans-serif', fontSize: '15px',
      primaryColor: '#e4ecdf', primaryTextColor: '#213b32', primaryBorderColor: '#71866d',
      lineColor: '#597365', secondaryColor: '#f1e2ce', tertiaryColor: '#faf7ef',
      edgeLabelBackground: '#faf7ef', background: '#faf7ef'
    }
  });
  for (const figure of figures) {
    try {
      const { svg } = await mermaid.render(`flow-${figure.id}`, figure.querySelector('.diagram-source code').textContent);
      const canvas = figure.querySelector('.diagram-canvas');
      canvas.innerHTML = svg;
      const vector = canvas.querySelector('svg');
      vector.style.setProperty('--diagram-width', `${vector.viewBox.baseVal.width}px`);
      canvas.classList.add('diagram-readable');
      const sizeButton = document.createElement('button');
      sizeButton.type = 'button'; sizeButton.textContent = readerMessages.fit;
      sizeButton.setAttribute('aria-pressed', 'true');
      sizeButton.addEventListener('click', () => {
        const expanded = canvas.classList.toggle('diagram-readable');
        sizeButton.setAttribute('aria-pressed', String(expanded));
        sizeButton.textContent = expanded ? readerMessages.fit : readerMessages.readable;
      });
      const actions = figure.querySelector('.diagram-actions');
      actions.prepend(sizeButton);
      canvas.before(actions);
      canvas.scrollLeft = Math.max(0, (canvas.scrollWidth - canvas.clientWidth) / 2);
      figure.dataset.rendered = 'true';
      const download = figure.querySelector('.diagram-svg');
      download.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
      download.download = `${figure.id.replace('diagram-', '')}.svg`;
      download.hidden = false;
    } catch (error) {
      figure.dataset.rendered = 'false';
      figure.querySelector('.diagram-status').textContent = readerMessages.renderError;
      figure.querySelector('details').open = true;
      console.error(`Could not render ${figure.id}`, error);
    }
  }
  // Rendering changes the article height. Keep progress and deep links accurate.
  updateReading();
  const target = document.getElementById(location.hash.slice(1));
  if (target && !document.documentElement.dataset.readerInteracted) target.scrollIntoView({ behavior: 'instant', block: 'start' });
})();
for (const event of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
  addEventListener(event, () => { document.documentElement.dataset.readerInteracted = 'true'; }, { once: true, passive: true });
}
