import { setupMenuToggle } from "./modules/menu.js";
import { setupCharacterCounter } from "./modules/formCounter.js";
import { setupSuggestionForm } from "./modules/suggestionForm.js";
import { setupVotingSystem } from "./modules/voteSystem.js";
import { setupThemeSwitcher } from "./modules/theme.js";
import { setupPreview } from "./modules/preview.js";
import { setupProposalDetailModal } from "./modules/proposalDetails.js";
import { setupAccessibility } from "./modules/accessibility.js";
document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();
  setupCharacterCounter();
  setupSuggestionForm();
  setupVotingSystem();
  setupThemeSwitcher();
  setupPreview();
  setupProposalDetailModal();
  setupAccessibility();
});
