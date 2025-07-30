document.addEventListener("DOMContentLoaded", () => {
  carregarSolicitacoes();
  carregarMediaAvaliacoes();
});

const statusMap = {
  ABERTA: "Pendente",
  EM_ANALISE: "Em Análise",
  CONCLUIDA: "Finalizado"
};

// Buscar todas as solicitações do usuário
async function carregarSolicitacoes() {
  const tbody = document.getElementById("tabela-solicitacoes");
  tbody.innerHTML = "";
console.log("js carregado")
  try {
    const response = await fetch("http://localhost:8080/solicitacao-eventos?page=0&size=100");
    const data = await response.json();

    if (!data || !data.content) {
      tbody.innerHTML = "<tr><td colspan='5'>Nenhuma solicitação encontrada.</td></tr>";
      return;
    }

    const solicitacoes = data.content;
    solicitacoes.forEach(s => {
      const tr = document.createElement("tr");

      const dataConcluida = s.dataConcluida
        ? new Date(s.dataConcluida).toLocaleDateString()
        : "—";

      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${s.tipoEvento || "Evento"}</td>
        <td>${statusMap[s.status] || s.status}</td>
        <td>${dataConcluida}</td>
        <td>
          ${gerarEstrelasHtml(s.id)}
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Adiciona listeners de avaliação
    document.querySelectorAll(".estrela").forEach(estrela => {
      estrela.addEventListener("click", () => {
        const nota = parseInt(estrela.dataset.valor);
        const id = estrela.dataset.id;
        avaliarSolicitacao(id, nota, estrela);
      });
    });

  } catch (erro) {
    console.error("Erro ao carregar solicitações:", erro);
    tbody.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados.</td></tr>";
  }
}

// HTML para estrelas de avaliação
function gerarEstrelasHtml(id) {
  return `
    <div class="estrelas">
      ${[1,2,3,4,5].map(n => `<span class="estrela" data-id="${id}" data-valor="${n}">&#9733;</span>`).join('')}
    </div>
  `;
}

// Avaliar uma solicitação
async function avaliarSolicitacao(id, nota, estrelaClicada) {
  try {
    const resp = await fetch(`http://localhost:8080/solicitacao-eventos/${id}/avaliar?nota=${nota}`, {
      method: "POST"
    });

    if (!resp.ok) throw new Error("Erro ao avaliar");

    // Atualiza visual das estrelas
    const container = estrelaClicada.parentElement;
    const estrelas = container.querySelectorAll(".estrela");
    estrelas.forEach((e, i) => {
      e.style.color = i < nota ? "#f1c40f" : "#ccc";
    });

    alert(`Avaliação enviada para solicitação ${id}!`);

    // Recarrega média
    carregarMediaAvaliacoes();

  } catch (erro) {
    console.error("Erro ao enviar avaliação:", erro);
    alert("Erro ao enviar avaliação.");
  }
}

// Média geral
async function carregarMediaAvaliacoes() {
  try {
    const resp = await fetch("http://localhost:8080/solicitacao-eventos/media");
    if (!resp.ok) throw new Error("Erro");
    const media = await resp.json();

    const el = document.getElementById("media-geral");
    el.textContent = `Média de avaliações: ${media.toFixed(1)}`;
  } catch {
    document.getElementById("media-geral").textContent = "Média de avaliações: não disponível";
  }
}