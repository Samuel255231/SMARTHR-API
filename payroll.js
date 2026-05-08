const getHourlyRate = (salary) => salary / 160;

const calculateOvertimePay = (hours, rate) => {
    if (hours <= 10) return hours * rate;
    return 10 * rate + (hours - 10) * rate * 1.5;
};

const calculateAbsenceDeduction = (salary, days) => {
    if (days <= 2) return 0;
    return salary * 0.05 * days;
};

const calculateManagerBonus = (grade) => {
    if (grade === 'Manager') return 500;
    return 0;
};

const calculatePerformanceBonus = (salary, objectives, seniority) => {
    if (objectives === true && seniority >= 12) return salary * 0.1;
    return 0;
};

const calculatePayroll = (data) => {
    const rate = getHourlyRate(data.salaire_base);
    const overtime = calculateOvertimePay(data.heures_sup, rate);
    const absence = calculateAbsenceDeduction(data.salaire_base, data.jours_absence);
    const bonus = calculateManagerBonus(data.grade);
    const perf = calculatePerformanceBonus(data.salaire_base, data.objectifs, data.anciennete_mois);
    
    const final = data.salaire_base + overtime - absence + bonus + perf;
    
    return {
        salaire_base: data.salaire_base,
        salaire_final: final,
        details: {
            heures_sup_montant: overtime,
            deduction_absence: absence,
            prime_manager: bonus,
            bonus_performance: perf,
            taux_horaire_calcule: rate
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