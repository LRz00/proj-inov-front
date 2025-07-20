document.getElementById('denuncia-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const denuncia = document.getElementById('denuncia').value;
  const solicitanteId = document.getElementById('solicitante').value;

  if (!descricao || !prioridade || !denuncia || !solicitanteId) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const data = {
    descricao: descricao,
    dataCriada: new Date().toISOString(),
    status: "PENDENTE", 
    solicitante: {
      id: parseInt(solicitanteId)
    },
    prioridade: prioridade,
    denuncia: denuncia
  };

  try {
    const response = await fetch("/api/denuncias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result) {
      alert("Denúncia enviada com sucesso!");
      document.getElementById('denuncia-form').reset();
    } else {
      alert("Erro ao enviar denúncia: " + (result.message || "desconhecido"));
    }

  } catch (error) {
    alert("Erro de conexão com o servidor: " + error.message);
  }
});
