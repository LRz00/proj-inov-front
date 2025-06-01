function formatarCampo(campo) {
    const mapa = {
      nome: 'Nome Completo',
      cpf: 'CPF',
      nascimento: 'Data de Nascimento',
      sus: 'Número SUS',
      nis: 'Número NIS',
      telefone: 'Telefone',
      estadoCivil: 'Estado Civil',
      mae: 'Nome da Mãe',
      nacionalidade: 'Nacionalidade',
      idade: 'Idade',
      altura: 'Altura',
      alergia: 'Alergia',
      genero: 'Gênero',
      cronicas: 'Doenças Crônicas',
      medicamentos: 'Medicamentos'
    };
    return mapa[campo] || campo;
  }

  function carregarPerfil() {
    const dadosTela1 = JSON.parse(localStorage.getItem('dadosTela1')) || {};
    const dadosTela2 = JSON.parse(localStorage.getItem('dadosTela2')) || {};

    // Coloca o nome no topo
    document.getElementById('nomePerfil').textContent = dadosTela1['nome'] || 'Usuário';

    const divPessoais = document.getElementById('dadosPessoais');
    const divSaude = document.getElementById('dadosSaude');

    for (let chave in dadosTela1) {
      const campo = document.createElement('div');
      campo.classList.add('campo');
      campo.innerHTML = `<strong>${formatarCampo(chave)}:</strong> ${dadosTela1[chave]}`;
      divPessoais.appendChild(campo);
    }

    for (let chave in dadosTela2) {
      const campo = document.createElement('div');
      campo.classList.add('campo');
      campo.innerHTML = `<strong>${formatarCampo(chave)}:</strong> ${dadosTela2[chave]}`;
      divSaude.appendChild(campo);
    }
  }

  function editarCadastro() {
    if (confirm('Tem certeza que deseja editar os dados?')) {
      localStorage.clear();
      window.location.href = 'tela1.html';
    }
  }

  function voltarInicio() {
      window.location.href = 'inicio.html';
    }

  carregarPerfil();