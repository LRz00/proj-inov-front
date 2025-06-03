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

  function formatCEP(input) {
    // Remove tudo que não for número
    let value = input.value.replace(/\D/g, '');

    // Aplica o formato 00000-000
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }

    // Limita o tamanho para 9 caracteres (5 + 1 + 3)
    input.value = value.slice(0, 9);
  }