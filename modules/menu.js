// === Menú desplegable ===
// Esta función se encarga de controlar el comportamiento de un menú desplegable
export function setupMenuToggle() {
  // Obtener el botón del menú (el que abre/cierra el desplegable)
  const menuToggle = document.getElementById("menuToggle");

  // Obtener el menú desplegable en sí
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Verificamos que ambos elementos existan antes de continuar
  if (menuToggle && dropdownMenu) {
    // Cuando el usuario hace clic en el botón del menú
    menuToggle.addEventListener("click", function () {
      // Alternar la clase "active" en el botón y el menú
      // Si ya la tienen, se quita; si no, se agrega
      menuToggle.classList.toggle("active");
      dropdownMenu.classList.toggle("active");
    });

    // Escuchamos cualquier clic en el documento
    document.addEventListener("click", function (e) {
      // Si el clic fue fuera del botón y fuera del menú
      if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        // Quitamos la clase "active" de ambos elementos para cerrar el menú
        menuToggle.classList.remove("active");
        dropdownMenu.classList.remove("active");
      }
    });
  } else {
    // Si no se encuentran los elementos necesarios, podríamos mostrar un mensaje de advertencia
    // console.log("⚠️ No se encontraron los elementos del menú"); //prueba
  }
}
