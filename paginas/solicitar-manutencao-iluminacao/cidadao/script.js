document.getElementById('form-solicitacao').addEventListener('submit', async function (e) {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const nomeRua = document.getElementById('nomeRua').value.trim();

  // Validação simples dos campos
  if (!descricao || !bairro || !nomeRua) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return; 
  }

  const solicitante = JSON.parse(localStorage.getItem('usuario'));;

  const payload = {
    descricao: descricao,
    dataCriada: new Date().toISOString(),
    solicitante,
    bairro: bairro,
    nomeRua: nomeRua,
    status: "ABERTA" 
  };

  console.log(JSON.stringify(payload));

  try {
    const response = await fetch('http://localhost:8080/solicitacao-man-iluminacao-publica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Solicitação enviada com sucesso!');
      document.getElementById('form-solicitacao').reset();
    } else {
      const erro = await response.json();
      console.error('Erro:', erro);
      alert('Erro ao enviar a solicitação. Verifique os campos ou tente novamente.');
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Erro de conexão com o servidor.');
  }
});
