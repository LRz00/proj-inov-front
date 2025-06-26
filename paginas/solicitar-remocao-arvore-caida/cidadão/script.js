const APIURL = "http://localhost:8080/" // William - mudar pro novo endpoint aqui

document.getElementById('maintenanceForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    const data = {
      descricao: document.getElementById('descricao').value,
      nomeRua: document.getElementById('rua').value,
      bairro: document.getElementById('bairro').value,
      dataCriada: new Date(),
      status: "ABERTA",
      solicitante: {
        id: 1,
        nome: "eu",
        senha: "123",
        cpf: "1234",
        email: 'email@hotmail.com',
        perfil: "CIDADAO"
      }
    };
  
    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar solicitação.');
      }
  
      document.getElementById('mensagem').textContent = 'Solicitação enviada com sucesso!';
      this.reset();
    } catch (error) {
      console.error(error);
      document.getElementById('mensagem').textContent = 'Falha ao enviar solicitação.';
    }
  });
  