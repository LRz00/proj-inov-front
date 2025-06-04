document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = '/login.html';
  }
});
function validarTela1() {
    const campos = ['nome', 'cpf', 'rg', 'nascimento', 'sus', 'nis', 'telefone', 'estadoCivil', 'mae', 'cidade'];
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
// mascara rg
  document.getElementById('rg').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '')                     // Remove tudo que não for dígito
    .replace(/(\d{2})(\d)/, '$1.$2')                                     // Insere o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2')                                     // Insere o segundo ponto
    .replace(/(\d{3})(\d{1})$/, '$1-$2');                                // Insere o traço
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

  }

function salvarPacientes() {
  const dadosTela1 = JSON.parse(localStorage.getItem('dadosTela1'));
  const dadosTela2 = JSON.parse(localStorage.getItem('dadosTela2'));
  const token = localStorage.getItem('token');

  if (!dadosTela1 || !dadosTela2) {
    alert('Erro: Dados incompletos. Por favor, preencha as duas etapas do formulário.');
    return;
  }

  if (!token) {
    alert("Sessão expirada ou usuário não autenticado. Faça login novamente.");
    return;
  }

  const dadosCompletos = {
    nomeCompleto: dadosTela1.nome,
    cpf: dadosTela1.cpf,
    rg: dadosTela1.rg,
    genero: dadosTela2.genero,
    dataNascimento: dadosTela1.nascimento,
    telefone: dadosTela1.telefone,
    cidade: dadosTela1.cidade,
    estadoCivil: dadosTela1.estadoCivil,
    idade: parseInt(dadosTela2.idade),

    numeroSus: dadosTela1.sus,
    numeroNis: dadosTela1.nis,
    nomeDaMae: dadosTela1.mae,
    altura: parseFloat(dadosTela2.altura),
    alergias: dadosTela2.alergia,
    medicamentosUsados: dadosTela2.medicamentos,
    doencaCronicas: dadosTela2.cronicas
  };

  fetch('http://localhost:8080/paciente/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Cabeçalho com token JWT
    },
    body: JSON.stringify(dadosCompletos)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao enviar os dados.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados enviados com sucesso:', data);
    alert('Cadastro realizado com sucesso!');
    localStorage.removeItem('dadosTela1');
    localStorage.removeItem('dadosTela2');
    window.location.href = '/paginas/exibir-cadastro-saude/index.html';
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Falha ao enviar os dados. Tente novamente.');
  });
}