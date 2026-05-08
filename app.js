const express = require('express');
const { calculatePayroll } = require('./payroll');
const { validatePayrollInput } = require('./validator');

const createApp = () => {
    const app = express();
    app.use(express.json());

    app.post('/api/calculate-payroll', (req, res) => {
        try {
            validatePayrollInput(req.body);
            const result = calculatePayroll(req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return app;
};

module.exports = { createApp };