document.getElementById('form-solicitacao').addEventListener('submit', async function (e) {
  e.preventDefault();

  const msg = document.getElementById('mensagem');

  // Captura valores do formulário
  const descricao = document.getElementById('descricao').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const nomeRua = document.getElementById('nomeRua').value.trim();
  const prioridade = document.getElementById('prioridade').value;

  // Validação dos campos obrigatórios
  if (!descricao || !bairro || !nomeRua || !prioridade) {
    msg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    msg.style.color = 'red';
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario || !usuario.id) {
    msg.textContent = 'Usuário não autenticado ou inválido.';
    msg.style.color = 'red';
    return;
  }

  const payload = {
    descricao: descricao,
    dataCriada: new Date().toISOString(),
    solicitante: { id: usuario.id },
    bairro: bairro,
    nomeRua: nomeRua,
    status: "ABERTA",
    prioridade: prioridade
  };

  try {
    const response = await fetch('http://localhost:8080/solicitacao-man-iluminacao-publica', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      msg.textContent = 'Solicitação enviada com sucesso!';
      msg.style.color = 'green';
      document.getElementById('form-solicitacao').reset();
    } else {
      const erroTexto = await response.text();
      msg.textContent = 'Erro ao enviar a solicitação.';
      msg.style.color = 'red';
      console.error('Erro do backend:', erroTexto);
    }
  } catch (error) {
    msg.textContent = 'Erro de conexão com o servidor.';
    msg.style.color = 'red';
    console.error('Erro de rede:', error);
  }
});
