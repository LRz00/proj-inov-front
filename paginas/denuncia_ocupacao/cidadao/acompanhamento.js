// Script para preencher tabela e avaliação por estrelas na tela de acompanhamento do cidadão

// Dados simulados de solicitações do cidadão
const minhasSolicitacoes = [
  {
    id: 1,
    tipo: "Denúncia de Ocupação",
    status: "Em Análise",
    ultimaAtualizacao: "20/07/2025"
  },
  {
    id: 2,
    tipo: "Solicitação de Denúncia",
    status: "Finalizado",
    ultimaAtualizacao: "18/07/2025"
  }
];

// Preenche a tabela com as solicitações
function preencherTabelaCidadao() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  minhasSolicitacoes.forEach(sol => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sol.id}</td>
      <td>${sol.tipo}</td>
      <td>${sol.status}</td>
      <td>${sol.ultimaAtualizacao}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Avaliação por estrelas
const estrelas = document.querySelectorAll(".estrela");
const notaSelecionada = document.getElementById("nota-selecionada");

// Função para mudar cor das estrelas clicadas
function marcarEstrelas(nota) {
  estrelas.forEach((estrela, i) => {
    estrela.style.color = i < nota ? "#f1c40f" : "#ccc"; // amarelo ou cinza
  });
}

// Envio da avaliação (simulado)
function enviarAvaliacao(nota) {
  alert(`Você avaliou o serviço com ${nota} estrela${nota > 1 ? 's' : ''}. Obrigado!`);
  notaSelecionada.textContent = `Você avaliou este serviço com ${nota} estrela${nota > 1 ? 's' : ''}.`;
}

// Adiciona evento de clique nas estrelas
estrelas.forEach((estrela, index) => {
  estrela.addEventListener("click", () => {
    const nota = index + 1;
    marcarEstrelas(nota);
    enviarAvaliacao(nota);
  });
});

// Executa o preenchimento das tabelas ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  preencherTabelaCidadao();
});