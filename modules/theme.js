// --- Implementación del Modo Oscuro ---
// (Agrega esta sección al final del bloque DOMContentLoaded)

//ESTO POR AHORA NO HACE NADA
export function setupThemeSwitcher() {
  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.createElement("div");
    themeToggle.className = "theme-switch-wrapper";
    themeToggle.innerHTML = `
      <label class="theme-switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider"></div>
      </label>
    `;

    // Insertar antes del menú toggle en el header
    const header = document.querySelector(".header");
    const logoIcons = document.querySelector(".logo-icons");
    header.insertBefore(themeToggle, logoIcons);

    // Funcionalidad del switch
    const checkbox = document.getElementById("checkbox");

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
  });
}
