document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const tipoEvento = document.getElementById("tipoEvento").value;
    const bairro = document.getElementById("bairro").value.trim();
    const nomeRua = document.getElementById("nomeRua").value.trim();
    const local = document.getElementById("local").value.trim();
    const dataEvento = document.getElementById("dataEvento").value;

    // Validação básica
    if (!tipoEvento || !bairro || !nomeRua || !local || !dataEvento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Prepara os dados para enviar ao backend
    const data = {
      tipoEvento: tipoEvento,
      bairro: bairro,
      nomeRua: nomeRua,
      local: local,
      dataEvento: dataEvento
    };

    try {
      const response = await fetch("/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // Se usar Spring Security com CSRF, adicione aqui o token
          // 'X-CSRF-TOKEN': 'valor_do_token'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor.");
      }

      const result = await response.json();

      if (result.success) {
        alert("Solicitação enviada com sucesso!");
        form.reset(); // limpa o formulário
      } else {
        alert("Erro ao enviar solicitação: " + (result.message || "Erro desconhecido."));
      }
    } catch (error) {
      alert("Erro: " + error.message);
    }
  });
});
