const express = require('express');
const { calculatePayroll } = require('./payroll');

const app = express();
app.use(express.json());

// Validation des champs requis
function checkRequiredFields(data, fields) {
    for (const field of fields) {
        if (data[field] === undefined) {
            throw new Error(`Champ manquant : ${field}`);
        }
    }
}

// Validation des nombres
function validateNumberField(value, fieldName, min = 0) {
    if (typeof value !== 'number' || value < min) {
        throw new Error(`${fieldName} doit être un nombre ${min === 0 ? 'positif ou nul' : 'positif'}`);
    }
}

// Validation des types
function validatePayrollInput(data) {
    const required = ['salaire_base', 'heures_sup', 'jours_absence', 'grade', 'objectifs', 'anciennete_mois'];
    checkRequiredFields(data, required);
    
    validateNumberField(data.salaire_base, 'salaire_base', 1);
    validateNumberField(data.heures_sup, 'heures_sup');
    validateNumberField(data.jours_absence, 'jours_absence');
    
    if (typeof data.grade !== 'string') {
        throw new Error('grade doit être une chaîne de caractères');
    }
    
    if (typeof data.objectifs !== 'boolean') {
        throw new Error('objectifs doit être un booléen');
    }
    
    validateNumberField(data.anciennete_mois, 'anciennete_mois');
    
    return true;
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

// Ne pas tester cette ligne (démarrage serveur)
if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;