const express = require('express');
const { calculatePayroll } = require('./payroll');

const app = express();
app.use(express.json());

// Validation des champs requis
const checkRequiredFields = (data, fields) => {
    for (const field of fields) {
        if (data[field] === undefined) throw new Error(`Champ manquant : ${field}`);
    }
};

// Validation d'un nombre
const validateNumber = (value, name, min = 0) => {
    if (typeof value !== 'number' || value < min) {
        throw new Error(`${name} doit être un nombre ${min === 0 ? 'positif ou nul' : 'positif'}`);
    }
};

// Validation du grade
const validateGrade = (grade) => {
    if (typeof grade !== 'string') throw new Error('grade doit être une chaîne');
};

// Validation des objectifs
const validateObjectives = (objectifs) => {
    if (typeof objectifs !== 'boolean') throw new Error('objectifs doit être un booléen');
};

// Orchestrateur de validation
const validatePayrollInput = (data) => {
    checkRequiredFields(data, ['salaire_base', 'heures_sup', 'jours_absence', 'grade', 'objectifs', 'anciennete_mois']);
    validateNumber(data.salaire_base, 'salaire_base', 1);
    validateNumber(data.heures_sup, 'heures_sup');
    validateNumber(data.jours_absence, 'jours_absence');
    validateGrade(data.grade);
    validateObjectives(data.objectifs);
    validateNumber(data.anciennete_mois, 'anciennete_mois');
};

app.post('/api/calculate-payroll', (req, res) => {
    try {
        validatePayrollInput(req.body);
        const result = calculatePayroll(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;