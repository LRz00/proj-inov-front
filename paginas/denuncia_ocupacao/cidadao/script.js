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
    const response = await fetch("/denuncias", {
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


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/denuncias/1/media") // ou o ID correto
    .then(res => {
      if (!res.ok) throw new Error("Erro ao obter média");
      return res.json(); // isso ainda é correto, pois é um double serializado como JSON
    })
    .then(media => {
      document.getElementById("media-valor").textContent = `Média de avaliações: ${media.toFixed(1)}`;
    })
    .catch(erro => {
      console.error("Erro ao carregar média:", erro);
      document.getElementById("media-valor").textContent = "Não disponível";
    });
});
