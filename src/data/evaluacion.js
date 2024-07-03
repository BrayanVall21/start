import { fetchGeminiResponse } from './gemini';

// evaluacion.js
const evaluarExito = async (answers) => {
  let score = 0;

  for (let i = 0; i < answers.length; i++) {
    const { question, answer } = answers[i];

    switch (question) {

        //Externos (60 ptos)
        case "¿Tiene alguna métrica de medición de satisfacción del cliente en su startup?":
          if (answer === 'Sí') score += 5;
          break;
        case "¿Según su métrica de satisfacción del cliente, cuán satisfecho está su cliente?":
          switch (answer) {
            case 'Nada satisfecho':
              score += 0;
              break;
            case 'Poco satisfecho':
              score += 1;
              break;
            case 'Neutro':
              score += 2;
              break;
            case 'Satisfecho':
              score += 3;
              break;
            case 'Muy Satisfecho':
              score += 5;
              break;
            default:
              break;
          }
          break;
        case "¿Su startup tiene financiamiento (Propia/externa)":
          if (answer === 'Sí') score += 5; //Verificar
          break;
        case "Seleccione en qué categoría de financiación se encuentra su startup.":
          switch (answer) {
            case 'Ahorros':
              score += 1;
              break;
            case 'Inversores privados':
              score += 2;
              break;
            case 'Inversores profesionales':
              score += 4;
              break;
            case 'Salida a bolsa':
              score += 5;
              break;
            default:
              break;
          }
          break;
        case "¿Está siendo incubado en alguna incubadora de empresas?":
          if (answer === 'Sí') score += 10;
          break;
        case "¿Ha recibido o está recibiendo apoyo gubernamental (Económico, Tutoría, etc)?":
          if (answer === 'Sí') score += 10;
          break;

        case "¿En dónde se encuentra ubicada tu start up?":
          if (answer === 'Nacional') score += 10;
          else score += 10;
          break;
        case "¿Qué tanto influyen las políticas estatales científicas y tecnológicas en tu start up?":
          switch (answer) {
            case 'Casi nada de influencia':
              score += 10;
              break;
            case 'Muy Poca influencia':
              score += 8;
              break;
            case 'Influencia media':
              score += 5;
              break;
            case 'Elevada influencia':
              score += 2;
              break;
            case 'Dependencia':
              score += 0;
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
          const prompt1 = `La pregunta fue: "${question}"; y su respuesta fue: "${answer}". Evalúa si la respuesta cumple con la pregunta. Las respuestas que puedes darme son únicamente, 'Sí' o 'No'`;
          const geminiResponse1 = await fetchGeminiResponse(prompt1);
          
          if (geminiResponse1 === "Sí") {
            score += 10;
          }
          console.log("Pregunta1: ",question)
            console.log("Respuesta1: ",answer)
            console.log("Analisis1: ",geminiResponse1)
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
          break;
        case "¿Tiene experiencia en creación de empresas?":
          if (answer === 'Sí') score += 5;
          break;
        case "¿Cuenta con habilidades técnicas y empresariales?":
          if (answer === 'Sí') score += 5;
          break;
        case "¿Tiene experiencia en Investigación & Desarrollo?":
          if (answer === 'Sí') score += 5;
          break;
        case "¿Tiene experiencia en la gestión empresarial?":
          if (answer === 'Sí') score += 5;
          break;
        case "¿Cuánta?":
          switch (answer) {
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
          break;
        case "¿Su startup presenta liderazgo empresarial? Mencione un ejemplo.":
            const prompt2 = `La pregunta fue: "${question}"; y su respuesta fue: "${answer}". Evalúa si la respuesta cumple con la pregunta. Las respuestas que puedes darme son únicamente, 'Sí' o 'No'`;
            const geminiResponse2 = await fetchGeminiResponse(prompt2);
            
            if (geminiResponse2 === "Sí") {
              score += 10;
            }
            console.log("Pregunta2: ",question)
            console.log("Respuesta2: ",answer)
            console.log("Analisis2: ",geminiResponse2)
            break;
         case "¿Los productos/servicios que están planteando son innovadores?":
            if (answer === 'Sí') score += 5;
          break;
        case "Defina en qué radica su diferenciación." :
          const prompt3 = `La pregunta fue ¿Los productos/servicios que están planteando son innovadores?"${question}"; y su respuesta fue: "${answer}", Evalúa si la respuesta cumple con la pregunta. Las respuestas que puedes darme son únicamente, 'Sí' o 'No'`;
          const geminiResponse3 = await fetchGeminiResponse(prompt3);
              
          if (geminiResponse3 === "Sí") {
            score += 5;
          }
          else 
            score -= 5;
          console.log("Pregunta3: ",question)
          console.log("Respuesta3: ",answer)
          console.log("Analisis3: ",geminiResponse3)
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
          
        default:
          break;
      }
    };
    console.log("score: ",score);
    if (score >= 144) return "Éxito Alto";
    if (score >= 108) return "Éxito Moderado";
    if (score >= 72) return "Éxito Bajo";
    if (score >= 36) return "Éxito muy bajo";
    return "Éxito nulo";
  };
  
  export default evaluarExito;
  