// Validação do Bootstrap
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

// Máscara de CPF e validação de números apenas
const cpfInput = document.getElementById('cpf');

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

// Envio de dados ao backend
document.querySelector('.needs-validation').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  // Coleta dos valores
  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // remove pontuação
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const perfil = document.getElementById('tipoUsuario').value.toUpperCase(); // "CIDADAO" ou "ADMINISTRADOR"

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      alert('Cadastro realizado com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } else {
      const erro = await resposta.json();
      console.error(erro);
      alert('Erro ao cadastrar: ' + (erro.message || resposta.status));
    }
  } catch (err) {
    console.error(err);
    alert('Erro na comunicação com o servidor.');
  }
});
