// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // === Menú desplegable ===
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (menuToggle && dropdownMenu) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      dropdownMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (e) {
      if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        menuToggle.classList.remove("active");
        dropdownMenu.classList.remove("active");
      }
    });
  }

  // === Contador de caracteres para formularios ===
  const textAreas = document.querySelectorAll(".text-area, .help-text-area");

  textAreas.forEach((textarea) => {
    const counterId = textarea.getAttribute("aria-describedby");
    const counter = document.getElementById(counterId);
    const maxLength = textarea.getAttribute("maxlength") || 300;

    if (counter) {
      // Añadir atributo aria-live para accesibilidad
      counter.setAttribute("aria-live", "polite");
      // Actualizar contador al cargar
      updateCounter(textarea, counter, maxLength);

      // Actualizar contador al escribir
      textarea.addEventListener("input", function () {
        updateCounter(textarea, counter, maxLength);
      });
    }
  });

  function updateCounter(textarea, counter, maxLength) {
    const currentLength = textarea.value.length;
    counter.textContent = `${currentLength}/${maxLength} caracteres`;

    // Cambiar color cuando se acerca al límite
    if (currentLength > maxLength * 0.9) {
      counter.style.color = "#ff3333";
    } else {
      counter.style.color = "#888";
    }
  }

  // === Formulario de sugerencias ===
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

  // === Sistema de votación ===
  // Reemplazar la sección de sistema de votación en app.js con esto:
  // === Sistema de votación mejorado ===
  const voteButtons = document.querySelectorAll(".vote-button");

  // Cargar votos desde localStorage
  function loadVotes() {
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );

    document.querySelectorAll(".proposal-item").forEach((item) => {
      const proposalId = item.getAttribute("data-proposal-id");
      const scoreElement = item.querySelector(".proposal-score");

      if (savedVotes[proposalId]) {
        scoreElement.textContent = savedVotes[proposalId];
        scoreElement.setAttribute("data-votes", savedVotes[proposalId]);

        // Marcar como votado si el usuario ya votó
        if (
          JSON.parse(
            localStorage.getItem("unigara_user_votes") || "[]"
          ).includes(proposalId)
        ) {
          item.querySelector(".vote-button").classList.add("already-voted");
        }
      }
    });
  }

  // Guardar los votos
  function saveVote(proposalId, votes) {
    // Guardar total de votos
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );
    savedVotes[proposalId] = votes;
    localStorage.setItem("unigara_votes", JSON.stringify(savedVotes));

    // Guardar que el usuario ha votado esta propuesta
    const userVotes = JSON.parse(
      localStorage.getItem("unigara_user_votes") || "[]"
    );
    if (!userVotes.includes(proposalId)) {
      userVotes.push(proposalId);
      localStorage.setItem("unigara_user_votes", JSON.stringify(userVotes));
    }
  }

  loadVotes();

  voteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const proposalItem = this.closest(".proposal-item");
      const proposalId = proposalItem.getAttribute("data-proposal-id");
      const scoreElement = proposalItem.querySelector(".proposal-score");

      // Verificar si el usuario ya ha votado esta propuesta
      const userVotes = JSON.parse(
        localStorage.getItem("unigara_user_votes") || "[]"
      );
      if (userVotes.includes(proposalId)) {
        // Mostrar feedback de que ya ha votado
        button.classList.add("already-voted");

        // Mostrar una alerta suave
        const alertDiv = document.createElement("div");
        alertDiv.className = "vote-alert";
        alertDiv.textContent = "¡Ya has votado por esta propuesta!";
        // Agregar role="alert" para accesibilidad
        alertDiv.setAttribute("role", "alert");
        proposalItem.appendChild(alertDiv);

        setTimeout(() => {
          alertDiv.remove();
        }, 2000);

        return;
      }

      if (scoreElement) {
        let currentVotes = parseInt(scoreElement.getAttribute("data-votes"));
        currentVotes++;

        // Actualizar contador visual y atributo
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        // Guardar voto
        saveVote(proposalId, currentVotes);

        // Efecto visual de confirmación
        button.classList.add("voted");
        button.classList.add("already-voted");
        setTimeout(() => {
          button.classList.remove("voted");
        }, 300);
      }
    });
  });

  // Estilos para botón ya votado
  const style = document.createElement("style");
  style.textContent = `
  .vote-button.already-voted {
    background: #ccc;
    cursor: not-allowed;
  }
  .vote-alert {
    position: absolute;
    background: rgba(255, 0, 0, 0.1);
    color: #ff3333;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    right: 10px;
    top: -20px;
    animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
  document.head.appendChild(style);

  // --- Implementación del Modo Oscuro ---
  // (Agrega esta sección al final del bloque DOMContentLoaded)
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
});

// Añadir al final de app.js (Vista Previa)
document.addEventListener("DOMContentLoaded", function () {
  const previewButton = document.querySelector(".preview-btn");

  if (previewButton) {
    previewButton.addEventListener("click", function () {
      // Obtener datos del formulario
      const proposalText = document.getElementById("proposal").value;
      const helpText = document.getElementById("help-text").value;

      // Obtener categoría seleccionada
      let selectedCategory = "";
      document.querySelectorAll('input[name="category"]').forEach((radio) => {
        if (radio.checked) {
          selectedCategory = radio.value;
        }
      });

      // Verificar campos obligatorios
      if (!proposalText || !helpText || !selectedCategory) {
        alert("Por favor completa todos los campos antes de previsualizar");
        return;
      }

      // Crear modal de vista previa
      const previewModal = document.createElement("div");
      previewModal.className = "modal";
      previewModal.style.display = "flex";

      // Mapeo de categorías a textos en español
      const categoryMap = {
        facilities: "Instalaciones",
        academic: "Académico",
        services: "Servicios",
        other: "Otro",
      };

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

      // Añadir a la página y enfocar el modal para accesibilidad
      document.body.appendChild(previewModal);
      previewModal.querySelector(".modal-content").focus();

      // Cerrar modal
      const closeBtn = previewModal.querySelector(".close-modal");
      const editBtn = previewModal.querySelector(".edit-btn");

      closeBtn.addEventListener("click", function () {
        previewModal.remove();
      });

      editBtn.addEventListener("click", function () {
        previewModal.remove();
      });
    });
  }
});

// Añadir estos estilos CSS para vista previa
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
document.head.appendChild(previewStyles);

// --- Detalles de Propuesta y Comentarios ---
document.addEventListener("DOMContentLoaded", function () {
  // Datos detallados de propuestas (simulados)
  const proposalDetails = {
    1: {
      title: "Sillas en cafetería",
      description: "Renovación de mobiliario en cafetería central",
      fullDescription:
        "El mobiliario actual de la cafetería central lleva más de 10 años sin renovarse. Las sillas tienen piezas rotas y algunas mesas están inestables. Se propone la compra de nuevo mobiliario ergonómico y moderno que mejore la comodidad durante las horas de descanso.",
      category: "Instalaciones",
      author: "Carmen Rodríguez",
      date: "10/04/2025",
      votes: 103,
      status: "Aprobado",
      comments: [
        {
          author: "Miguel Sánchez",
          date: "11/04/2025",
          text: "¡Totalmente de acuerdo! Las sillas actuales son incómodas.",
        },
        {
          author: "Laura Gómez",
          date: "12/04/2025",
          text: "Especialmente importante para quienes pasamos mucho tiempo estudiando allí.",
        },
      ],
    },
    2: {
      title: "Renovación de cámaras",
      description: "Sistema de vigilancia actualizado para mayor seguridad",
      fullDescription:
        "El sistema actual de cámaras de seguridad tiene puntos ciegos y la calidad de imagen no es óptima. Proponemos actualizar a un sistema digital completo con mejor cobertura en todas las áreas críticas del campus.",
      category: "Servicios",
      author: "Jorge Martínez",
      date: "05/04/2025",
      votes: 75,
      status: "En revisión",
      comments: [
        {
          author: "Ana López",
          date: "06/04/2025",
          text: "Hay zonas donde no hay cobertura, especialmente en los aparcamientos.",
        },
      ],
    },
    3: {
      title: "Ventilación en cancha",
      description: "Mejorar sistema de aire en pabellón deportivo",
      fullDescription:
        "Durante actividades intensas, la ventilación actual es insuficiente. Proponemos instalar ventiladores adicionales y mejorar el sistema de circulación de aire para evitar la condensación y mejorar la experiencia deportiva.",
      category: "Instalaciones",
      author: "Pablo Fernández",
      date: "12/04/2025",
      votes: 69,
      status: "En proceso",
      comments: [],
    },
    4: {
      title: "WiFi biblioteca",
      description: "Mejorar la cobertura en salas de estudio",
      fullDescription:
        "La señal WiFi es débil en ciertas áreas de la biblioteca, especialmente en las salas de estudio del tercer piso. Se propone instalar repetidores adicionales para asegurar una cobertura completa.",
      category: "Académico",
      author: "Lucía Herrera",
      date: "01/04/2025",
      votes: 58,
      status: "Pendiente",
      comments: [
        {
          author: "David Torres",
          date: "02/04/2025",
          text: "Totalmente necesario, es frustrante perder la conexión en medio de trabajos online.",
        },
        {
          author: "Sara García",
          date: "03/04/2025",
          text: "La señal es especialmente débil en las mesas del fondo.",
        },
        {
          author: "Mario Ruiz",
          date: "05/04/2025",
          text: "¿Se ha considerado cambiar de proveedor de servicios?",
        },
      ],
    },
  };

  // Crear modal de detalles
  const detailModal = document.createElement("div");
  detailModal.className = "proposal-detail";
  detailModal.id = "proposalDetailModal";
  document.body.appendChild(detailModal);

  // Añadir listeners a las propuestas
  document.querySelectorAll(".proposal-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      // No mostrar modal si se hizo clic en el botón de votar
      if (e.target.closest(".vote-button")) {
        return;
      }

      const proposalId = this.getAttribute("data-proposal-id");
      const details = proposalDetails[proposalId];

      if (details) {
        // Construir contenido del modal; se ha añadido tabindex="0" para que reciba foco
        detailModal.innerHTML = `
            <div class="proposal-detail-content" tabindex="0">
              <span class="close-detail">&times;</span>
              
              <div class="detail-header">
                <h2 class="detail-title">${details.title}</h2>
                <div class="detail-meta">
                  <div class="detail-category">${details.category}</div>
                  <div class="detail-date">${details.date}</div>
                  <div class="detail-author">${details.author}</div>
                </div>
              </div>
              
              <div class="detail-stats">
                <div class="detail-votes">${details.votes} votos</div>
                <div class="detail-comments">${
                  details.comments.length
                } comentarios</div>
                <div class="detail-status">Estado: ${details.status}</div>
              </div>
              
              <div class="detail-body">
                <p class="detail-description">${details.fullDescription}</p>
              </div>
              
              <div class="comments-section">
                <h3 class="detail-section-title">Comentarios (${
                  details.comments.length
                })</h3>
                
                <div class="comments-list">
                  ${details.comments
                    .map(
                      (comment) => `
                    <div class="comment-item">
                      <div class="comment-header">
                        <div class="comment-author">${comment.author}</div>
                        <div class="comment-date">${comment.date}</div>
                      </div>
                      <p class="comment-text">${comment.text}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                
                <div class="comment-form">
                  <textarea class="comment-input" placeholder="Añade un comentario..."></textarea>
                  <button class="comment-submit">Comentar</button>
                </div>
              </div>
            </div>
          `;

        // Mostrar modal y enfocar el contenido para accesibilidad
        detailModal.classList.add("active");
        detailModal.querySelector(".proposal-detail-content").focus();

        // Cerrar modal con X: asignar atributos de accesibilidad al botón
        const closeButton = detailModal.querySelector(".close-detail");
        closeButton.setAttribute("tabindex", "0");
        closeButton.setAttribute("aria-label", "Cerrar detalles");
        closeButton.addEventListener("click", function () {
          detailModal.classList.remove("active");
        });

        // Cerrar modal haciendo clic fuera
        detailModal.addEventListener("click", function (e) {
          if (e.target === detailModal) {
            detailModal.classList.remove("active");
          }
        });

        // Funcionalidad para añadir comentarios
        const commentForm = detailModal.querySelector(".comment-form");
        const commentInput = detailModal.querySelector(".comment-input");

        commentForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const commentText = commentInput.value.trim();
          if (commentText) {
            // Crear nuevo comentario
            const newComment = document.createElement("div");
            newComment.className = "comment-item";
            newComment.innerHTML = `
                <div class="comment-header">
                  <div class="comment-author">XYZ</div>
                  <div class="comment-date">${new Date().toLocaleDateString()}</div>
                </div>
                <p class="comment-text">${commentText}</p>
              `;

            // Añadir al principio de la lista
            const commentsList = detailModal.querySelector(".comments-list");
            commentsList.insertBefore(newComment, commentsList.firstChild);

            // Actualizar contador de comentarios
            const commentsTitle = detailModal.querySelector(
              ".detail-section-title"
            );
            const count = detailModal.querySelectorAll(".comment-item").length;
            commentsTitle.textContent = `Comentarios (${count})`;

            // Limpiar input
            commentInput.value = "";
          }
        });

        // Configurar el botón de comentar
        const commentButton = detailModal.querySelector(".comment-submit");
        commentButton.addEventListener("click", function () {
          commentForm.dispatchEvent(new Event("submit"));
        });
      }
    });
  });
});

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
