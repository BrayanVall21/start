import fetch from 'node-fetch'; // Asegúrate de tener 'node-fetch' si estás usando Node.js

export const fetchGeminiResponse = async (prompt) => {
  const apiKey = 'AIzaSyALve24SgD0_zE8vNuy_XMYjzgk4_onm-0';
  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    safetySettings: [{
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_ONLY_HIGH"
    }],
    generationConfig: {
      stopSequences: ["Title"],
      temperature: 1.0
    }
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text.trim();
    return result;
  } catch (error) {
    console.error('Error fetching data from Gemini: ', error);
    return null;
  }
};
