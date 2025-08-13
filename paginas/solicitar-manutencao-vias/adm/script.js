document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lista-ocorrencias");

    function atualizarSolicitacao(id, dados) {
        return fetch(`http://localhost:8080/solicitacao-man-via-publica/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        }).then(response => {
            if (!response.ok) throw new Error("Falha na atualização");
            return response.json();
        });
    }

    function criarBotaoStatus(ocorrencia) {
        const btn = document.createElement("button");
        btn.textContent = "Mudar Status";
        btn.style.marginRight = "0.5rem";

        btn.addEventListener("click", async () => {
            const opcoes = ["ABERTA", "EM_ANALISE", "CONCLUIDA"];
            const novoStatus = prompt(
                `Informe o novo status para a solicitação #${ocorrencia.id}:\n` + opcoes.join(", "),
                ocorrencia.status
            );

            if (!novoStatus || !opcoes.includes(novoStatus.toUpperCase())) {
                alert("Status inválido ou cancelado.");
                return;
            }

            const dadosParaAtualizar = {
                descricao: ocorrencia.descricao || "",
                comentarios: ocorrencia.comentarios || "",
                bairro: ocorrencia.bairro || "",
                nomeRua: ocorrencia.nomeRua || "",
                status: novoStatus.toUpperCase(),
            };

            try {
                await atualizarSolicitacao(ocorrencia.id, dadosParaAtualizar);
                alert("Status atualizado com sucesso!");
                location.reload();
            } catch (error) {
                alert("Erro ao atualizar status.");
                console.error(error);
            }
        });

        return btn;
    }

    function criarBotaoComentario(ocorrencia) {
        const btn = document.createElement("button");
        btn.textContent = "Adicionar Comentário";

        btn.addEventListener("click", async () => {
            const novoComentario = prompt(
                `Adicione um comentário para a solicitação #${ocorrencia.id}:`,
                ocorrencia.comentarios || ""
            );

            if (novoComentario === null) return;

            const dadosParaAtualizar = {
                descricao: ocorrencia.descricao,
                comentarios: novoComentario,
                bairro: ocorrencia.bairro,
                nomeRua: ocorrencia.nomeRua,
                status: ocorrencia.status,
            };

            try {
                await atualizarSolicitacao(ocorrencia.id, dadosParaAtualizar);
                alert("Comentário atualizado com sucesso!");
                location.reload();
            } catch (error) {
                alert("Erro ao atualizar comentário.");
                console.error(error);
            }
        });

        return btn;
    }

    // Buscar solicitações de manutenção de vias públicas
    fetch("http://localhost:8080/solicitacao-man-via-publica")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar dados");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";

            const solicitacoes = data.content || data.items || []; // dependendo do PageableDto

            if (solicitacoes.length === 0) {
                container.innerHTML = "<p>Nenhuma ocorrência encontrada.</p>";
                return;
            }

            solicitacoes.forEach(ocorrencia => {
                const div = document.createElement("div");
                div.classList.add("ocorrencia");
                div.innerHTML = `
                    <h3>Solicitação #${ocorrencia.id}</h3>
                    <p><strong>Status:</strong> ${ocorrencia.status}</p>
                    <p><strong>Descrição:</strong> ${ocorrencia.descricao}</p>
                    <p><strong>Bairro:</strong> ${ocorrencia.bairro}</p>
                    <p><strong>Rua:</strong> ${ocorrencia.nomeRua}</p>
                    <p><strong>Data Criada:</strong> ${new Date(ocorrencia.dataCriada).toLocaleString('pt-BR')}</p>
                    <p><strong>Solicitante:</strong> ${ocorrencia.solicitante?.nome || "Desconhecido"} (${ocorrencia.solicitante?.perfil || "N/A"})</p>
                    <p><strong>Comentários:</strong> ${ocorrencia.comentarios || "Nenhum"}</p>
                `;

                const btnStatus = criarBotaoStatus(ocorrencia);
                const btnComentario = criarBotaoComentario(ocorrencia);

                const botoesDiv = document.createElement("div");
                botoesDiv.style.marginTop = "10px";
                botoesDiv.appendChild(btnStatus);
                botoesDiv.appendChild(btnComentario);

                div.appendChild(botoesDiv);
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Erro no fetch:", error);
            container.innerHTML = "<p>Erro ao carregar ocorrências.</p>";
        });

    // Média de avaliações
    const mediaElemento = document.getElementById("media-valor");
    if (mediaElemento) {
        fetch("http://localhost:8080/solicitacao-man-via-publica/media")
            .then(res => {
                if (!res.ok) throw new Error("Erro ao obter média");
                return res.json();
            })
            .then(dados => {
                mediaElemento.textContent = `Média de avaliações: ${dados.toFixed(1)}`;
            })
            .catch(erro => {
                console.error("Erro ao carregar média:", erro);
                mediaElemento.textContent = "Não disponível";
            });
    }
});
