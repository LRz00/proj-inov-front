
  document.addEventListener("DOMContentLoaded", async () => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "../login/index.html";
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    // Preenche os campos
    document.getElementById("nome").textContent = usuario.nome || "-";
    document.getElementById("email").textContent = usuario.email || "-";

    // Os demais campos abaixo são mockados
    document.getElementById("nascimento").textContent = "01/01/1997";
    document.getElementById("naturalidade").textContent = "São Paulo - SP";
    document.getElementById("telefone").textContent = "(11) 11111-1111";
  });
