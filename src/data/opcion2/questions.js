export default[
    {
      question: "¿El ecosistema actual de su startup presenta factores de innovación y emprendimiento que hayan sido útiles para su desarrollo?",
      type: "SI_NO",
    },
    {
      question: "¿Su startup ha sido capaz de adecuarse a los cambios? Mencione un ejemplo.",
      type: "TEXTO",
    },
    {
      question: "¿Su start up busca la innovación?",
      type: "SI_NO",
      subQuestion: {
        question: "¿Qué tanta cultura empresarial hay en su start up?",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Tiene experiencia en el sector?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Tiene experiencia en creación de empresas?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Cuenta con habilidades técnicas y empresariales?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta (Habilidades Técnicas)",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Tiene experiencia en Investigación & Desarrollo?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Tiene experiencia en la gestión empresarial?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
      }
    },
    {
      question: "¿Su startup presenta liderazgo empresarial? Mencione un ejemplo.",
      type: "TEXTO",
    },
    {
      question: "¿Qué tan motivado estaba al crear su start up?",
        type: "ESCALA",
        opciones: ['1', '2', '3', '4', '5']
    },
    {
      question: "¿Los productos/servicios que están planteando son innovadores?",
      type: "SI_NO",
      subQuestion: {
        question: "Defina en qué radica su diferenciación.",
        type: "TEXTO",
      }
    },
  ];
  