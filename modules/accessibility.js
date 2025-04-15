// Ejecutar cuando el DOM esté completamente cargado
export function setupAccessibility() {
  // --- Detalles de Propuesta y Comentarios ---
  document.addEventListener("DOMContentLoaded", function () {
    // --- Skip Link y mejora de navegación con teclado ---
    document.addEventListener("DOMContentLoaded", function () {
      // Mejorar el contraste de textos en modo oscuro
      const improveContrast = document.createElement("style");
      improveContrast.textContent = `
        [data-theme="dark"] .proposal-text {
          color: #a5a5ff; /* Mejor contraste para textos en fondo oscuro */
        }
        
        [data-theme="dark"] .proposal-description {
          color: #e0e0e0; /* Mejor contraste para descripciones */
        }
        
        /* Focus visible para elementos interactivos */
        a:focus, button:focus, input:focus, textarea:focus, select:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
        
        /* Skip link para navegación por teclado */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: var(--primary-color);
          color: white;
          padding: 8px;
          z-index: 1000;
          transition: top 0.3s ease;
        }
        
        .skip-link:focus {
          top: 0;
        }
      `;
      document.head.appendChild(improveContrast);

      // Añadir skip link
      const skipLink = document.createElement("a");
      skipLink.className = "skip-link";
      skipLink.href = "#content"; // Asegúrate de tener <main id="content">...</main> en tu HTML
      skipLink.textContent = "Saltar al contenido principal";
      document.body.insertBefore(skipLink, document.body.firstChild);

      // Añadir atributos ARIA a elementos interactivos (propuestas)
      document.querySelectorAll(".proposal-item").forEach((item) => {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute(
          "aria-label",
          `Propuesta: ${item.querySelector(".proposal-text").textContent}`
        );

        // Permitir navegación con teclado
        item.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.click();
          }
        });
      });

      // Mejorar botón de voto para teclado
      document.querySelectorAll(".vote-button").forEach((button) => {
        button.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            button.click();
          }
        });
      });
    });
  });
}
