const express = require('express');
const { calculatePayroll } = require('./payroll');

const createApp = () => {
    const app = express();
    app.use(express.json());

    // Vérifie qu'un champ existe
    const fieldExists = (data, field) => {
        if (data[field] === undefined) throw new Error(`Champ manquant : ${field}`);
    };

    // Vérifie que c'est un nombre positif ou nul
    const isPositiveNumber = (value, name) => {
        if (typeof value !== 'number' || value < 0) {
            throw new Error(`${name} doit être un nombre positif ou nul`);
        }
    };

    // Vérifie que c'est un nombre strictement positif
    const isStrictPositiveNumber = (value, name) => {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error(`${name} doit être un nombre positif`);
        }
    };

    // Vérifie que c'est une chaîne
    const isString = (value, name) => {
        if (typeof value !== 'string') throw new Error(`${name} doit être une chaîne`);
    };

    // Vérifie que c'est un booléen
    const isBoolean = (value, name) => {
        if (typeof value !== 'boolean') throw new Error(`${name} doit être un booléen`);
    };

    // Validation complète
    const validatePayrollInput = (data) => {
        fieldExists(data, 'salaire_base');
        fieldExists(data, 'heures_sup');
        fieldExists(data, 'jours_absence');
        fieldExists(data, 'grade');
        fieldExists(data, 'objectifs');
        fieldExists(data, 'anciennete_mois');
        
        isStrictPositiveNumber(data.salaire_base, 'salaire_base');
        isPositiveNumber(data.heures_sup, 'heures_sup');
        isPositiveNumber(data.jours_absence, 'jours_absence');
        isString(data.grade, 'grade');
        isBoolean(data.objectifs, 'objectifs');
        isPositiveNumber(data.anciennete_mois, 'anciennete_mois');
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

    return app;
};

module.exports = { createApp };