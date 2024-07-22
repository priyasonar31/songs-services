import { GoogleGenerativeAI } from "@google/generative-ai";
export const genAI = new GoogleGenerativeAI(process.env.GEN_AI_KEY);