// --- Vista Previa de Propuestas---
// Exporta esta función para poder usarla desde otros archivos (como main.js)
export function setupPreview() {
  // Selecciona el botón de vista previa
  const previewButton = document.querySelector(".preview-btn");
  console.log("Botón de vista previa encontrado:", previewButton);

  // Si el botón existe...
  if (previewButton) {
    // Escucha el clic en el botón
    previewButton.addEventListener("click", function () {
      // Obtiene el texto del campo de propuesta
      const proposalText = document.getElementById("proposal").value;
      // Obtiene el texto del campo de ayuda
      const helpText = document.getElementById("help-text").value;
      console.log("Texto de propuesta:", proposalText);
      console.log("Texto de ayuda:", helpText);

      // Detecta cuál categoría ha sido seleccionada
      let selectedCategory = "";
      document.querySelectorAll('input[name="category"]').forEach((radio) => {
        if (radio.checked) {
          selectedCategory = radio.value;
        }
      });
      console.log("Categoría seleccionada:", selectedCategory);

      // Si falta algún campo, muestra una alerta y detiene la función
      if (!proposalText || !helpText || !selectedCategory) {
        alert("Por favor completa todos los campos antes de previsualizar");
        return;
      }

      // Crea un nuevo div para el modal
      const previewModal = document.createElement("div");
      previewModal.className = "modal";
      previewModal.style.display = "flex"; // Muestra el modal

      // Traduce los valores de categoría a texto legible en español
      const categoryMap = {
        facilities: "Instalaciones",
        academic: "Académico",
        services: "Servicios",
        other: "Otro",
      };

      // Define el contenido HTML del modal con los datos del formulario
      previewModal.innerHTML = `
              <div class="modal-content" tabindex="0" role="dialog" aria-labelledby="preview-heading">
                <span class="close-modal">&times;</span>
                <h3 id="preview-heading">Vista Previa de tu Propuesta</h3>
                
                <div class="proposal-preview">
                  <div class="preview-header">
                    <h4>${proposalText}</h4>
                    <div class="preview-category">${
                      categoryMap[selectedCategory]
                    }</div>
                  </div>
                  
                  <div class="preview-body">
                    <p>${helpText}</p>
                  </div>
                  
                  <div class="preview-footer">
                    <div class="preview-author">
                      <div class="preview-avatar"></div>
                      <div class="preview-name">XYZ</div>
                    </div>
                    <div class="preview-date">Fecha: ${new Date().toLocaleDateString()}</div>
                  </div>
                </div>
                
                <button class="modal-btn edit-btn">Editar</button>
              </div>
            `;

      // Añade el modal al documento
      document.body.appendChild(previewModal);
      // Pone el foco en el modal (accesibilidad)
      previewModal.querySelector(".modal-content").focus();

      // Lógica para cerrar el modal
      const closeBtn = previewModal.querySelector(".close-modal");
      const editBtn = previewModal.querySelector(".edit-btn");

      // Cierra el modal al hacer clic en la "X"
      closeBtn.addEventListener("click", function () {
        previewModal.remove();
      });

      // Cierra el modal al hacer clic en "Editar"
      editBtn.addEventListener("click", function () {
        previewModal.remove();
      });
    });
  }
}

// Crea una etiqueta <style> para añadir estilos al modal desde JS
const previewStyles = document.createElement("style");
previewStyles.textContent = `
        .proposal-preview {
          background-color: var(--light-bg);
          border: 2px solid var(--accent-color);
          border-radius: var(--border-radius-md);
          padding: 15px;
          margin: 20px 0;
        }
  
        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
  
        .preview-header h4 {
          color: var(--primary-color);
          font-weight: bold;
          margin: 0;
        }
  
        .preview-category {
          background-color: var(--accent-color);
          color: var(--primary-color);
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: bold;
        }
  
        .preview-body {
          margin-bottom: 15px;
        }
  
        .preview-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--light-text);
        }
  
        .preview-author {
          display: flex;
          align-items: center;
        }
  
        .preview-avatar {
          width: 25px;
          height: 25px;
          background: var(--accent-gradient);
          border-radius: 50%;
          margin-right: 8px;
        }
  
        .modal-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          margin-top: 15px;
          transition: background-color var(--transition-fast);
        }
  
        .modal-btn:hover {
          background-color: #4400ee;
        }
  
        .edit-btn {
          background-color: var(--light-bg);
          color: var(--dark-text);
        }
      `;
// Inserta los estilos en el head
document.head.appendChild(previewStyles);
