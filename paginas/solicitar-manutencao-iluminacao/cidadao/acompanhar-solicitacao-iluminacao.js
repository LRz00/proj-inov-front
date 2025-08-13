const API_URL = "http://localhost:8080/solicitacao-man-iluminacao-publica";
let paginaAtual = 0;
const tamanhoPagina = 10;

async function carregarSolicitacoes(pagina = 0, tamanho = 10) {
  const tabela = document.getElementById('tabela-solicitacoes');
  const msg = document.getElementById('mensagem');

  tabela.innerHTML = '';
  msg.textContent = '';
  msg.className = '';

  try {
    const response = await fetch(`${API_URL}?page=${pagina}&size=${tamanho}`);
    if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.status}`);

    const data = await response.json();
    console.log("Resposta da API:", data);

    // Ajuste: o array de solicitações geralmente está em "content"
    const solicitacoes = data.content || [];

    if (solicitacoes.length === 0) {
      msg.textContent = "Nenhuma solicitação encontrada.";
      return;
    }

    solicitacoes.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.bairro}</td>
        <td>${item.nomeRua}</td>
        <td>${item.descricao}</td>
        <td>${item.status}</td>
        <td>${new Date(item.dataCriada).toLocaleDateString('pt-BR')}</td>
        <td>${item.solicitante ? item.solicitante.nome || item.solicitante.id : ''}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (error) {
    msg.textContent = "Erro: " + error.message;
    msg.className = 'text-danger';
    console.error(error);
  }
}

window.onload = () => {
  carregarSolicitacoes(paginaAtual, tamanhoPagina);
};
