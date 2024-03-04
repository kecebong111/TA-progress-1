const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Create a new user
router.post('/', (req, res) => {
    const { username, name, location } = req.body;
    const sql = 'INSERT INTO users (username, name, location) VALUES (?, ?, ?)';
    db.query(sql, [username, name, location], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating a new user');
        } else {
            res.status(201).send('User created successfully');
        }
    });
});

// Read all users
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching users');
        } else {
            res.status(200).json(results);
        }
    });
});

// Read a specific user by user_id
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Update a user by user_id
router.put('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const { username, name, location } = req.body;
    const sql = 'UPDATE users SET username = ?, name = ?, location = ? WHERE user_id = ?';
    db.query(sql, [username, name, location, user_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
});

// Delete a user by user_id
router.delete('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(204).send();
        }
    });
});

module.exports = router;