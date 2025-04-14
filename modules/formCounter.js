// === Contador de caracteres para formularios ===
export function setupCharacterCounter() {
  // Selecciona todos los <textarea> que tengan clase .text-area o .help-text-area
  const textAreas = document.querySelectorAll(".text-area, .help-text-area");

  // Recorre cada uno de los campos de texto
  textAreas.forEach((textarea) => {
    // Obtiene el ID del elemento que mostrará el contador, desde el atributo aria-describedby
    const counterId = textarea.getAttribute("aria-describedby");
    const counter = document.getElementById(counterId);

    // Establece el número máximo de caracteres según la clase del campo
    let maxLength = textarea.getAttribute("maxlength"); // Valor por defecto desde el HTML
    if (textarea.classList.contains("text-area")) {
      maxLength = 100; // Limita el primer campo (propuesta) a 100 caracteres
    } else if (textarea.classList.contains("help-text-area")) {
      maxLength = 300; // El segundo campo (cómo ayuda) se mantiene en 300
    }

    // Solo continúa si el contador existe en el DOM
    if (counter) {
      // Atributo para accesibilidad: permite que lectores de pantalla anuncien cambios
      counter.setAttribute("aria-live", "polite");

      // Inicializa el contador al cargar la página
      updateCounter(textarea, counter, maxLength);

      // Cada vez que el usuario escriba algo, actualiza el contador
      textarea.addEventListener("input", function () {
        updateCounter(textarea, counter, maxLength);
      });
    }
  });

  // Función que actualiza el texto del contador y su estilo
  function updateCounter(textarea, counter, maxLength) {
    const currentLength = textarea.value.length;

    // Muestra: "45/100 caracteres"
    counter.textContent = `${currentLength}/${maxLength} caracteres`;

    // Cambia el color si está cerca del límite (más del 90%)
    if (currentLength > maxLength * 0.9) {
      counter.style.color = "#ff3333"; // Rojo de advertencia
    } else {
      counter.style.color = "#888"; // Gris por defecto
    }
  }
}
