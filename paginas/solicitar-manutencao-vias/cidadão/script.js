const APIURL = "http://localhost:8080/solicitacao-man-via-publica";

document.getElementById('maintenanceForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const msg = document.getElementById('mensagem');

  // Recupera usuário do localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario || !usuario.id) {
    msg.textContent = "Usuário não autenticado ou inválido.";
    msg.style.color = "red";
    return;
  }

  // Valores do formulário
  const descricao = document.getElementById('descricao').value.trim();
  const nomeRua = document.getElementById('rua').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const prioridade = "MEDIA"; // Pode criar um select para o usuário escolher

  // Validação simples
  if (!descricao || !nomeRua || !bairro) {
    msg.textContent = "Preencha todos os campos obrigatórios.";
    msg.style.color = "red";
    return;
  }

  // Monta payload conforme DTO
  const payload = {
    descricao,
    nomeRua,
    bairro,
    dataCriada: new Date().toISOString(),
    status: "ABERTA",
    solicitante: { id: usuario.id },
    prioridade
  };

  try {
    const response = await fetch(APIURL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      msg.textContent = "Solicitação enviada com sucesso!";
      msg.style.color = "green";
      this.reset();
    } else {
      const erroTexto = await response.text();
      msg.textContent = "Erro ao enviar a solicitação.";
      msg.style.color = "red";
      console.error("Erro do backend:", erroTexto);
    }
  } catch (error) {
    msg.textContent = "Falha na conexão com o servidor.";
    msg.style.color = "red";
    console.error("Erro de rede:", error);
  }
});
