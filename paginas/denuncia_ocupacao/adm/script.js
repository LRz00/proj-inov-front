document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lista-ocorrencias");

  function atualizarDenuncia(id, dados) {
    return fetch(`http://localhost:8080/denuncias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    }).then((response) => {
      if (!response.ok) throw new Error("Falha na atualização");
      return response.json();
    });
  }

  function criarBotaoStatus(denuncia) {
    const btn = document.createElement("button");
    btn.textContent = "Mudar Status";
    btn.style.marginRight = "0.5rem";

    btn.addEventListener("click", async () => {
      const opcoes = ["ABERTA", "EM_ANALISE", "CONCLUIDA"];
      const novoStatus = prompt(
        `Informe o novo status para a denúncia #${denuncia.id}:\n${opcoes.join(", ")}`,
        denuncia.status
      );

      if (!novoStatus || !opcoes.includes(novoStatus.toUpperCase())) {
        alert("Status inválido ou cancelado.");
        return;
      }

      const dadosParaAtualizar = {
        descricao: denuncia.descricao,
        comentarios: denuncia.comentarios,
        prioridade: denuncia.prioridade,
        denuncia: denuncia.denuncia,
        dataConcluida: denuncia.dataConcluida,
        status: novoStatus.toUpperCase(),
      };

      try {
        await atualizarDenuncia(denuncia.id, dadosParaAtualizar);
        alert("Status atualizado com sucesso!");
        location.reload();
      } catch (error) {
        alert("Erro ao atualizar status.");
        console.error(error);
      }
    });

    return btn;
  }

  function criarBotaoComentario(denuncia) {
    const btn = document.createElement("button");
    btn.textContent = "Adicionar Comentário";

    btn.addEventListener("click", async () => {
      const novoComentario = prompt(
        `Adicione um comentário para a denúncia #${denuncia.id}:`,
        denuncia.comentarios || ""
      );

      if (novoComentario === null) return;

      const dadosParaAtualizar = {
        descricao: denuncia.descricao,
        comentarios: novoComentario,
        prioridade: denuncia.prioridade,
        denuncia: denuncia.denuncia,
        dataConcluida: denuncia.dataConcluida,
        status: denuncia.status,
      };

      try {
        await atualizarDenuncia(denuncia.id, dadosParaAtualizar);
        alert("Comentário atualizado com sucesso!");
        location.reload();
      } catch (error) {
        alert("Erro ao atualizar comentário.");
        console.error(error);
      }
    });

    return btn;
  }

  fetch("http://localhost:8080/denuncias?page=0&size=50")
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao carregar dados");
      return response.json();
    })
    .then((data) => {
      container.innerHTML = "";

      if (!data.content || data.content.length === 0) {
        container.innerHTML = "<p>Nenhuma denúncia encontrada.</p>";
        return;
      }

      data.content.forEach((denuncia) => {
        const div = document.createElement("div");
        div.classList.add("denuncia");

        div.innerHTML = `
          <h3>Denúncia #${denuncia.id} - ${denuncia.denuncia || "Tipo não informado"}</h3>
          <p><strong>Status:</strong> ${denuncia.status}</p>
          <p><strong>Descrição:</strong> ${denuncia.descricao}</p>
          <p><strong>Prioridade:</strong> ${denuncia.prioridade || "-"}</p>
          <p><strong>Data Criada:</strong> ${denuncia.dataCriada || "-"}</p>
          <p><strong>Data Concluída:</strong> ${denuncia.dataConcluida || "-"}</p>
          <p><strong>Solicitante:</strong> ${denuncia.solicitante?.nome || "Desconhecido"} (${denuncia.solicitante?.perfil || "N/A"})</p>
          <p><strong>Comentários:</strong> ${denuncia.comentarios || "Nenhum"}</p>
        `;

        const botoesDiv = document.createElement("div");
        botoesDiv.style.marginTop = "10px";
        botoesDiv.appendChild(criarBotaoStatus(denuncia));
        botoesDiv.appendChild(criarBotaoComentario(denuncia));

        div.appendChild(botoesDiv);
        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Erro no fetch:", error);
      container.innerHTML = "<p>Erro ao carregar denúncias.</p>";
    });
});
