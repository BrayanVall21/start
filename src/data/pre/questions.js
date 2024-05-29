export default[
    {
      question: "¿La startup cuenta con un producto o servicio mínimamente viable (MVP)?",
      type: "SI_NO",
    },
    {
      question: "¿Su startup ha comenzado a comercializar el producto o servicio en el mercado?",
      type: "SI_NO",
    },
    {
      question: "¿La empresa ha generado ingresos?",
      type: "SI_NO",
      subQuestion: {
        question: "¿Cuál es el nivel de recurrencia de los ingresos?",
        type: "ESCALA",
        opciones: ['Baja recurrencia', 'Recurrente con ingresos bajos', 'Recurrente con ingresos moderados', 'Recurrente con ingresos altos']
      }
    },
    {
      question: "¿Cuántos empleados tiene actualmente la startup",
      type: "ESCALA",
      opciones: ['Menos de 11', 'Entre 11 y 50', 'Más de 50']
      
    },
    {
      question: "¿La empresa ha validado su producto o servicio en el mercado con pruebas de concepto?",
      type: "SI_NO",
    },
    {
      question: "¿Cuál es el mayor tipo de financiación que ha recibido la empresa hasta ahora?",
      type: "ESCALA",
      opciones: ['Ahorros', 'Inversores Privados', 'Inversores Profesionales ', 'Salida a bolsa']

    },
    {
      question: "¿Está la empresa en proceso de escalar su producto o servicio en nuevos mercados o segmentos?",
      type: "SI_NO",
    },
    {
      question: "¿Cuenta la empresa con una base de clientes estable y en crecimiento?",
      type: "SI_NO",
    },
    {
      question: "Está en proceso de una salida a bolsa para captar financiación?",
      type: "SI_NO",
    },
  ];
  