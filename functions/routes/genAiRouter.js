import express from "express";
const GenAiRouter  = express.Router(); 
import { fetchTopSongsSingLoud, recommendSongs, fetchTopPartySongs } from "../controllers/GenAi.controller.js"

GenAiRouter.get("/top-songs", fetchTopSongsSingLoud);
GenAiRouter.get("/top-party-songs", fetchTopPartySongs);
GenAiRouter.get("/recommended-songs", recommendSongs);

export default GenAiRouter;