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

let idAtualAvaliado = null;

document.addEventListener("DOMContentLoaded", () => {
  carregarDenuncias();
  configurarEstrelas();
});

// Carregar a tabela de denúncias
async function carregarDenuncias() {
  try {
    const response = await fetch("http://localhost:8080/denuncias");
    const data = await response.json();
    const denuncias = data.content;

    const tbody = document.getElementById("tabela-denuncias");
    tbody.innerHTML = "";

    denuncias.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.id}</td>
        <td>${mapaDenuncia[d.denuncia] || d.denuncia}</td>
        <td>${mapaStatus[d.status] || d.status}</td>
        <td>${d.dataConcluida ? new Date(d.dataConcluida).toLocaleDateString() : "Não concluída"}</td>
        <td><button class="btn-avaliar" data-id="${d.id}">Avaliar</button></td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-avaliar").forEach(botao => {
      botao.addEventListener("click", () => {
        const idDenuncia = botao.dataset.id;
        mostrarAvaliacao(idDenuncia);
      });
    });

  } catch (err) {
    console.error("Erro ao carregar denúncias:", err);
  }
}

// Mostrar a seção de avaliação para a denúncia clicada
function mostrarAvaliacao(id) {
  idAtualAvaliado = id;
  document.getElementById("id-denuncia-avaliacao").textContent = id;
  document.getElementById("avaliacao-container").style.display = "block";
  notaSelecionada.textContent = "";
  marcarEstrelas(0); // resetar estrelas
}

// Estrelas
const estrelas = document.querySelectorAll(".estrela");
const notaSelecionada = document.getElementById("nota-selecionada");

function configurarEstrelas() {
  estrelas.forEach((estrela, index) => {
    estrela.addEventListener("click", () => {
      const nota = index + 1;
      marcarEstrelas(nota);
      enviarAvaliacao(nota);
    });
  });
}

function marcarEstrelas(nota) {
  estrelas.forEach((estrela, i) => {
    estrela.style.color = i < nota ? "#f1c40f" : "#ccc";
  });
}

// Enviar avaliação ao backend
async function enviarAvaliacao(nota) {
  try {
    const response = await fetch(`http://localhost:8080/denuncias/${idAtualAvaliado}/avaliar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nota })
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar avaliação");
    }

    notaSelecionada.textContent = `Você avaliou com ${nota} estrela${nota > 1 ? 's' : ''}.`;
    alert(`Avaliação enviada com sucesso para a denúncia ID ${idAtualAvaliado}.`);

  } catch (error) {
    console.error("Erro ao enviar avaliação:", error);
    alert("Erro ao enviar sua avaliação. Tente novamente.");
  }
}
