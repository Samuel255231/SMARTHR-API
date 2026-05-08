const { calculatePayroll, calculateOvertimePay, calculateAbsenceDeduction, calculateManagerBonus, calculatePerformanceBonus, getHourlyRate } = require('../payroll');

describe('Payroll Calculator', () => {
    
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