const express = require('express');
const { calculatePayroll } = require('./payroll');

const app = express();
app.use(express.json());

app.post('/api/calculate-payroll', (req, res) => {
    try {
        const result = calculatePayroll(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));