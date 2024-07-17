import { fetchGeminiResponse } from './gemini';

// Clasificación de respuestas en positivas y negativas
const classifyResponses = (responses) => {
  let positives = [];
  let negatives = [];

  responses.forEach(response => {
    let answer = response.answer.toLowerCase();
    let positiveResponses = ['sí', 'aceptable', 'profesionales', 'motivación moderada', 'moderada cultura', 'satisfecho', 'muy satisfecho', 'considerable', 'elevada'];
    let negativeResponses = ['no', 'nada satisfecho', 'poco satisfecho', 'muy baja', 'baja', 'sin motivación', 'poca motivación', 'nada de cultura', 'baja cultura'];

    if (positiveResponses.some(pos => answer.includes(pos))) {
      positives.push(response);
    } else if (negativeResponses.some(neg => answer.includes(neg))) {
      negatives.push(response);
    }
  });

  return { positives, negatives };
};

// Envío de respuestas a Gemini
const sendToGemini = async (responses, type) => {
  try {
    let geminiResponse ;
    if(type!=="recomendaciones"){
      geminiResponse = await fetchGeminiResponse(
        `Estas son las respuestas ${type} de la startup: ${JSON.stringify(responses)}. Dame una breve interpretación de ellas. (La respuesta que debes darme es un texto breve de corrido)`
      );
    }
    else{
      geminiResponse = await fetchGeminiResponse(
        `Estas son las respuestas negativas de la startup: ${JSON.stringify(responses)}. Dame una recomendación de mejora para ellas; además, considera que para las siguientes preguntas debes añadir estas métricas en tus respuestas.
        Si la pregunta es ¿Tiene alguna métrica de medición de satisfacción del cliente en su startup? debes recomendarle que es recomendable tener indicadores de rendimiento que permitan conocer la satisfacción del cliente, además de indicadores como el ingreso promedio por usuario, la tasa de abandono de clientes y el valor de vida del cliente.
        Si la pregunta es ¿Su startup tiene financiamiento (Propia/externa)? debes recomendarlo este sitio oficial del estado peruano en el que se listan todos los concursos de financiamiento existentes en el Perú https://calendario.proinnovate.gob.pe/
        Si la pregunta es ¿Está siendo incubado en alguna incubadora de empresas? debes recomendarle este directorio de todas las incubadoras del Perú https://startup.proinnovate.gob.pe/wp-content/uploads/2021/12/20122021-Directorio-Incubadoras-y-Aceleradoras-Red-ProInnovate-2021.pdf
        Si la pregunta es ¿El ecosistema actual de su startup presenta factores de innovación y emprendimiento que hayan sido útiles para su desarrollo? debes recomendable incluir los siguientes factores de innovación Conciencia Empresarial y Motivación, Educación y Formación, Necesidad de Logro, Decisiones Empresariales, Capacidades de Innovación Estratégica, Dinámicas de Innovación y Emprendimiento en el Ámbito Académico
        Si la pregunta es ¿Tiene experiencia en creación de empresas? recomendarle los siguientes cursos gratuitos del estado https://mtpe.trabajo.gob.pe/capacitacionlaboral/como-emprender/ https://www.gob.pe/tuempresa
        
        Si la pregunta es ¿Cuenta con habilidades técnicas y empresariales? recomendarle tener en cuenta los siguientes tipos de habilidades empresariales: personales, interpersonales y grupales
        
        Si la pregunta es ¿Tiene experiencia en la gestión empresarial? recomendarle los siguientes cursos https://www.udemy.com/es/courses/business/management/ 
        https://usil.edu.pe/posgrado/educacion-ejecutiva/gestion-y-emprendimiento/administracion-y-gestion-de-empresas 
        https://www.esan.edu.pe/pee/empresarial/gestion-y-finanzas-para-startups-emprendedores/308
        Si la pregunta es ¿Ha recibido o está recibiendo apoyo gubernamental (Económico, Tutoría, etc)? recomendar los siguientes concursos de apoyo al emprendedor  https://startup.proinnovate.gob.pe/ 
        
        https://www.cofide.com.pe/apoyo_mipyme.php
        
        Si la pregunta es ¿Los productos/servicios que están planteando son innovadores? recomendar tomar en cuenta las siguientes Clases de innovación: 
        -de producto
        -de proceso
        -de organización
        -de marketing
        
        Tipos:
        -Radical
        -incremental
        -arquitectural
        -conceptual
        
        Si la pregunta es ¿Qué tanto influyen las políticas estatales científicas y tecnológicas en tu start up? recomendar el enlace a la ley del joven emprendedor https://busquedas.elperuano.pe/dispositivo/NL/2195233-1
        
        Para las preguntas que no especifiqué, usa tu criterio al recomendar`
      );
    }
    return geminiResponse;
  } catch (error) {
    console.error(`Error enviando las respuestas ${type} a Gemini:`, error);
    return null;
  }
};

const interpretResponses = async (responses, questions) => {
  const { positives, negatives } = classifyResponses(responses);

  // Enviar respuestas positivas a Gemini
  const positiveGeminiResponse = await sendToGemini(positives, 'positivas');

  // Enviar respuestas negativas a Gemini y obtener recomendaciones
  const negativeGeminiResponse = await sendToGemini(negatives, 'negativas');
  const improvementRecommendations = await sendToGemini(negatives, 'recomendaciones');

  // Interpretar resultados
  const interpretationText = `
    ${positiveGeminiResponse}

    ${negativeGeminiResponse}

    ${improvementRecommendations}
  `;

  console.log("Respuestas negativas: ", negatives);
  console.log("Interpretacion: ",interpretationText);

  return interpretationText;
};

export default interpretResponses;
