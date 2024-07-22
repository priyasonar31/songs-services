import axios from 'axios';

export const fetchAsPerArtist = async (req, res, next) => {
    try {
        const name = req.query.name;
        const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${process.env.API_KEY}&limit=5&format=json`);
        const formattedResults = response.data?.topalbums?.album?.map((album, index)=>({
            imageLink: album.image[1]?.['#text'],
            name: album.name,
            alt: album.name,
            address: `Play Count ${album.playcount}`,
            isSelected: index % 2 === 0 ? false : true,
            url: album.url,
            id: ++index
        }))
        res.json(formattedResults);
    } catch (e) {
        res.status(500).json({
            message: "Server is down..."
        });
    }
};

