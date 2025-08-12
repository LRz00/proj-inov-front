document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lista-ocorrencias");

    function atualizarSolicitacao(id, dados) {
        return fetch(`http://localhost:8080/solicitacao-eventos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        }).then(response => {
            if (!response.ok) throw new Error("Falha na atualização");
            return response.json();
        });
    }

    function criarBotaoStatus(solicitacao) {
        const btn = document.createElement("button");
        btn.textContent = "Mudar Status";
        btn.style.marginRight = "0.5rem";

        btn.addEventListener("click", async () => {
            const opcoes = ["ABERTA", "EM_ANALISE", "CONCLUIDA"];
            const novoStatus = prompt(
                `Informe o novo status para a solicitação #${solicitacao.id}:\n${opcoes.join(", ")}`,
                solicitacao.status
            );

            if (!novoStatus || !opcoes.includes(novoStatus.toUpperCase())) {
                alert("Status inválido ou cancelado.");
                return;
            }

            const dadosParaAtualizar = {
                descricao: solicitacao.descricao,
                comentarios: solicitacao.comentarios,
                bairro: solicitacao.bairro,
                nomeRua: solicitacao.nomeRua,
                local: solicitacao.local,
                dataEvento: solicitacao.dataEvento,
                tipoEvento: solicitacao.tipoEvento,
                status: novoStatus.toUpperCase()
            };

            try {
                await atualizarSolicitacao(solicitacao.id, dadosParaAtualizar);
                alert("Status atualizado com sucesso!");
                location.reload();
            } catch (error) {
                alert("Erro ao atualizar status.");
                console.error(error);
            }
        });

        return btn;
    }

    function criarBotaoComentario(solicitacao) {
        const btn = document.createElement("button");
        btn.textContent = "Adicionar Comentário";

        btn.addEventListener("click", async () => {
            const novoComentario = prompt(
                `Adicione um comentário para a solicitação #${solicitacao.id}:`,
                solicitacao.comentarios || ""
            );

            if (novoComentario === null) return;

            const dadosParaAtualizar = {
                descricao: solicitacao.descricao,
                comentarios: novoComentario,
                bairro: solicitacao.bairro,
                nomeRua: solicitacao.nomeRua,
                local: solicitacao.local,
                dataEvento: solicitacao.dataEvento,
                tipoEvento: solicitacao.tipoEvento,
                status: solicitacao.status
            };

            try {
                await atualizarSolicitacao(solicitacao.id, dadosParaAtualizar);
                alert("Comentário atualizado com sucesso!");
                location.reload();
            } catch (error) {
                alert("Erro ao atualizar comentário.");
                console.error(error);
            }
        });

        return btn;
    }

    fetch("http://localhost:8080/solicitacao-eventos?page=0&size=50")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar dados");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";

            if (!data.content || data.content.length === 0) {
                container.innerHTML = "<p>Nenhuma solicitação encontrada.</p>";
                return;
            }

            data.content.forEach(solicitacao => {
                const div = document.createElement("div");
                div.classList.add("solicitacao");

                div.innerHTML = `
                    <h3>Solicitação #${solicitacao.id} - ${solicitacao.tipoEvento || "Tipo não informado"}</h3>
                    <p><strong>Status:</strong> ${solicitacao.status}</p>
                    <p><strong>Descrição:</strong> ${solicitacao.descricao}</p>
                    <p><strong>Bairro:</strong> ${solicitacao.bairro || "-"}</p>
                    <p><strong>Rua:</strong> ${solicitacao.nomeRua || "-"}</p>
                    <p><strong>Local:</strong> ${solicitacao.local || "-"}</p>
                    <p><strong>Data Evento:</strong> ${solicitacao.dataEvento || "-"}</p>
                    <p><strong>Solicitante:</strong> ${solicitacao.solicitante?.nome || "Desconhecido"} (${solicitacao.solicitante?.perfil || "N/A"})</p>
                    <p><strong>Comentários:</strong> ${solicitacao.comentarios || "Nenhum"}</p>
                `;

                const botoesDiv = document.createElement("div");
                botoesDiv.style.marginTop = "10px";
                botoesDiv.appendChild(criarBotaoStatus(solicitacao));
                botoesDiv.appendChild(criarBotaoComentario(solicitacao));

                div.appendChild(botoesDiv);
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Erro no fetch:", error);
            container.innerHTML = "<p>Erro ao carregar solicitações.</p>";
        });
});
