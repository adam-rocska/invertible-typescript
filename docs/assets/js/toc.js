(() => {
  const toc = document.getElementById('toc-list');
  if (!toc) return;

  const headings = Array.from(document.querySelectorAll('.doc-content h2, .doc-content h3'));
  const items = headings.map((heading) => {
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.dataset.level = heading.tagName.toLowerCase();
    link.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub' : '';
    toc.appendChild(link);
    return { heading, link };
  });

  const updateActive = () => {
    const offset = 120;
    let active = null;
    for (const item of items) {
      if (item.heading.getBoundingClientRect().top - offset <= 0) {
        active = item;
      }
    }
    items.forEach((item) => item.link.classList.remove('active'));
    if (active) active.link.classList.add('active');
  };

  updateActive();
  document.addEventListener('scroll', updateActive, { passive: true });
})();
