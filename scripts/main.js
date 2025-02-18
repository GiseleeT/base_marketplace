document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Simulação de usuário cadastrado (substitua por autenticação real)
    const user = {
        email: "teste@marketplace.com",
        password: "123456"
    };

    if (email === user.email && password === user.password) {
        loginMessage.textContent = "Login bem-sucedido!";
        loginMessage.style.color = "green";

        // Redirecionamento após login
        setTimeout(() => {
            window.location.href = "index.html"; // Substituir pela página principal do marketplace
        }, 2000);
    } else {
        loginMessage.textContent = "E-mail ou senha incorretos.";
        loginMessage.style.color = "red";
    }
});
