import express from "express";
import cors from 'cors';
// import Top5Router from "./routes/Top5Router.js";
// import GenAiRouter from "./routes/genAiRouter.js";
import ServerlessHttp from "serverless-http";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use('/.netlify/functions/api/top5', Top5Router);
// app.use('/.netlify/functions/api/gen-ai', GenAiRouter);
app.get('/.netlify/functions/api/hello-world', (req, res) => {
    return res.json({
        messages: "hello world!"
    })
});

const serverlessHandler = ServerlessHttp(app);

export const handler = async (event, context) => {
  const result = await serverlessHandler(event, context);
  return result;
};