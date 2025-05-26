function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            const content = document.getElementById('content');
            content.innerHTML = html;
            document.querySelectorAll('.navbar__links a')
                .forEach(a => a.classList.remove('active'));
            const current = document.querySelector(`.navbar__links a[onclick*="${page}"]`);
            if (current) current.classList.add('active');
            if (page === 'catalog.html' && typeof initCatalog === 'function') {
                initCatalog();
            }
        })
        .catch(err => console.error('Ошибка при загрузке страницы:', err));
}
document.addEventListener('DOMContentLoaded', () => {
    loadPage('home.html');                      // первая страница

    const homeLink = document.querySelector('.navbar__links a[onclick*="home.html"]');
    if (homeLink) homeLink.classList.add('active');
});
