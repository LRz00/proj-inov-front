const API_BASE = 'http://localhost:8080/dashboard'; // ajuste conforme sua URL

const tipos = ['EVENTOS', 'ILUMINACAO', 'VIA_PUBLICA', 'PLANTIO', 'REMOCAO_ARVORE', 'DENUNCIA'];
const tipoLabels = {
  EVENTOS: "Eventos",
  ILUMINACAO: "Iluminação",
  VIA_PUBLICA: "Via Pública",
  PLANTIO: "Plantio",
  REMOCAO_ARVORE: "Remoção de Árvore",
  DENUNCIA: "Denúncia"
};

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

  Promise.all(tipos.map(tipo =>
    fetch(`${API_BASE}/solicitacoes/${tipo}`).then(res => res.json())
  )).then(dataArray => {
    const counts = {};
    tipos.forEach((tipo, i) => {
      counts[tipo] = dataArray[i];
    });
    drawTipoChart(counts);
  });

  fetch(`${API_BASE}/porcentagem-status`)
    .then(res => res.json())
    .then(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      drawStatusPie(labels, values);
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
});

// Gráfico de barras por tipo
function drawTipoChart(counts) {
  const ctx = document.getElementById('tipoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tipos.map(t => tipoLabels[t]),
      datasets: [{
        label: 'Solicitações por Tipo',
        data: Object.values(counts),
        backgroundColor: 'rgba(242, 100, 25, 0.8)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Gráfico de pizza por status
function drawStatusPie(labels, values) {
  const ctx = document.getElementById('statusPie').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          'rgba(244, 71, 8, 0.8)',
          'rgba(242, 100, 25, 0.8)',
          '#ffb347',
          '#ff8c69',
          '#ffd9b3',
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
