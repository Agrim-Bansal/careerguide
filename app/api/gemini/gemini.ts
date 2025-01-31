// import { GoogleGenerativeAI } from "@google/generative-ai";
// const KEY = process.env.API_KEY;

// const genAI = new GoogleGenerativeAI(KEY!);
// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// const model = genAI.getGenerativeModel({
//   model: "gemini-exp-1206",
//   // model: "gemini-2.0-flash-exp",
// });

// const chatSession = model.startChat({generationConfig});



// export default async function POST(req: Request, res: Response) {
//   const { goal, timeline, current, other } = await req.json();
//   const response = await overview();
//   res.status(200).json({response});
// }

// async function overview() {
//   const result = await chatSession.sendMessage(overviewPrompt);
//   return result.response.text();
// }


// const overviewPrompt = `Currently my status is this : "I am a cs student at iit delhi" and i aim to achieve this : "I want to get a high paying sde job" in a time of '5 years from now.' Tell me a short but precise overview of a plan to achieve my aim.
// give a list of key_areas which contains an object with attributes name and actions which are a string and a list of actions respectively.`