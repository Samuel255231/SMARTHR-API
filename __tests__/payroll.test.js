const { calculatePayroll, calculateOvertimePay, calculateAbsenceDeduction, calculateManagerBonus, calculatePerformanceBonus } = require('../payroll');

describe('Payroll Calculator', () => {
    
    test('calcul salaire normal (pas de heures sup, pas absence)', () => {
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

    test('heures sup ≤ 10', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 5,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.details.heures_sup_montant).toBe(5 * (2000/160));
    });

    test('heures sup > 10 avec majoration 50%', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 12,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        const taux = 2000/160;
        const expected = (10 * taux) + (2 * taux * 1.5);
        expect(result.details.heures_sup_montant).toBe(expected);
    });

    test('absence ≤ 2 jours = pas de deduction', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 2,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.details.deduction_absence).toBe(0);
    });

    test('absence > 2 jours deduction 5% par jour', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 4,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.details.deduction_absence).toBe(2000 * 0.05 * 4);
    });

    test('Manager = prime 500', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Manager',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.details.prime_manager).toBe(500);
    });

    test('Non Manager = pas de prime', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 6
        });
        expect(result.details.prime_manager).toBe(0);
    });

    test('Bonus si objectifs atteints ET anciennete ≥ 12 mois', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: true,
            anciennete_mois: 18
        });
        expect(result.details.bonus_performance).toBe(200);
    });

    test('Pas de bonus si objectifs non atteints', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: false,
            anciennete_mois: 18
        });
        expect(result.details.bonus_performance).toBe(0);
    });

    test('Pas de bonus si anciennete < 12 mois', () => {
        const result = calculatePayroll({
            salaire_base: 2000,
            heures_sup: 0,
            jours_absence: 0,
            grade: 'Employe',
            objectifs: true,
            anciennete_mois: 6
        });
        expect(result.details.bonus_performance).toBe(0);
    });
});