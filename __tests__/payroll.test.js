const request = require('supertest');
const { createApp } = require('../app');
const { 
    calculatePayroll, 
    getHourlyRate, 
    calculateOvertimePay, 
    calculateAbsenceDeduction, 
    calculateManagerBonus, 
    calculatePerformanceBonus 
} = require('../payroll');

const app = createApp();

describe('Tests unitaires des fonctions payroll', () => {
    // ... tes tests existants ...
});

describe('Tests API endpoints', () => {
    test('POST /api/calculate-payroll retourne 200 et le salaire', async () => {
        const response = await request(app)
            .post('/api/calculate-payroll')
            .send({
                salaire_base: 2000,
                heures_sup: 12,
                jours_absence: 3,
                grade: 'Manager',
                objectifs: true,
                anciennete_mois: 18
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.salaire_final).toBeDefined();
    });

    test('POST avec donnée invalide retourne 400', async () => {
        const response = await request(app)
            .post('/api/calculate-payroll')
            .send({ salaire_base: "pas un nombre" });
        expect(response.statusCode).toBe(400);
    });

    test('POST avec salaire_base négatif retourne 400', async () => {
        const response = await request(app)
            .post('/api/calculate-payroll')
            .send({
                salaire_base: -100,
                heures_sup: 5,
                jours_absence: 1,
                grade: 'Employe',
                objectifs: false,
                anciennete_mois: 6
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('salaire_base');
    });
});