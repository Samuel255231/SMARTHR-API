const getHourlyRate = (salary) => salary / 160;

const calculateOvertimePay = (hours, rate) => {
    if (hours <= 10) return hours * rate;
    return 10 * rate + (hours - 10) * (rate * 1.5);
};

const calculateAbsenceDeduction = (salary, days) => {
    if (days <= 2) return 0;
    return salary * 0.05 * days;
};

const calculateManagerBonus = (grade) => (grade === 'Manager' ? 500 : 0);

const calculatePerformanceBonus = (salary, objectives, seniority) => {
    if (!objectives || seniority < 12) return 0;
    return salary * 0.1;
};

// Fonction principale découpée en étapes simples
const calculatePayroll = (data) => {
    const { salaire_base, heures_sup, jours_absence, grade, objectifs, anciennete_mois } = data;
    
    const taux_horaire = getHourlyRate(salaire_base);
    const overtime = calculateOvertimePay(heures_sup, taux_horaire);
    const absence = calculateAbsenceDeduction(salaire_base, jours_absence);
    const bonus = calculateManagerBonus(grade);
    const perf = calculatePerformanceBonus(salaire_base, objectifs, anciennete_mois);
    
    const salaire_final = salaire_base + overtime - absence + bonus + perf;
    
    return {
        salaire_base,
        salaire_final,
        details: {
            heures_sup_montant: overtime,
            deduction_absence: absence,
            prime_manager: bonus,
            bonus_performance: perf,
            taux_horaire_calcule: taux_horaire
        }
    };
};

module.exports = {
    calculatePayroll,
    getHourlyRate,
    calculateOvertimePay,
    calculateAbsenceDeduction,
    calculateManagerBonus,
    calculatePerformanceBonus
};