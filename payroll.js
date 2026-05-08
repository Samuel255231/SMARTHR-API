// payroll.js
const getHourlyRate = (salary) => salary / 160;

const calculateOvertimePay = (hours, rate) => {
    if (hours <= 10) return hours * rate;
    return 10 * rate + (hours - 10) * (rate * 1.5);
};

const calculateAbsenceDeduction = (salary, days) => {
    if (days <= 2) return 0;
    return salary * 0.05 * days;
};

const calculateManagerBonus = (grade) => {
    return grade === 'Manager' ? 500 : 0;
};

const calculatePerformanceBonus = (salary, objectives, ancienneteMois) => {
    if (!objectives) return 0;
    if (ancienneteMois < 12) return 0;
    return salary * 0.1;
};

const calculatePayroll = (data) => {
    const { salaire_base, heures_sup, jours_absence, grade, objectifs, anciennete_mois } = data;
    const taux_horaire = getHourlyRate(salaire_base);
    
    const heures_sup_montant = calculateOvertimePay(heures_sup, taux_horaire);
    const deduction_absence = calculateAbsenceDeduction(salaire_base, jours_absence);
    const prime_manager = calculateManagerBonus(grade);
    const bonus_performance = calculatePerformanceBonus(salaire_base, objectifs, anciennete_mois);
    
    const salaire_final = salaire_base + heures_sup_montant - deduction_absence + prime_manager + bonus_performance;
    
    return {
        salaire_base,
        salaire_final,
        details: {
            heures_sup_montant,
            deduction_absence,
            prime_manager,
            bonus_performance,
            taux_horaire_calcule: taux_horaire
        }
    };
};

module.exports = { calculatePayroll, getHourlyRate, calculateOvertimePay, calculateAbsenceDeduction, calculateManagerBonus, calculatePerformanceBonus };