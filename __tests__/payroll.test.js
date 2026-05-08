const request = require('supertest');
const app = require('../app');
const { 
    calculatePayroll, 
    getHourlyRate, 
    calculateOvertimePay, 
    calculateAbsenceDeduction, 
    calculateManagerBonus, 
    calculatePerformanceBonus 
} = require('../payroll');

describe('Tests unitaires des fonctions payroll', () => {
    
    test('getHourlyRate calcule correctement', () => {
        expect(getHourlyRate(2000)).toBe(12.5);
    });

    test('calculateOvertimePay - heures ≤ 10', () => {
        expect(calculateOvertimePay(5, 12.5)).toBe(62.5);
    });

    test('calculateOvertimePay - heures > 10 avec majoration', () => {
        expect(calculateOvertimePay(12, 12.5)).toBe(162.5);
    });

    test('calculateAbsenceDeduction - jours ≤ 2 = 0', () => {
        expect(calculateAbsenceDeduction(2000, 2)).toBe(0);
    });

    test('calculateAbsenceDeduction - jours > 2', () => {
        expect(calculateAbsenceDeduction(2000, 4)).toBe(400);
    });

    test('calculateManagerBonus - Manager = 500', () => {
        expect(calculateManagerBonus('Manager')).toBe(500);
    });

    test('calculateManagerBonus - non Manager = 0', () => {
        expect(calculateManagerBonus('Employe')).toBe(0);
    });

    test('calculatePerformanceBonus - conditions remplies', () => {
        expect(calculatePerformanceBonus(2000, true, 18)).toBe(200);
    });

    test('calculatePerformanceBonus - objectifs non atteints', () => {
        expect(calculatePerformanceBonus(2000, false, 18)).toBe(0);
    });

    test('calculatePerformanceBonus - anciennete < 12 mois', () => {
        expect(calculatePerformanceBonus(2000, true, 6)).toBe(0);
    });

    test('calculatePayroll - cas complet Manager avec bonus', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 12,
            jours_absence: 3,
            grade: 'Manager',
            objectifs: true,
            anciennete_mois: 18
        });
        expect(result.salaire_final).toBe(2562.5);
    });

    test('calculatePayroll - Employe sans bonus', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.salaire_final).toBe(2000);
    });
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