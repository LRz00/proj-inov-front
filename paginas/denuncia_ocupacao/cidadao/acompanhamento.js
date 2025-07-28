async function carregarDenuncias() {
  try {
    const response = await fetch("http://localhost:8080/denuncias");
    const data = await response.json();
    const denuncias = data.content; // se for paginado

    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    denuncias.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.id}</td>
        <td>${mapaDenuncia[d.denuncia] || d.denuncia}</td>
        <td>${mapaStatus[d.status] || d.status}</td>
        <td>${d.dataConcluida ? new Date(d.dataConcluida).toLocaleDateString() : "Não concluída"}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar denúncias:", err);
  }
}

const mapaDenuncia = {
  CONSTRUCAO_IRREGULAR: "Construção Irregular",
  OCUPACAO_AREA_PUBLICA: "Ocupação de Área Pública",
  PUBLICIDADE: "Publicidade",
  FUNCIONAMENTO_EMPRESA: "Funcionamento de Empresa"
};

const mapaStatus = {
  PENDENTE: "Pendente",
  EM_ANALISE: "Em Análise",
  FINALIZADO: "Finalizado"
};

document.addEventListener("DOMContentLoaded", carregarDenuncias);


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