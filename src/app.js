const axios = require('axios');
const pool = require('./db/connection');
const wss = require('./app'); // Import WebSocket server instance

const fetchStories = async () => {
    try {
        const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        const storyIds = data.slice(0, 20); // Fetch top 20 new stories

        for (const id of storyIds) {
            const storyResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const { id: hn_id, title, url, score, time } = storyResponse.data;

            // Insert the story into the database (ignore if duplicate)
            const [result] = await pool.query(
                'INSERT IGNORE INTO stories (hn_id, title, url, score, time_published) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?))',
                [hn_id, title, url, score, time]
            );

            // If a new story was inserted, broadcast it via WebSocket
            if (result.affectedRows > 0) {
                const newStory = { hn_id, title, url, score, time_published: new Date(time * 1000) };
                broadcastUpdate(newStory);
            }
        }
        console.log('Scraping completed.');
    } catch (error) {
        console.error('Error fetching stories:', error.message);
    }
};

// Function to broadcast updates via WebSocket
const broadcastUpdate = (story) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message: 'New story added', story }));
        }
    });
};

module.exports = fetchStories;


const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./routes/stories'));
app.get('/', (req, res) => {
    res.send('Welcome to the Hacker News Scraper!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
