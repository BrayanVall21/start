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
    },
    {

      question: "¿Qué tanta cultura empresarial hay en su start up?",
      type: "ESCALA",
      opciones: ['Nada de cultura', 'Baja cultura', 'Intermedia cultura', 'Considerable cultura', 'Alta cultura']
  
    },
    {
      question: "¿Tiene experiencia en el sector?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['Muy baja', 'Baja', 'Aceptable', 'Considerable', 'Elevada']
      }
    },
    {
      question: "¿Tiene experiencia en creación de empresas?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['Muy baja', 'Baja', 'Aceptable', 'Considerable', 'Elevada']
      }
    },
    {
      question: "¿Cuenta con habilidades técnicas y empresariales?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta (Habilidades Técnicas)",
        type: "ESCALA",
        opciones: ['Muy baja', 'Baja', 'Aceptable', 'Considerable', 'Elevada']
      }
    },
    {
      question: "¿Tiene experiencia en Investigación & Desarrollo?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['Muy baja', 'Baja', 'Aceptable', 'Considerable', 'Elevada']
      }
    },
    {
      question: "¿Tiene experiencia en la gestión empresarial?",
      type: "SI_NO",
      subQuestion: {
        question: "Cuánta",
        type: "ESCALA",
        opciones: ['Muy baja', 'Baja', 'Aceptable', 'Considerable', 'Elevada']
      }
    },
    {
      question: "¿Su startup presenta liderazgo empresarial? Mencione un ejemplo.",
      type: "TEXTO",
    },
    {
      question: "¿Qué tanta motivación tenía al crear su start up?",
        type: "ESCALA",
        opciones: ['Sin motivación', 'Poca motivación', 'Motivación normal', 'Considerable motivación', 'Elevada motivación']
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
  