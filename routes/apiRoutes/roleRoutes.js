const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, department.department_name
                 AS department_name
                 FROM roles
                 LEFT JOIN department
                 ON roles.role_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;