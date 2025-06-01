function validarTela1() {
    const campos = ['nome', 'cpf', 'nascimento', 'sus', 'nis', 'telefone', 'estadoCivil', 'mae', 'nacionalidade'];
    let vazio = campos.some(id => document.getElementById(id).value.trim() === '');
    if (vazio) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    let dadosTela1 = {};
    campos.forEach(id => dadosTela1[id] = document.getElementById(id).value.trim());
    
    localStorage.setItem('dadosTela1', JSON.stringify(dadosTela1));
    window.location.href = 'tela2.html';
  }

  // Máscara CPF
  document.getElementById('cpf').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  });

  // Máscara NIS
  document.getElementById('nis').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{5})(\d)/, '$1.$2')
      .replace(/(\d{2})(\d{1})$/, '$1-$2');
  });

  // Máscara SUS
  document.getElementById('sus').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1 $2');
  });

  // Máscara Telefone
  document.getElementById('telefone').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substr(0, 15);
  });

  function validarTela2() {
    const campos = ['idade', 'altura', 'alergia', 'genero', 'cronicas', 'medicamentos'];
    let vazio = campos.some(id => document.getElementById(id).value.trim() === '');
    if (vazio) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    let dadosTela2 = {};
    campos.forEach(id => dadosTela2[id] = document.getElementById(id).value.trim());
    
    localStorage.setItem('dadosTela2', JSON.stringify(dadosTela2));
    window.location.href = '/paginas/exibir-cadastro-saude/index.html';
  }

