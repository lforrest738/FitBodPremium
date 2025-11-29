// Force Git Update

import { GoogleGenAI } from "@google/genai";

// Lazy initialize the client to prevent crash on startup if key is missing
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- 1. CHATBOT (Complex Tasks) ---
// Model: gemini-3-pro-preview
export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "You are Coach Bod, an empathetic, inclusive fitness assistant for the FitBod app. Your users have varying abilities (wheelchair users, chronic fatigue, sensory sensitivity). Keep answers supportive, concise, and accessible. Never give medical advice.",
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat Error", error);
    return "I'm having trouble connecting to my fitness database right now. Please try again.";
  }
};

// --- 2. SEARCH GROUNDING (Up-to-date Info) ---
// Model: gemini-2.5-flash with googleSearch tool
export const generateSearchResponse = async (query: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    // Extract grounding metadata for UI display
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const text = response.text;
    
    return { text, grounding };
  } catch (error) {
    console.error("Search Error", error);
    return { text: "I couldn't search the web right now.", grounding: [] };
  }
};

// --- 3. VISION (Image Analysis) ---
// Model: gemini-3-pro-preview
export const analyzeFoodImage = async (base64Image: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analyze this food image. Identify the meal, estimate approximate calories and macronutrients (Protein, Carbs, Fats) for a standard serving. Keep it concise. Format as: **Dish Name**\n* Calories: X\n* P: Xg | C: Xg | F: Xg\n* Brief health benefit." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Vision Error", error);
    return "I couldn't analyze that image. Please ensure it's a clear photo of food.";
  }
};

// --- 4. FAST RESPONSE (Motivation/Quick Tips) ---
// Model: gemini-2.5-flash-lite
export const getQuickTip = async () => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: "Give me a very short, punchy, 1-sentence fitness motivation quote or tip for someone with limited mobility or energy.",
    });
    return response.text;
  } catch (error) {
    return "Movement is medicine, no matter the pace.";
  }
};

// --- 5. AUDIO TRANSCRIPTION ---
// Model: gemini-2.5-flash
export const transcribeAudio = async (base64Audio: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'audio/wav', data: base64Audio } },
          { text: "Transcribe this audio accurately. Return ONLY the text spoken." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Transcription Error", error);
    return "";
  }
};

// Helper to convert blob to base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};