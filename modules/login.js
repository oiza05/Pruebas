export function setupLogin() {
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const closeLogin = document.getElementById("closeLogin");

  const isLogged = localStorage.getItem("isLoggedIn");
  if (!isLogged) {
    loginModal.style.display = "flex";
  }

  if (closeLogin) {
    closeLogin.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = loginForm.querySelector('input[name="name"]');
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (name && email && password) {
      const userData = {
        name: name,
        email: email,
        photo: "https://via.placeholder.com/60",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      loginModal.style.display = "none";
      window.location.href = "index.html"; // Redirección opcional
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });
}
