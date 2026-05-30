import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import type { fileType } from "./readFiles.js";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY!});

export async function summarizeReadme(data: string) {
    if(!GEMINI_API_KEY){
        return "API KEY NOT FOUND";
    }
    if(!data){
        return "Readme not found";
    }
    try{
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `
            You are an expert software engineer and technical writer.

            Analyze the following GitHub repository README and generate developer-friendly documentation.

            Your target audience is a new developer who has just joined the project and needs to quickly understand:
            - What the project does
            - The problem it solves
            - Key features
            - Technologies used
            - Setup and installation instructions
            - Important concepts a contributor should know

            Requirements:
            - Respond ONLY in valid Markdown.
            - Do NOT use HTML.
            - Do NOT include introductory phrases such as "Here is the summary" or "Based on the README".
            - Use clear section headings.
            - Use bullet points where appropriate.
            - Keep explanations concise but informative.
            - If information is missing from the README, explicitly mention that it was not found.
            - Make the output suitable for rendering directly in a frontend Markdown component.

            README CONTENT:

            ${data}
            `
        });
        console.log(response.text);
        return response.text;
    }
    catch(err){
        console.log(err);
        return "Error while Summarizing"
    }
}

export async function summarizeTechStack(data: fileType[]) {
    if(!GEMINI_API_KEY){
        return "API KEY NOT FOUND";
    }
    if(data.length === 0){
        return "Readme not found";
    }
    try{
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `
            You are a senior software architect.

            Analyze the provided repository files and identify the technology stack.

            Return ONLY raw JSON.

            Rules:
            - Do not wrap the JSON in markdown.
            - Do not use code fences.
            - Do not include explanations outside the JSON.
            -Do not wrap the response in \`\`\`json.
            - If a category cannot be determined, return an empty array.
            - Only include technologies that can be reasonably inferred from the provided files.
            - Avoid duplicates.

            JSON Schema:

            {
              "languages": [],
              "frameworks": [],
              "databases": [],
              "buildTools": [],
              "packageManagers": [],
              "testingFrameworks": [],
              "devOpsTools": [],
              "cloudServices": [],
              "otherTechnologies": [],
              "summary": ""
            }

            Field descriptions:
            - languages: Programming languages used.
            - frameworks: Application frameworks and libraries.
            - databases: Databases or ORMs.
            - buildTools: Build systems and bundlers.
            - packageManagers: npm, yarn, pip, Maven, Gradle, etc.
            - testingFrameworks: Jest, Vitest, PyTest, JUnit, etc.
            - devOpsTools: Docker, Kubernetes, Terraform, etc.
            - cloudServices: AWS, Azure, GCP, Vercel, Netlify, etc.
            - otherTechnologies: Any notable technologies not covered above.
            - summary: A concise 2-4 sentence description of the stack.

            Repository Files:

            ${JSON.stringify(data)}
            `
        });
        console.log(response.text);
        try {
            return JSON.parse(response.text!);
        }
        catch {
            return {
                error: "Failed to parse Gemini JSON"
            };
        }
    }
    catch(err){
        console.log(err);
        return "Error while Summarizing"
    }
}
