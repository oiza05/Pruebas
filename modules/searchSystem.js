export function setupSearch() {
  const searchInput = document.getElementById("proposalSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const proposals = document.querySelectorAll(".proposal-item");

    proposals.forEach((proposal) => {
      const title = proposal
        .querySelector(".proposal-text")
        .textContent.toLowerCase();
      const description = proposal
        .querySelector(".proposal-description")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        proposal.style.display = "flex";
      } else {
        proposal.style.display = "none";
      }
    });
  });
}
