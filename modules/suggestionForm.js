// === Formulario de sugerencias ===
export function setupSuggestionForm() {
  const suggestionForm = document.getElementById("suggestionForm");
  const successModal = document.getElementById("successModal");
  const closeModal = document.querySelector(".close-modal");

  if (suggestionForm) {
    suggestionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Aquí iría la lógica para enviar los datos al servidor
      // Por ahora, simplemente mostramos el modal de éxito
      if (successModal) {
        successModal.style.display = "flex";
      }
      // Enfocar contenido del modal para accesibilidad
      const content = successModal.querySelector(".modal-content");
      if (content) content.focus();
    });
  }

  // Cerrar modal
  if (closeModal && successModal) {
    closeModal.addEventListener("click", function () {
      successModal.style.display = "none";
    });

    // También cerrar al hacer clic fuera del modal
    window.addEventListener("click", function (e) {
      if (e.target === successModal) {
        successModal.style.display = "none";
      }
    });
  }
}
