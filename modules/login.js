export function setupLogin() {
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const closeLogin = document.getElementById("closeLogin");

  // Verificar si el usuario ya está logueado según localStorage
  // const isLogged = localStorage.getItem("isLoggedIn");
  //if (!isLogged) {
  loginModal.style.display = "flex"; // Muestra el modal si no está logueado
  //}

  // Evento para cerrar el modal manualmente (opcional)
  if (closeLogin) {
    closeLogin.addEventListener("click", () => {
      // Opcionalmente, puedes quitar la posibilidad de cerrar el modal hasta que se loguee
      loginModal.style.display = "none";
    });
  }

  // Cuando el usuario envía el formulario de login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aquí puedes validar los datos del login.
    // Por simplicidad, se guarda el flag sin validaciones reales.
    localStorage.setItem("isLoggedIn", "true");

    // Ocultar el modal y redirigir o refrescar la página si es necesario
    loginModal.style.display = "none";
    // Opcionalmente, si quieres redirigir:
    window.location.href = "index.html";
  });

  // Cerrar el modal si se hace clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      // En este ejemplo, si se hace clic fuera, se cierra el modal.
      // Puedes comentar esta línea si quieres obligar a loguearse.
      loginModal.style.display = "none";
    }
  });
}
