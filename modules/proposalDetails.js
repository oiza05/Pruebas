// Crear modal de detalles
import { setupProposalData } from "./proposalData.js";
export function setupProposalDetailModal() {
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
      const proposalDetails = setupProposalData();
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
}
