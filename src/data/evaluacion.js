// evaluacion.js
const evaluarExito = (answers) => {
    let score = 0;
    let multi = 1;
    answers.forEach(({ question, answer, subAnswer }) => {
      switch (question) {

        //Externos (60 ptos)
        case "¿Tiene alguna métrica de medición de satisfacción del cliente en su startup?":
          if (answer === 'Sí') score += 5*multi;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Nada satisfecho':
                score += 0*multi;
                break;
              case 'Poco satisfecho':
                score += 1*multi;
                break;
              case 'Neutro':
                score += 2*multi;
                break;
              case 'Satisfecho':
                score += 3*multi;
                break;
              case 'Muy Satisfecho':
                score += 5*multi;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Su startup tiene financiamiento (Propia/externa)":
          if (answer === 'Sí') score += 5*multi; //Verificar
          if (subAnswer) {
            switch (subAnswer) {
              case 'Ahorros':
                score += 1*multi;
                break;
              case 'Inversores privados':
                score += 2*multi;
                break;
              case 'Inversores profesionales':
                score += 4*multi;
                break;
              case 'Salida a bolsa':
                score += 5*multi;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Está siendo incubado en alguna incubadora de empresas?":
          if (answer === 'Sí') score += 10*multi;
          break;
        case "¿Ha recibido o está recibiendo apoyo gubernamental (Económico, Tutoría, etc)?":
          if (answer === 'Sí') score += 10*multi;
          break;
        case "¿En dónde se encuentra ubicada tu start up?":
          if (answer === 'Nacional') score += 10*multi;
          else score += 10*multi;
          break;
        case "¿Qué tanto influyen las políticas estatales científicas y tecnológicas en tu start up?":
          switch (answer) {
            case 'Casi nada de influencia':
              score += 10*multi;
              break;
            case 'Muy Poca influencia':
              score += 8*multi;
              break;
            case 'Influencia media':
              score += 5*multi;
              break;
            case 'Elevada influencia':
              score += 2*multi;
              break;
            case 'Dependencia':
              score += 0*multi;
              break;
            default:
              break;
          }
          break;



        //Internos (120 pts) 
        case "¿El ecosistema actual de su startup presenta factores de innovación y emprendimiento que hayan sido útiles para su desarrollo?":
          if (answer === 'Sí') score += 10;
          break;
        case "¿Su startup ha sido capaz de adecuarse a los cambios? Mencione un ejemplo.":
          if (answer.trim().length > 0) score += 10;
          break;
        case "¿Su start up busca la innovación?":
          if (answer === 'Sí') score += 10;
          break;
        case "¿Qué tanta cultura empresarial hay en su start up?":
          switch (answer) {
            case 'Nada de cultura':
              score += 0;
              break;
            case 'Baja cultura':
              score += 2;
              break;
            case 'Intermedia cultura':
              score += 5;
              break;
            case 'Considerable cultura':
              score += 8;
              break;
            case 'Alta cultura':
              score += 10;
              break;
            default:
              break;
          }
          break;
        case "¿Tiene experiencia en el sector?":
          if (answer === 'Sí') score += 5;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Muy baja':
                score += 1;
                break;
              case 'Baja':
                score += 2;
                break;
              case 'Aceptable':
                score += 3;
                break;
              case 'Considerable':
                score += 4;
                break;
              case 'Elevada':
                score += 5;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Tiene experiencia en creación de empresas?":
          if (answer === 'Sí') score += 5;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Muy baja':
                score += 1;
                break;
              case 'Baja':
                score += 2;
                break;
              case 'Aceptable':
                score += 3;
                break;
              case 'Considerable':
                score += 4;
                break;
              case 'Elevada':
                score += 5;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Cuenta con habilidades técnicas y empresariales?":
          if (answer === 'Sí') score += 5;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Muy baja':
                score += 1;
                break;
              case 'Baja':
                score += 2;
                break;
              case 'Aceptable':
                score += 3;
                break;
              case 'Considerable':
                score += 4;
                break;
              case 'Elevada':
                score += 5;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Tiene experiencia en Investigación & Desarrollo?":
          if (answer === 'Sí') score += 5;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Muy baja':
                score += 1;
                break;
              case 'Baja':
                score += 2;
                break;
              case 'Aceptable':
                score += 3;
                break;
              case 'Considerable':
                score += 4;
                break;
              case 'Elevada':
                score += 5;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Tiene experiencia en la gestión empresarial?":
          if (answer === 'Sí') score += 5;
          if (subAnswer) {
            switch (subAnswer) {
              case 'Muy baja':
                score += 1;
                break;
              case 'Baja':
                score += 2;
                break;
              case 'Aceptable':
                score += 3;
                break;
              case 'Considerable':
                score += 4;
                break;
              case 'Elevada':
                score += 5;
                break;
              default:
                break;
            }
          }
          break;
        case "¿Su startup presenta liderazgo empresarial? Mencione un ejemplo.":
          if (answer.trim().length > 20) score += 10;
          break;
        case "¿Qué tanta motivación tenía al crear su start up?":
          switch (answer) {
            case 'Sin motivación':
              score += 1;
              break;
            case 'Poca motivación':
              score += 2;
              break;
            case 'Motivación normal':
              score += 3;
              break;
            case 'Considerable motivación':
              score += 4;
              break;
            case 'Elevada motivación':
              score += 5;
              break;
            default:
              break;
          }
          break;
        case "¿Los productos/servicios que están planteando son innovadores?":
          if (answer === 'Sí') score += 5;
          if (subAnswer && subAnswer.trim().length > 20) score += 5;
          break;
        default:
          break;
      }
    });
  
    if (score >= 150) return "Éxito Alto";
    if (score >= 120) return "Éxito Moderado";
    if (score >= 90) return "Éxito Bajo";
    if (score >= 60) return "Éxito muy bajo";
    return "Éxito nulo";
  };
  
  export default evaluarExito;
  