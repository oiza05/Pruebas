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
  // Añadir después del código existente en app.js
  document.addEventListener("DOMContentLoaded", function () {
    // ... código existente ...

    // === Implementación del Modo Oscuro ===
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

    // Verificar si hay preferencia guardada
    if (localStorage.getItem("theme") === "dark") {
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
