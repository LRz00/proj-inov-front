const estrelas = document.querySelectorAll(".estrela");
const notaTexto = document.getElementById("nota-selecionada");

// ID simbólico usado para avaliar o serviço como um todo
const ID_SERVICO = 9999;

estrelas.forEach((estrela, index) => {
  estrela.addEventListener("click", async () => {
    const nota = index + 1;

    // Visual: pintar as estrelas
    estrelas.forEach((el, i) => {
      el.style.color = i < nota ? "#f1c40f" : "#ccc";
    });

    notaTexto.textContent = `Você avaliou este serviço com ${nota} estrela${nota > 1 ? 's' : ''}.`;

    try {
      const resposta = await fetch(`http://localhost:8080/solicitacao-eventos/1/avaliar?nota=${nota}`, {
        method: 'POST'
      });

      if (resposta.ok) {
        console.log("Avaliação enviada com sucesso!");
      } else {
        console.error("Erro ao enviar avaliação:", resposta.status);
      }
    } catch (erro) {
      console.error("Erro de rede ao enviar avaliação:", erro);
    }
  });
});
