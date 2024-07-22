import express from "express"; //import express
const Top5Router  = express.Router(); 
import { fetchAsPerArtist } from "../controllers/Top5.controller.js"

Top5Router.get("/artist", fetchAsPerArtist);

export default Top5Router;