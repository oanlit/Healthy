import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiCompanionResponse = async (userMessage: string, context?: string): Promise<string> => {
  if (!ai) return "Please configure your API Key to talk to me.";

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: `
            You are a warm, healing, and supportive digital companion in a "Cozy Life" productivity app. 
            Your tone is gentle, encouraging, and empathetic. 
            The user is currently: ${context || 'browsing the app'}.
            User says: ${userMessage}
            Keep the response short (under 50 words) and comforting.
          ` }]
        }
      ]
    });
    
    return response.text || "I'm here for you.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble thinking right now, but I'm still here.";
  }
};
