export function setupLogin() {
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const closeLogin = document.getElementById("closeLogin");

  if (closeLogin) {
    closeLogin.addEventListener("click", () => {
      loginModal.classList.remove("show"); // ✅ Solo cerrar
    });
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');

    const email = emailInput?.value || "";
    const password = passwordInput?.value || "";

    if (email && password) {
      const userData = {
        name: email.split("@")[0], // usa la parte antes del @ como nombre
        email: email,
        photo: "https://via.placeholder.com/60",
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("showWelcome", "true");

      // Espera un momento para asegurar que localStorage esté listo
      setTimeout(() => {
        window.location.replace("index.html");
      }, 100);
    }
  });

  // Cerrar si clic fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove("show");
    }
  });

  const isLogged = localStorage.getItem("isLoggedIn");
  if (!isLogged && loginModal) {
    loginModal.classList.add("show"); // ✅ mostrar
  } else {
    loginModal.classList.remove("show"); // ✅ ocultar si ya está logueado
  }
}
