function listarAgendamentos() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Você precisa estar logado para ver os agendamentos.");
        window.location.href = "/login.html";
        return;
    }

    fetch('http://localhost:8080/agendamento-exame', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/login.html";
            return;
        }
        if (!response.ok) {
            throw new Error("Erro ao buscar agendamentos.");
        }
        return response.json();
    })
    .then(agendamentos => {
        const tabela = document.getElementById("tabelaAgendamentos");
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher

        agendamentos.forEach(agendamento => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${agendamento.id}</td>
                <td>${agendamento.pacienteId}</td>
                <td>${agendamento.exameId}</td>
                <td>${agendamento.dataHora}</td>
                <td>${agendamento.localColeta}</td>
                <td>${agendamento.observacoes || ''}</td>
            `;

            tabela.appendChild(linha);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar agendamentos:", error);
        alert("Erro ao carregar agendamentos.");
    });
}
