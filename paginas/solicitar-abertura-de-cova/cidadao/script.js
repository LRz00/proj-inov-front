
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('maintenanceForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita recarregar a página

    // Pega os valores do formulário
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
     const numCasa = document.getElementById('numCasa').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    // Monta o objeto com os dados
    const dados = {
      nomeRua: rua,
      bairro: bairro,
      numCasa : numCasa,
      descricao: descricao
    };

    try {
      const resposta = await fetch('http://localhost:8080/solicitacao-enterro-abertura-cova', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      if (resposta.ok) {
        mensagem.textContent = 'Solicitação enviada com sucesso!';
        mensagem.style.color = 'green';
        form.reset(); // Limpa o formulário
      } else {
        const erro = await resposta.text();
        mensagem.textContent = `Erro ao enviar: ${erro}`;
        mensagem.style.color = 'red';
      }
    } catch (error) {
      console.error('Erro:', error);
      mensagem.textContent = 'Erro de conexão com o servidor.';
      mensagem.style.color = 'red';
    }
  });
});
