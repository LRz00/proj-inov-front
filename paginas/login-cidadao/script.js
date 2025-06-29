const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const formLogin = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem");

toggleSenha.addEventListener("click", () => {
    const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
    senhaInput.setAttribute("type", tipo);
    toggleSenha.textContent = tipo === "password" ? "👁️" : "🙈";
});

formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = senhaInput.value.trim();

    if (email === "" || senha === "") {
        mensagem.textContent = "Por favor, preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:8080/usuarios/email/${email}`);
        if (!resposta.ok) {
            mensagem.textContent = "Usuário não encontrado.";
            mensagem.style.color = "red";
            return;
        }

        const usuario = await resposta.json();

        if (usuario.senha !== senha) {
            mensagem.textContent = "Senha incorreta.";
            mensagem.style.color = "red";
            return;
        }

        mensagem.textContent = "Login efetuado com sucesso!";
        mensagem.style.color = "green";

        // Salvar no localStorage se quiser manter sessão
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Redirecionar com base no perfil
        if (usuario.perfil === "CIDADAO") {
            window.location.href = "../cidadao-main/index.html";
        } else if (usuario.perfil === "ADMINISTRADOR") {
            window.location.href = "../administrador-main/index.html";
        } else {
            mensagem.textContent = "Perfil de usuário inválido.";
            mensagem.style.color = "red";
        }

    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao conectar com o servidor.";
        mensagem.style.color = "red";
    }
});

