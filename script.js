// ==================== PAGINATION + SEARCH ====================
const itemsPerPage = 10;

function initGallery() {
  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search');
  const pagination = document.getElementById('pagination');
  const countEl = document.getElementById('total-count');

  function getCards() {
    return Array.from(gallery.querySelectorAll('.vg-card'));
  }

  function showPage(page) {
    const cards = getCards();
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    cards.forEach((card, i) => {
      card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    countEl.textContent = `${cards.length} video`;
    renderPagination(totalPages, page);
  }

  function renderPagination(totalPages, current) {
    pagination.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = 'page-btn';
      if (i === current) btn.classList.add('active');
      btn.onclick = () => showPage(i);
      pagination.appendChild(btn);
    }
  }

  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    const cards = getCards();

    cards.forEach(card => {
      const title = card.querySelector('.vg-title').textContent.toLowerCase();
      card.style.display = title.includes(keyword) ? '' : 'none';
    });
    showPage(1);
  });

  // Kalau masih kosong
  setTimeout(() => {
    const cards = getCards();
    if (cards.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <h3 style="margin:0 0 8px 0;">Gallery masih kosong</h3>
        <p style="margin:0;color:#64748b;">Paste card video dari converter kamu di dalam div#gallery</p>
      `;
      gallery.appendChild(empty);
    } else {
      showPage(1);
    }
  }, 100);
}

initGallery();
