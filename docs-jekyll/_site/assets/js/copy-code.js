(() => {
  const blocks = document.querySelectorAll('pre > code');
  blocks.forEach((block) => {
    const pre = block.parentElement;
    if (!pre) return;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent || '');
        button.textContent = 'Copied';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      }
    });
    pre.appendChild(button);
  });
})();
