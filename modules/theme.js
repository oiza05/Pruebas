// --- Implementación del Modo Oscuro ---
// (Agrega esta sección al final del bloque DOMContentLoaded)

//ESTO POR AHORA NO HACE NADA
export function setupThemeSwitcher() {
  // Funcionalidad del switch
  const checkbox = document.getElementById("themeToggle");

  // Si no hay preferencia guardada, utilizar la preferencia del sistema
  if (!localStorage.getItem("theme")) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
      checkbox.checked = true;
    }
  } else if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });
}
