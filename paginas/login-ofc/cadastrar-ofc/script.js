(() => {
  'use strict';

  const form = document.querySelector('form');

  const cpfInput = document.getElementById('cpf');

  // Máscara de CPF
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i === 3 || i === 6) {
          formatted += '.';
        } else if (i === 9) {
          formatted += '-';
        }
        formatted += value[i];
      }

      e.target.value = formatted;
    });
  }

  // Submissão do formulário
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const nome = document.getElementById('fullName')?.value.trim();
    const cpf = document.getElementById('cpf')?.value.replace(/\D/g, '');
    const email = document.getElementById('email')?.value.trim(); // <- NÃO forçando para minúsculo
    const senha = document.getElementById('password')?.value;
    const perfil = document.getElementById('tipoUsuario')?.value.toUpperCase(); // <- ainda necessário

    const dados = {
      nome,
      cpf,
      email,
      senha,
      perfil
    };

    try {
      const resposta = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (resposta.ok) {
        alert('Cadastro realizado com sucesso!');
        form.reset();
        form.classList.remove('was-validated');
      } else {
        const erro = await resposta.json();
        alert('Erro ao cadastrar: ' + (erro.message || resposta.status));
      }
    } catch (err) {
      alert('Erro na comunicação com o servidor.');
    }
  });
})();
