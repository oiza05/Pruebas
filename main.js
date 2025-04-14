import { setupMenuToggle } from "./modules/menu.js";
import { setupCharacterCounter } from "./modules/formCounter.js";
import { setupSuggestionForm } from "./modules/suggestionForm.js";
import { setupVotingSystem } from "./modules/voteSystem.js";

document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();
  setupCharacterCounter();
  setupSuggestionForm();
  setupVotingSystem();
});
