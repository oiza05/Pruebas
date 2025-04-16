export function setupLogout() {
  const logoutLink = document.getElementById("cerrarSesion");

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevenir la acción predeterminada del enlace

      // Eliminar la variable de autenticación del localStorage
      localStorage.removeItem("isLoggedIn");

      // Mostrar el modal de login (suponiendo que el id es "loginModal")
      const loginModal = document.getElementById("loginModal");
      if (loginModal) {
        loginModal.style.display = "flex";
      }
    });
  }
}
