
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { PRODUCTS } from "../constants";

export const aiSearch = async (query: string): Promise<Product[]> => {
  if (!query) return PRODUCTS;

  // Create a new GoogleGenAI instance right before the call as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given the user search query: "${query}", rank the following products by relevance. 
      Return only the list of IDs in order of relevance as a JSON array.
      
      Products:
      ${PRODUCTS.map(p => `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Tags: ${p.tags.join(', ')}`).join('\n')}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    // Access the .text property directly (do not call as a function)
    const jsonStr = response.text?.trim() || "[]";
    const resultIds: string[] = JSON.parse(jsonStr);
    
    return resultIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => !!p);
  } catch (error) {
    console.error("Gemini search failed:", error);
    // Fallback to basic keyword search
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};
