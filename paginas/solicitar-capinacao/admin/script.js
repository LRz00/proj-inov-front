async function listarOcorrencias() {
  try {
    const resposta = await fetch('http://localhost:8080/solicitacao-capinacao');
    const dados = await resposta.json();

    const container = document.getElementById('lista-ocorrencias');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    if (dados.length === 0) {
      container.textContent = 'Nenhuma solicitação encontrada.';
      return;
    }

    // Cria a tabela
    const tabela = document.createElement('table');
    tabela.classList.add('tabela-solicitacoes'); // Use isso no seu CSS se quiser estilizar

    // Cabeçalho
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Rua</th>
        <th>Bairro</th>
        <th>Descrição</th>
      </tr>
    `;
    tabela.appendChild(thead);

    // Corpo da tabela
    const tbody = document.createElement('tbody');
    dados.forEach(item => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${item.nomeRua}</td>
        <td>${item.bairro}</td>
        <td>${item.descricao}</td>
      `;
      tbody.appendChild(linha);
    });

    tabela.appendChild(tbody);
    container.appendChild(tabela);
  } catch (erro) {
    console.error('Erro ao buscar dados da API:', erro);
    document.getElementById('lista-ocorrencias').textContent = 'Erro ao carregar os dados.';
  }
}

// Chamar quando a página carregar
window.onload = listarDadosDaAPI;
