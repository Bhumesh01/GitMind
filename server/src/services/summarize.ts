import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY!});

export async function summarizeContent(data: string) {
    if(!GEMINI_API_KEY){
        return "API KEY NOT FOUND";
    }
    if(!data){
        return "Readme not found";
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `I'm sending the contents readme of the project, please summarize it and generate the summary such that the new developers can even understand it: ${data}`,
    });
    console.log(response.text);
    return response.text;
}
