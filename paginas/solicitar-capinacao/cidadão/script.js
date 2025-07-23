
  document.getElementById('maintenanceForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores do formulário
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const descricao = document.getElementById('descricao').value;

    // Monta o objeto com os dados
    const dados = {
      nomeRua: rua,
      bairro: bairro,
      descricao: descricao
    };

    try {
      const resposta = await fetch('http://localhost:8080/solicitacao-capinacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        document.getElementById('mensagem').textContent = 'Solicitação enviada com sucesso!';
        document.getElementById('maintenanceForm').reset();
      } else {
        document.getElementById('mensagem').textContent = 'Erro: ' + (resultado.message || 'Não foi possível enviar a solicitação.');
      }
    } catch (erro) {
      console.error('Erro ao enviar:', erro);
      document.getElementById('mensagem').textContent = 'Erro ao conectar com o servidor.';
    }
  })