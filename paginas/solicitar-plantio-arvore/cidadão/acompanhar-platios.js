const APIURL = "http://localhost:8080/solicitacao-plantio-arvore";

async function carregarSolicitacoes() {
  const tabela = document.getElementById("tabela-solicitacoes");
  const alerta = document.getElementById("alerta");

  try {
    const resposta = await fetch(APIURL);
    if (!resposta.ok) throw new Error("Erro ao buscar solicitações.");

    const data = await resposta.json();
    const solicitacoes = data.content; // ← PEGA A LISTA AQUI

    if (!solicitacoes || solicitacoes.length === 0) {
      alerta.textContent = "Nenhuma solicitação encontrada.";
      alerta.className = "alert alert-info";
      alerta.classList.remove("d-none");
      return;
    }

    solicitacoes.forEach(item => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${item.nomeRua}</td>
        <td>${item.bairro}</td>
        <td>${item.numCasa}</td>
        <td>${item.nomeArvore}</td>
        <td>${item.descricao}</td>
        <td><span class="badge bg-${item.status === 'ABERTA' ? 'warning' : 'success'}">${item.status}</span></td>
        <td>${new Date(item.dataCriada).toLocaleDateString('pt-BR')}</td>
      `;

      tabela.appendChild(linha);
    });

  } catch (erro) {
    alerta.textContent = "Erro ao carregar os dados.";
    alerta.className = "alert alert-danger";
    alerta.classList.remove("d-none");
    console.error(erro);
  }
}

window.onload = carregarSolicitacoes;
