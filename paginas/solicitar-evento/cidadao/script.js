document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  carregarMediaAvaliacoes();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const tipoEvento = document.getElementById("tipoEvento").value;
    const bairro = document.getElementById("bairro").value.trim();
    const nomeRua = document.getElementById("nomeRua").value.trim();
    const local = document.getElementById("local").value.trim();
    const dataEvento = document.getElementById("dataEvento").value;
    const solicitante = JSON.parse(localStorage.getItem('usuario'));

    if (!tipoEvento || !bairro || !nomeRua || !local || !dataEvento || !solicitante || !solicitante.id) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Prepara os dados para enviar ao backend
    const data = {
      descricao: `Solicitação para evento do tipo ${tipoEvento}`,
      dataCriada: new Date().toISOString(),
      status: "ABERTA",
      solicitante,
      tipoEvento: tipoEvento,
      bairro: bairro,
      nomeRua: nomeRua,
      local: local,
      dataEvento: dataEvento // no formato datetime-local já está ISO
    };

    try {
      const response = await fetch("http://localhost:8080/solicitacao-eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Solicitação enviada com sucesso!");
        form.reset();
      } else {
        alert("Erro ao enviar solicitação: " + (result.message || "Erro desconhecido."));
      }
    } catch (error) {
      alert("Erro: " + error.message);
    }
  });
});

// Buscar e exibir média de avaliações
async function carregarMediaAvaliacoes() {
  try {
    const response = await fetch("http://localhost:8080/solicitacao-eventos/media");

    if (!response.ok) {
      throw new Error("Erro ao obter média");
    }

    const media = await response.json();
    document.getElementById("media-avaliacoes").textContent = `Média de avaliações: ${media.toFixed(1)}`;
  } catch (error) {
    console.error("Erro ao buscar média de avaliações:", error);
    document.getElementById("media-avaliacoes").textContent = "Média de avaliações: não disponível";
  }
}
