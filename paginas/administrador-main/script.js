function toggleCategory(header) {
    const next = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    const isOpen = next.style.display === 'flex';

    // Fecha todas
    document.querySelectorAll('.subcategory').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.arrow').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));

    if (!isOpen) {
        next.style.display = 'flex';
        arrow.classList.add('open');
        header.classList.add('active');
    }
}

function showService(id) {
    document.querySelectorAll('.service-details').forEach(d => d.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');

    // Oculta o texto padrão
    document.getElementById("default-text").style.display = "none";
    document.getElementById("default-title").style.display = "none";

    // Adiciona o conteúdo dinâmico
    const content = `
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <a href="${link}">
        <button class="access-button">Acessar Serviço</button>
        </a>
    `;

    document.getElementById("service-details").innerHTML = content;
}