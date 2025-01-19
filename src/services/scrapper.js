const axios = require('axios');
const pool = require('./db/connection');

const fetchStories = async () => {
    try {
        const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        const storyIds = data.slice(0, 20); // Fetch top 20 new stories

        for (const id of storyIds) {
            const storyData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const { id: hn_id, title, url, score, time } = storyData.data;

            // Insert into database
            await pool.query(
                'INSERT IGNORE INTO stories (hn_id, title, url, score, time_published) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?))',
                [hn_id, title, url, score, time]
            );
        }
        console.log('Scraping completed.');
    } catch (error) {
        console.error('Error fetching stories:', error.message);
    }
};

module.exports = fetchStories;
