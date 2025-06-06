function salvarAgendamento() {
    const form = document.getElementById("formAgendamento");
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Você precisa estar logado para agendar um exame.");
        window.location.href = "/login.html"; // redireciona para login se necessário
        return;
    }

    // Coleta dos valores dos campos
    const pacienteId = form.pacienteId.value.trim();
    const exameId = form.exameId.value.trim();
    const dataHora = form.dataHora.value.trim();
    const localColeta = form.localColeta.value.trim();
    const observacoes = form.observacoes.value.trim();

    // Validação simples
    if (!pacienteId || isNaN(pacienteId) || parseInt(pacienteId) <= 0) {
        alert("Informe um ID de paciente válido.");
        form.pacienteId.focus();
        return;
    }

    if (!exameId || isNaN(exameId) || parseInt(exameId) <= 0) {
        alert("Informe um ID de exame válido.");
        form.exameId.focus();
        return;
    }

    if (!dataHora) {
        alert("Informe a data e hora do exame.");
        form.dataHora.focus();
        return;
    }

    if (!localColeta) {
        alert("Informe o local de coleta.");
        form.localColeta.focus();
        return;
    }

    // Se passou na validação, envia os dados
    const dados = {
        pacienteId: parseInt(pacienteId),
        exameId: parseInt(exameId),
        dataHora: dataHora,
        localColeta: localColeta,
        observacoes: observacoes
    };

    fetch('http://localhost:8080/agendamento-exame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Token JWT no cabeçalho
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert("Agendamento salvo com sucesso!");
            form.reset();
        } else if (response.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/login.html";
        } else {
            alert("Erro ao salvar o agendamento.");
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro na comunicação com o servidor.");
    });
}
