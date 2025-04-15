// Exporta la función para que pueda usarse desde main.js u otros módulos
export function setupFilters() {
  // Mapeo: ID de propuesta -> categoría
  const proposalCategories = {
    1: "facilities",
    2: "services",
    3: "facilities",
    4: "academic",
  };

  // Mapeo: ID de propuesta -> fecha
  const proposalDates = {
    1: new Date("2025-04-10"),
    2: new Date("2025-04-05"),
    3: new Date("2025-04-12"),
    4: new Date("2025-04-01"),
  };

  // Copia todos los elementos .proposal-item en una lista fija
  const originalProposals = Array.from(
    document.querySelectorAll(".proposal-item")
  );

  // Asigna data-category y data-date a cada propuesta para filtrado posterior
  originalProposals.forEach((item) => {
    const id = item.getAttribute("data-proposal-id");
    item.setAttribute("data-category", proposalCategories[id] || "other");
    item.setAttribute(
      "data-date",
      proposalDates[id]?.toISOString() || new Date().toISOString()
    );
  });

  // Referencias a los filtros en el DOM
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");

  // Si ambos filtros existen, asignar eventos
  if (categoryFilter && sortFilter) {
    categoryFilter.addEventListener("change", filterProposals);
    sortFilter.addEventListener("change", filterProposals);
  }

  // Función principal que filtra y ordena
  function filterProposals() {
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;
    const proposalList = document.querySelector(".proposal-list");

    // Aplica el filtro de categoría
    const filteredProposals = originalProposals.filter((proposal) => {
      if (selectedCategory === "all") return true;
      return proposal.getAttribute("data-category") === selectedCategory;
    });

    // Aplica ordenación por votos o por fecha
    filteredProposals.sort((a, b) => {
      if (sortBy === "votes") {
        const votesA = parseInt(
          a.querySelector(".proposal-score").getAttribute("data-votes")
        );
        const votesB = parseInt(
          b.querySelector(".proposal-score").getAttribute("data-votes")
        );
        return votesB - votesA; // Mayor número de votos primero
      } else if (sortBy === "date") {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA; // Fecha más reciente primero
      }
      return 0;
    });

    // Vacia el contenedor y reinsertar las propuestas filtradas/ordenadas
    proposalList.innerHTML = "";
    filteredProposals.forEach((proposal, index) => {
      // Actualiza el número visible en cada propuesta
      proposal.querySelector(".proposal-number").textContent = index + 1;
      proposal.style.display = "flex";
      proposalList.appendChild(proposal);
    });
  }

  // Ejecutar una vez al cargar para que el filtro inicial ya funcione
  filterProposals();
}
