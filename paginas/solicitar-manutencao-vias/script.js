const APIURL = "nao tem ainda"

document.getElementById('maintenanceForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado.');
      return;
    }
  
    const data = {
      tipo: document.getElementById('tipo').value,
      descricao: document.getElementById('descricao').value,
      rua: document.getElementById('rua').value,
      numero: document.getElementById('numero').value,
      bairro: document.getElementById('bairro').value,
      complemento: document.getElementById('complemento').value
    };
  
    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
  