document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lista-ocorrencias");

    // Função para atualizar solicitação, mantive caso precise depois
    function atualizarSolicitacao(id, dados) {
        return fetch(`http://localhost:8080/solicitacao-plantio-arvore/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        }).then(response => {
            if (!response.ok) throw new Error("Falha na atualização");
            return response.json();
        });
    }

    // Busca as ocorrências e monta a lista
    fetch("http://localhost:8080/solicitacao-plantio-arvore")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar dados");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";

            if (!data.content || data.content.length === 0) {
                container.innerHTML = "<p>Nenhuma ocorrência encontrada.</p>";
                return;
            }

            data.content.forEach(ocorrencia => {
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

                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Erro no fetch:", error);
            container.innerHTML = "<p>Erro ao carregar ocorrências.</p>";
        });
});
