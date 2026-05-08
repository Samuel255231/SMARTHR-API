const express = require('express');
const { calculatePayroll } = require('./payroll');

const app = express();
app.use(express.json());

// Validation unique sans fonctions intermédiaires
function validatePayrollInput(data) {
    const required = ['salaire_base', 'heures_sup', 'jours_absence', 'grade', 'objectifs', 'anciennete_mois'];
    
    for (const field of required) {
        if (data[field] === undefined) {
            throw new Error(`Champ manquant : ${field}`);
        }
    }
    
    if (typeof data.salaire_base !== 'number' || data.salaire_base <= 0) {
        throw new Error('salaire_base doit être un nombre positif');
    }
    
    if (typeof data.heures_sup !== 'number' || data.heures_sup < 0) {
        throw new Error('heures_sup doit être un nombre positif ou nul');
    }
    
    if (typeof data.jours_absence !== 'number' || data.jours_absence < 0) {
        throw new Error('jours_absence doit être un nombre positif ou nul');
    }
    
    if (typeof data.grade !== 'string') {
        throw new Error('grade doit être une chaîne de caractères');
    }
    
    if (typeof data.objectifs !== 'boolean') {
        throw new Error('objectifs doit être un booléen');
    }
    
    if (typeof data.anciennete_mois !== 'number' || data.anciennete_mois < 0) {
        throw new Error('anciennete_mois doit être un nombre positif ou nul');
    }
}

app.post('/api/calculate-payroll', (req, res) => {
    try {
        validatePayrollInput(req.body);
        const result = calculatePayroll(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;