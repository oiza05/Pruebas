export function setupLogout() {
  const logoutLink = document.getElementById("cerrarSesion");

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevenir la acción predeterminada del enlace

      // Eliminar la variable de autenticación del localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");

      // Mostrar el modal de login (suponiendo que el id es "loginModal")
      // Recargar la página para reiniciar el estado visual
      window.location.reload();
    });
  }
}
