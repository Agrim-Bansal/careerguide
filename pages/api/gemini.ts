import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
const KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(KEY!);
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-exp-1206",
  // model: "gemini-2.0-flash-exp",
});

const chatSession = model.startChat({generationConfig});



export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { goal, timeframe, current, other } = req.body as {goal:string, timeframe:string, current:string, other:string}; 
  const overviewRes = await overview(goal, timeframe, current, other);
  const timelineRes = await timeline(goal, timeframe, current, other);
  const timetableRes = await timetable(goal, timeframe, current, other);
  res.status(200).json({'overview': overviewRes, 'timeline': timelineRes, 'timetable': timetableRes});
}

async function overview(goal:string, timeframe:string, current:string, other:string) {
  const overviewPrompt = `Currently my status is this : "${current}" and i aim to achieve this : "${goal}" in a time of '${timeframe}'. Some additional information about me is : "${other}". Tell me a short but precise overview of a plan to achieve my aim.
give a list of key_areas which contains an object with attributes name and actions which are a string and a list of actions respectively.`

  const result = await chatSession.sendMessage(overviewPrompt);
  return JSON.parse(result.response.text());
}

async function timeline(goal:string, timeframe:string, current:string, other:string) {
  const timelinePrompt = `Currently my status is this : "${current}" and i aim to achieve this : "${goal}" in a time of '${timeframe}'. Some additional information about me is : "${other}". Make me a timeline to achieve this. give me a list of objects containing period, focus point, activities and milestones`
  
  const result = await chatSession.sendMessage(timelinePrompt);
  return JSON.parse(result.response.text());
}

async function timetable(goal:string, timeframe:string, current:string, other:string) {
  const timetablePrompt = `Currently my status is this : "${current}" and i aim to achieve this : "${goal}" in a time of '${timeframe}'. Some additional information about me is : "${other}". Make me a daily schedule to achieve this.  Just return a list of objects with time, tasks and a description.`
  
  const result = await chatSession.sendMessage(timetablePrompt);
  return JSON.parse(result.response.text());
}



const timelinePrompt = `Currently my status is this : "I am a cs student at iit delhi" and i aim to achieve this : "I want to get a high paying sde job" in a time of '5 years from now.' Make me a timeline to achieve this. only give me a list of objects containing period, focus point, activities and milestones`

const overviewPrompt = `Currently my status is this : "I am a cs student at iit delhi" and i aim to achieve this : "I want to get a high paying sde job" in a time of '5 years from now.' Tell me a short but precise overview of a plan to achieve my aim.
give a list of key_areas which contains an object with attributes name and actions which are a string and a list of actions respectively.`

const timetablePrompt = `Currently my status is this : "I am a cs student at iit delhi" and i aim to achieve this : "I want to get a high paying sde job" in a time of '5 years from now.' Make me a daily schedule to achieve this.  Just return a list of objects with time, tasks and a description.`



