async function initCatalog () {
    try {
        const items = await fetch('../data/products.json').then(r => r.json());
        renderCatalog(items);

        document
            .getElementById('sortSelect')
            .addEventListener('change', e => handleSort(e, items));
    } catch (err) {
        console.error('Ошибка загрузки каталога:', err);
    }
}

function handleSort (e, items) {
    const val = e.target.value;
    const sorted = [...items];                       // копия массива

    if (val === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
    if (val === 'price-desc') sorted.sort((a, b) => b.price - a.price);

    renderCatalog(sorted);
}

function renderCatalog (items) {
    const grid = document.getElementById('catalogGrid');
    grid.innerHTML = items.map(toCard).join('');
}

function toCard (item) {
    return `
    <div class="product-card">
      <img src="${item.img}" alt="${item.title}">
      <h3 class="product-title">${item.title}</h3>
      <p class="product-desc">${item.desc}</p>
      <div class="product-bottom">
        <span class="product-price">${item.price} руб/кг</span>
        <button class="product-add" onclick="addToCart(${item.id})">
          <img src="../assets/cart2.svg" alt="Добавить в корзину">
        </button>
      </div>
    </div>`;
}

function addToCart (id) {
    alert(`Товар ${id} добавлен в корзину`);
}