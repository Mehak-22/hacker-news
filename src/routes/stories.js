const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

router.get('/stories', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM stories ORDER BY time_published DESC');
    res.json(rows);
});

router.get('/stories/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM stories WHERE id = ?', [req.params.id]);
    res.json(rows.length ? rows[0] : { message: 'Story not found' });
});

module.exports = router;
