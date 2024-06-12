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
        `Estas son las respuestas negativas de la startup: ${JSON.stringify(responses)}. Dame una breve recomendación de mejora para ellas. (La respuesta que debes darme es un texto breve de corrido)`
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

  console.log("Interpretacion: ",interpretationText);

  return interpretationText;
};

export default interpretResponses;
