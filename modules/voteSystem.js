// === Sistema de votación  ===
export function setupVotingSystem() {
  // Selecciona todos los botones de voto
  const voteButtons = document.querySelectorAll(".vote-button");

  // ================================
  // FUNCIÓN: Cargar votos guardados
  // ================================
  function loadVotes() {
    // Recupera los votos totales desde localStorage (si existen)
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );

    // Recorre cada propuesta para actualizar su contador y estado visual
    document.querySelectorAll(".proposal-item").forEach((item) => {
      const proposalId = item.getAttribute("data-proposal-id");
      const scoreElement = item.querySelector(".proposal-score");

      if (savedVotes[proposalId]) {
        // Actualiza el número de votos en el DOM
        scoreElement.textContent = savedVotes[proposalId];
        scoreElement.setAttribute("data-votes", savedVotes[proposalId]);

        // Verifica si el usuario ya ha votado esta propuesta
        const userVotes = JSON.parse(
          localStorage.getItem("unigara_user_votes") || "[]"
        );
        if (userVotes.includes(proposalId)) {
          item.querySelector(".vote-button").classList.add("already-voted");
        }
      }
    });
  }

  // ===========================================
  // FUNCIÓN: Guardar un nuevo voto en localStorage
  // ===========================================
  function saveVote(proposalId, votes) {
    // Guarda los votos totales
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );
    savedVotes[proposalId] = votes;
    localStorage.setItem("unigara_votes", JSON.stringify(savedVotes));

    // Marca que el usuario ha votado esta propuesta
    const userVotes = JSON.parse(
      localStorage.getItem("unigara_user_votes") || "[]"
    );
    if (!userVotes.includes(proposalId)) {
      userVotes.push(proposalId);
      localStorage.setItem("unigara_user_votes", JSON.stringify(userVotes));
    }
  }

  // Llama a la función para cargar los votos al iniciar
  loadVotes();

  // ==================================
  // EVENTOS: Clic en botones de votar
  // ==================================
  voteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const proposalItem = this.closest(".proposal-item");
      const proposalId = proposalItem.getAttribute("data-proposal-id");
      const scoreElement = proposalItem.querySelector(".proposal-score");

      // Verifica si el usuario ya votó
      const userVotes = JSON.parse(
        localStorage.getItem("unigara_user_votes") || "[]"
      );
      if (userVotes.includes(proposalId)) {
        // Si ya votó, muestra una alerta temporal y desactiva el botón
        button.classList.add("already-voted");

        const alertDiv = document.createElement("div");
        alertDiv.className = "vote-alert";
        alertDiv.textContent = "¡Ya has votado por esta propuesta!";
        alertDiv.setAttribute("role", "alert"); // Accesibilidad
        proposalItem.appendChild(alertDiv);

        // Elimina la alerta después de 2 segundos
        setTimeout(() => {
          alertDiv.remove();
        }, 2000);

        return; // Sale de la función para evitar contar de nuevo
      }

      // Si no ha votado, suma 1 al contador
      if (scoreElement) {
        let currentVotes = parseInt(scoreElement.getAttribute("data-votes"));
        currentVotes++;

        // Actualiza el contador visual y en el atributo
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        // Guarda el nuevo voto
        saveVote(proposalId, currentVotes);

        // Aplica clases visuales para efecto de "votado"
        button.classList.add("voted", "already-voted");
        setTimeout(() => {
          button.classList.remove("voted"); // Quita efecto de animación
        }, 300);
      }
    });
  });

  // =====================================
  // ESTILOS DINÁMICOS: Botón y alerta
  // =====================================
  // Modifica los estilos CSS para que la alerta sea más visible
  const style = document.createElement("style");
  style.textContent = `
  .vote-button.already-voted {
    background: #ccc;
    cursor: not-allowed;
  }

  .vote-alert {
    position: absolute;
    background: rgba(255, 0, 0, 0.2);  /* Aumentado el contraste */
    color: #ff0000;  /* Rojo más oscuro para mejor contraste */
    padding: 8px 12px;  /* Padding aumentado */
    border-radius: 5px;
    font-size: 14px;  /* Texto más grande */
    font-weight: bold;  /* Texto en negrita para destacar */
    right: 10px;
    top: 10px;  /* Posicionado dentro del elemento visible */
    z-index: 10;  /* Asegurar que esté por encima de otros elementos */
    border: 1px solid #ff6666;  /* Borde añadido */
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);  /* Sombra para destacar */
    animation: fadeIn 0.3s, fadeOut 0.5s 2.5s;  /* Animación más larga */
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
  // Inserta los estilos en el <head>
  document.head.appendChild(style);
}
