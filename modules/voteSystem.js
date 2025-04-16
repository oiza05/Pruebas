export function setupVotingSystem() {
  const voteButtons = document.querySelectorAll(".vote-button");

  function showMessage(proposalItem, text, extraClass = "") {
    const messageDiv = document.createElement("div");
    messageDiv.className = "vote-message " + extraClass;
    messageDiv.textContent = text;
    proposalItem.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 2000);
  }

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

      if (savedVotes[proposalId] !== undefined) {
        scoreElement.textContent = savedVotes[proposalId];
        scoreElement.setAttribute("data-votes", savedVotes[proposalId]);
      }

      if (userVotes.includes(proposalId)) {
        button.classList.add("already-voted");
        voteIcon.textContent = "–";
      } else {
        button.classList.remove("already-voted");
        voteIcon.textContent = "+";
      }
    });

    updateProgressBars();
  }

  function updateProgressBars() {
    const proposals = Array.from(document.querySelectorAll(".proposal-item"));
    const votesArray = proposals.map((item) =>
      parseInt(item.querySelector(".proposal-score").getAttribute("data-votes"))
    );
    const maxVotes = Math.max(...votesArray, 1);

    proposals.forEach((item) => {
      const votes = parseInt(
        item.querySelector(".proposal-score").getAttribute("data-votes")
      );
      const percent = Math.round((votes / maxVotes) * 100);

      const progressBar = item.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }

      const progressContainer = item.querySelector(".progress-container");
      if (progressContainer) {
        progressContainer.setAttribute("title", `${percent}% completado`);
      }
    });
  }

  function saveVote(proposalId, votes) {
    const savedVotes = JSON.parse(
      localStorage.getItem("unigara_votes") || "{}"
    );
    savedVotes[proposalId] = votes;
    localStorage.setItem("unigara_votes", JSON.stringify(savedVotes));
  }

  function updateUserVote(proposalId, add) {
    let userVotes = JSON.parse(
      localStorage.getItem("unigara_user_votes") || "[]"
    );
    if (add) {
      if (!userVotes.includes(proposalId)) {
        userVotes.push(proposalId);
      }
    } else {
      userVotes = userVotes.filter((id) => id !== proposalId);
    }
    localStorage.setItem("unigara_user_votes", JSON.stringify(userVotes));
  }

  loadVotes();

  voteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const proposalItem = this.closest(".proposal-item");
      const proposalId = proposalItem.getAttribute("data-proposal-id");
      const scoreElement = proposalItem.querySelector(".proposal-score");
      const voteIcon = this.querySelector(".vote-icon");
      let currentVotes = parseInt(scoreElement.getAttribute("data-votes"));

      const userVotes = JSON.parse(
        localStorage.getItem("unigara_user_votes") || "[]"
      );

      if (userVotes.includes(proposalId)) {
        currentVotes = currentVotes > 0 ? currentVotes - 1 : 0;
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        saveVote(proposalId, currentVotes);
        updateUserVote(proposalId, false);

        this.classList.remove("already-voted");
        voteIcon.textContent = "+";

        showMessage(proposalItem, "¡Voto retirado!", "withdrawn-message");
        updateProgressBars();
      } else {
        currentVotes++;
        scoreElement.textContent = currentVotes;
        scoreElement.setAttribute("data-votes", currentVotes);

        saveVote(proposalId, currentVotes);
        updateUserVote(proposalId, true);

        this.classList.add("already-voted");
        voteIcon.textContent = "–";

        showMessage(proposalItem, "¡Gracias por votar!");
        updateProgressBars();
      }
    });
  });

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
    .vote-message:not(.withdrawn-message) {
      background-color: #e0ffe0;
      color: #006400;
      border-color: #90ee90;
    }
    .vote-message.withdrawn-message {
      background-color: #ffe0e0;
      color: #8b0000;
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
