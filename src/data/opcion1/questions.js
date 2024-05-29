export default[
    {
        question: "¿Tiene alguna métrica de medición de satisfacción del cliente en su startup?",
        type: "SI_NO",
        subQuestion: {
          question: "¿Según su métrica de satisfacción del cliente, cuán satisfecho está su cliente?",
          type: "ESCALA",
          opciones: ['1', '2', '3', '4', '5']
        }
      },
      {
        question: "¿Su startup está siendo financiada por alguna entidad pública o privada?",
        type: "SI_NO",
        subQuestion: {
          question: "Por favor, usando la escala, seleccione en qué categoría de financiación se encuentra su startup.",
          type: "ESCALA",
          opciones: ['10k', '20k', '30k', '40k', '50k', '60k+']
        }
      },
      {
        question: "¿Está siendo incubado en alguna incubadora de empresas?",
        type: "SI_NO"
      },
      {
        question: "¿Ha recibido o está recibiendo apoyo gubernamental (Económico, Tutoría, etc)?",
        type: "SI_NO"
      },
      {
        question: "¿En dónde se encuentra ubicada tu start up?",
        type: "COMBO_BOX",
        opciones: ['Nacional', 'Extranjero']
      },
      {
        question: "¿Qué tanto influyen las políticas estatales científicas y tecnológicas en tu start up?",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      },
  
    // Otras preguntas para factores externos
  ];