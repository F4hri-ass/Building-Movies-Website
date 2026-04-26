document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.getElementById("reg-error-message");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("regUsername").value;
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            errorMessage.textContent = "Password tidak cocok!";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Cek apakah username sudah terdaftar
        if (users.some(user => user.username === username)) {
            errorMessage.textContent = "Username sudah digunakan!";
            return;
        }

        // Simpan akun baru ke localStorage
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "login.html";
    });
});
