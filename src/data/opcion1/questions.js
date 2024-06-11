export default[
    {
        question: "¿Tiene alguna métrica de medición de satisfacción del cliente en su startup?",
        type: "SI_NO",
        subQuestion: {
          question: "¿Según su métrica de satisfacción del cliente, cuán satisfecho está su cliente?",
          type: "ESCALA",
          opciones: ['Nada satisfecho', 'Poco satisfecho', 'Neutro', 'Satisfecho', 'Muy Satisfecho']
        }
      },
      {
        question: "¿Su startup tiene financiamiento (Propia/externa)?",
        type: "SI_NO",
        subQuestion: {
          question: "Seleccione en qué categoría de financiación se encuentra su startup.",
          type: "ESCALA",
          opciones: ['Ahorros', 'Inversores privados', 'Inversores profesionales', 'Salida a bolsa']
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
        opciones: ['Casi nada de influencia', 'Muy Poca influencia', 'Influencia media', 'Elevada influencia', 'Dependencia']
      },
  
  ];