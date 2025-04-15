// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDEZlOFO4yobB7YThzxOMh2g_IXzUFZFW0",
  authDomain: "unigara-votacion.firebaseapp.com",
  projectId: "unigara-votacion",
  storageBucket: "unigara-votacion.firebasestorage.app",
  messagingSenderId: "270382373322",
  appId: "1:270382373322:web:9663d04ae894db90c75733",
  measurementId: "G-KNKWMWFYM1",
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === Lógica para votar propuestas ===
document.querySelectorAll(".vote-button").forEach((button) => {
  button.addEventListener("click", async function () {
    const proposalItem = this.closest(".proposal-item");
    const proposalId = proposalItem.getAttribute("data-proposal-id");
    const scoreElement = proposalItem.querySelector(".proposal-score");

    try {
      const docRef = db.collection("propuestas").doc(proposalId);
      const docSnap = await docRef.get();

      let nuevosVotos = 1;

      if (docSnap.exists) {
        // Si ya hay votos, sumamos 1
        nuevosVotos = docSnap.data().votos + 1;
        await docRef.update({ votos: nuevosVotos });
      } else {
        // Si no existe, lo creamos con 1 voto
        await docRef.set({ votos: 1 });
      }

      // Actualizar la interfaz
      scoreElement.textContent = nuevosVotos;
      scoreElement.setAttribute("data-votes", nuevosVotos);
      button.classList.add("already-voted");
    } catch (error) {
      console.error("Error al votar:", error);
    }
  });
});
