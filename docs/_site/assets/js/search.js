(() => {
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');
  if (!input || !results) return;

  let index = [];

  const render = (items) => {
    results.innerHTML = '';
    if (!items.length) {
      results.innerHTML = '<div class="search-result">No matches.</div>';
      return;
    }
    items.slice(0, 8).forEach((item) => {
      const el = document.createElement('div');
      el.className = 'search-result';
      el.innerHTML = `<a href="${item.url}"><strong>${item.title}</strong></a><div>${item.snippet}</div>`;
      results.appendChild(el);
    });
  };

  const search = (query) => {
    const q = query.toLowerCase();
    if (!q) {
      results.innerHTML = '';
      return;
    }
    const hits = index
      .map((item) => {
        const content = item.content.toLowerCase();
        const idx = content.indexOf(q);
        return idx === -1 ? null : {
          ...item,
          snippet: item.content.substring(Math.max(0, idx - 60), idx + 120) + '...'
        };
      })
      .filter(Boolean);
    render(hits);
  };

  const indexUrl = document.body.dataset.searchIndex || '/search.json';
  fetch(indexUrl)
    .then((res) => res.json())
    .then((data) => {
      index = data;
    })
    .catch(() => {
      results.innerHTML = '<div class="search-result">Search index unavailable.</div>';
    });

  input.addEventListener('input', (event) => {
    search(event.target.value || '');
  });
})();
