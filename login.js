document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("login-error-message");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Cek apakah username dan password sesuai
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", username);
            window.location.href = "index.html";
        } else {
            errorMessage.textContent = "Username atau password salah!";
        }
    });
});
