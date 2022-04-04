const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, department.department_name AS department_name,
                 roles.job_title AS job_title,
                 roles.salary AS salary
                 FROM employees
                 LEFT JOIN department ON employees.department_id = department.id
                 LEFT JOIN roles ON employees.job_id = roles.id`;
                 

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