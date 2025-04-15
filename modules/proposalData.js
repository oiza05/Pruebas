// --- Detalles de Propuesta y Comentarios ---
//POR AHORA SE SIMULAN LAS PROPUESTAS, MAS ADELANTE HAY QUE CONECTAR CON BASE DE DATOS
export function setupProposalData() {
  // Datos detallados de propuestas (simulados)
  const proposalDetails = {
    1: {
      title: "Sillas en cafetería",
      description: "Renovación de mobiliario en cafetería central",
      fullDescription:
        "El mobiliario actual de la cafetería central lleva más de 10 años sin renovarse. Las sillas tienen piezas rotas y algunas mesas están inestables. Se propone la compra de nuevo mobiliario ergonómico y moderno que mejore la comodidad durante las horas de descanso.",
      category: "Instalaciones",
      author: "Carmen Rodríguez",
      date: "10/04/2025",
      votes: 103,
      status: "Aprobado",
      comments: [
        {
          author: "Miguel Sánchez",
          date: "11/04/2025",
          text: "¡Totalmente de acuerdo! Las sillas actuales son incómodas.",
        },
        {
          author: "Laura Gómez",
          date: "12/04/2025",
          text: "Especialmente importante para quienes pasamos mucho tiempo estudiando allí.",
        },
      ],
    },
    2: {
      title: "Renovación de cámaras",
      description: "Sistema de vigilancia actualizado para mayor seguridad",
      fullDescription:
        "El sistema actual de cámaras de seguridad tiene puntos ciegos y la calidad de imagen no es óptima. Proponemos actualizar a un sistema digital completo con mejor cobertura en todas las áreas críticas del campus.",
      category: "Servicios",
      author: "Jorge Martínez",
      date: "05/04/2025",
      votes: 75,
      status: "En revisión",
      comments: [
        {
          author: "Ana López",
          date: "06/04/2025",
          text: "Hay zonas donde no hay cobertura, especialmente en los aparcamientos.",
        },
      ],
    },
    3: {
      title: "Ventilación en cancha",
      description: "Mejorar sistema de aire en pabellón deportivo",
      fullDescription:
        "Durante actividades intensas, la ventilación actual es insuficiente. Proponemos instalar ventiladores adicionales y mejorar el sistema de circulación de aire para evitar la condensación y mejorar la experiencia deportiva.",
      category: "Instalaciones",
      author: "Pablo Fernández",
      date: "12/04/2025",
      votes: 69,
      status: "En proceso",
      comments: [],
    },
    4: {
      title: "WiFi biblioteca",
      description: "Mejorar la cobertura en salas de estudio",
      fullDescription:
        "La señal WiFi es débil en ciertas áreas de la biblioteca, especialmente en las salas de estudio del tercer piso. Se propone instalar repetidores adicionales para asegurar una cobertura completa.",
      category: "Académico",
      author: "Lucía Herrera",
      date: "01/04/2025",
      votes: 58,
      status: "Pendiente",
      comments: [
        {
          author: "David Torres",
          date: "02/04/2025",
          text: "Totalmente necesario, es frustrante perder la conexión en medio de trabajos online.",
        },
        {
          author: "Sara García",
          date: "03/04/2025",
          text: "La señal es especialmente débil en las mesas del fondo.",
        },
        {
          author: "Mario Ruiz",
          date: "05/04/2025",
          text: "¿Se ha considerado cambiar de proveedor de servicios?",
        },
      ],
    },
  };

  return proposalDetails;
}
