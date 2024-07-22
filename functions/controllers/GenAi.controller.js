import { genAI } from '../utils/gen-ai.js';
import axios from 'axios';

export const recommendSongs = async (req, res, next) => {
    const params = req.query.options;
    const list = params.split(',');
    try {
        const prompt = `Based on the following user responses, recommend 5 songs that match their preferences and mood:
                        1. What is your current mood? (e.g., Upbeat, calm, nostalgic, motivational, etc.)
                        2. What type of music are you in the mood for? (e.g., pop, rock, hip-hop, classical, etc.)
                        3. What genre of music do you usually enjoy? (e.g., pop, rock, hip-hop, classical, etc.)
                        4. What activity will you be doing while listening to the music? (e.g., working out, focus/studying, relaxing, partying, etc.)
                        5. What is your favorite time period for music? (e.g., 60s and 70s, 80s and 90s, 2000s etc)
                        User responses:
                        1. ${list[0]}
                        2. ${list[1]}
                        3. ${list[2]}
                        4. ${list[3]}
                        5. ${list[4]}
                        Please recommend 5 songs that best match the user's preferences and mood. Please only return an array of songs in a JSON object and no extra texts, for example [{ "songName", "artistName" }]`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([prompt]);
        const textResult = result.response.text();
        var newStr = textResult.replace(/`|json|\n/g, "");
        const parsedData = JSON.parse(newStr);
        const response = await getSongLinks(parsedData);
        res.json(response);
    } catch (e) {
        res.status(500).json({
            message: "Server is down..."
        });
    }
};

export const getSongLinks = async (payload) => {
    try {
        const promises = payload.map((value) => axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${value.songName}&api_key=${process.env.API_KEY}&limit=1&format=json`));
        const result = await Promise.allSettled(promises);
        const formattedResult = result.map(({ value: { data: { results: {
            trackmatches: {
                track
            }
        } } } }, index) => ({
            id: ++index,
            name: track[0].name,
            artist: track[0].artist,
            listeners: track[0].listeners,
            url: track[0].url,
            isSelected: false
        }));
        return formattedResult;
    } catch (e) {
        throw e;
    }
};

export const fetchTopSongsSingLoud = async (req, res, next) => {
    try {
        const prompt = 'List the top 5 songs to sing out loud with song name and artist name. Please only return an array of songs in a JSON object and no extra texts, for example [{ "songName", "artistName" }]';
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([prompt]);
        const textResult = result.response.text();
        console.log("textResult-->", textResult);
        var newStr = textResult.replace(/`|json|\n/g, "");
        console.log("newStr-->", newStr);
        const parsedData = JSON.parse(newStr);
        const response = await getSongLinks(parsedData);
        res.json(response);
    } catch (e) {
        res.status(500).json({
            message: "Server is down..."
        });
    }
};

export const fetchTopPartySongs = async (req, res, next) => {
    try {
        const prompt = 'List the top 5 songs to party songs with song name and artist name. Please only return an array of songs in a JSON object and no extra texts, for example [{ "songName", "artistName" }]';
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([prompt]);
        const textResult = result.response.text();
        var newStr = textResult.replace(/`|json|\n/g, "");
        const parsedData = JSON.parse(newStr);
        const response = await getSongLinks(parsedData);
        res.json(response);
    } catch (e) {
        res.status(500).json({
            message: "Server is down..."
        });
    }
};