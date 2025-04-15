export function setupVotingSystem() {
  // Selecciona todos los botones de voto
  const voteButtons = document.querySelectorAll(".vote-button");

  // Función para mostrar mensajes de confirmación con una clase extra para estilos
  function showMessage(proposalItem, text, extraClass = "") {
    const messageDiv = document.createElement("div");
    messageDiv.className = "vote-message " + extraClass;
    messageDiv.textContent = text;
    proposalItem.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 2000);
  }

  // ================================
  // FUNCIÓN: Cargar votos guardados y actualizar botón
  // ================================
  function loadVotes() {
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );
    const userVotes = JSON.parse(
      localStorage.getItem("unigara_user_votes") || "[]"
    );

    document.querySelectorAll(".proposal-item").forEach((item) => {
      const proposalId = item.getAttribute("data-proposal-id");
      const scoreElement = item.querySelector(".proposal-score");
      const button = item.querySelector(".vote-button");
      const voteIcon = button.querySelector(".vote-icon");

      // Actualiza votos totales si existen
      if (savedVotes[proposalId] !== undefined) {
        scoreElement.textContent = savedVotes[proposalId];
        scoreElement.setAttribute("data-votes", savedVotes[proposalId]);
      }

      // Actualiza el botón según si ya votó el usuario:
      // Muestra "–" si ya votó (acción: quitar voto) o "+" si aún no ha votado (acción: votar)
      if (userVotes.includes(proposalId)) {
        button.classList.add("already-voted");
        voteIcon.textContent = "–";
      } else {
        button.classList.remove("already-voted");
        voteIcon.textContent = "+";
      }
    });
  }

  // ============================================
  // FUNCIÓN: Actualizar votos en localStorage
  // ============================================
  function saveVote(proposalId, votes) {
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );
    savedVotes[proposalId] = votes;
    localStorage.setItem("unigara_votes", JSON.stringify(savedVotes));
  }

  // Función: Marcar o quitar voto del usuario
  function updateUserVote(proposalId, add) {
    let userVotes = JSON.parse(
      localStorage.getItem("unigara_user_votes") || "[]"
    );
    if (add) {
      if (!userVotes.includes(proposalId)) {
        userVotes.push(proposalId);
      }
    } else {
      // Quitar el voto eliminando el id de la propuesta
      userVotes = userVotes.filter((id) => id !== proposalId);
    }
    localStorage.setItem("unigara_user_votes", JSON.stringify(userVotes));
  }

  // Carga inicial de votos y configuración de botones
  loadVotes();

  // ==================================
  // EVENTOS: Clic en botones de votar / quitar voto
  // ==================================
  voteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const proposalItem = this.closest(".proposal-item");
      const proposalId = proposalItem.getAttribute("data-proposal-id");
      const scoreElement = proposalItem.querySelector(".proposal-score");
      const voteIcon = this.querySelector(".vote-icon");
      let currentVotes = parseInt(scoreElement.getAttribute("data-votes"));

      // Verifica si el usuario ya votó
      const userVotes = JSON.parse(
        localStorage.getItem("unigara_user_votes") || "[]"
      );

      if (userVotes.includes(proposalId)) {
        // Acción: Quitar voto
        currentVotes = currentVotes > 0 ? currentVotes - 1 : 0;
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        saveVote(proposalId, currentVotes);
        updateUserVote(proposalId, false);

        // Actualiza el botón a "+" para poder votar de nuevo
        this.classList.remove("already-voted");
        voteIcon.textContent = "+";

        // Mostrar mensaje en rojo al quitar el voto
        showMessage(proposalItem, "¡Voto retirado!", "withdrawn-message");
      } else {
        // Acción: Votar
        currentVotes++;
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        saveVote(proposalId, currentVotes);
        updateUserVote(proposalId, true);

        // Actualiza el botón a "–" para permitir quitar voto posteriormente
        this.classList.add("already-voted");
        voteIcon.textContent = "–";

        // Mostrar mensaje en verde al votar
        showMessage(proposalItem, "¡Gracias por votar!");
      }
    });
  });

  // =====================================
  // ESTILOS DINÁMICOS: Botón y mensajes
  // =====================================
  const style = document.createElement("style");
  style.textContent = `
    .vote-button.already-voted {
      background: #ccc;
      cursor: pointer;
    }
    .vote-button {
      transition: background 0.3s ease;
    }
    .vote-message {
      position: absolute;
      padding: 8px 12px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
      right: 10px;
      top: 10px;
      z-index: 10;
      border: 1px solid;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      animation: fadeIn 0.3s, fadeOut 0.5s 1.7s;
    }
    /* Estilo por defecto (mensaje de voto) en verde */
    .vote-message:not(.withdrawn-message) {
      background-color: #e0ffe0;  /* Fondo verde claro */
      color: #006400;             /* Texto verde oscuro */
      border-color: #90ee90;
    }
    /* Estilo para mensaje de quitar voto en rojo */
    .vote-message.withdrawn-message {
      background-color: #ffe0e0;  /* Fondo rojo claro */
      color: #8b0000;             /* Texto rojo oscuro */
      border-color: #ff9999;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
