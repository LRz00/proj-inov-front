const API_BASE = 'http://localhost:8080/dashboard'; // ajuste conforme seu backend

document.addEventListener('DOMContentLoaded', () => {
  fetch(`${API_BASE}/total-solicitacoes`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('total-solicitacoes').textContent = `Total de Solicitações: ${data}`;
    });

  fetch(`${API_BASE}/total-usuarios`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('total-usuarios').textContent = `Total de Usuários: ${data}`;
    });

  const tipos = ['EVENTOS', 'ILUMINACAO', 'VIA_PUBLICA', 'PLANTIO', 'REMOCAO_ARVORE', 'DENUNCIA'];
  const tiposLista = document.getElementById('tipos-lista');

  tipos.forEach(tipo => {
    fetch(`${API_BASE}/solicitacoes/${tipo}`)
      .then(res => res.json())
      .then(data => {
        const li = document.createElement('li');
        li.textContent = `${tipo}: ${data}`;
        tiposLista.appendChild(li);
      });
  });

  fetch(`${API_BASE}/contagem-status`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('contagem-status');
      for (let status in data) {
        const li = document.createElement('li');
        li.textContent = `${status}: ${data[status]}`;
        list.appendChild(li);
      }
    });

  fetch(`${API_BASE}/porcentagem-status`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('porcentagem-status');
      for (let status in data) {
        const li = document.createElement('li');
        li.textContent = `${status}: ${data[status].toFixed(2)}%`;
        list.appendChild(li);
      }
    });
});
