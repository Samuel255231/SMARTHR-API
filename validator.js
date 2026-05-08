const REQUIRED_FIELDS = [
    'salaire_base',
    'heures_sup', 
    'jours_absence',
    'grade',
    'objectifs',
    'anciennete_mois'
];

const checkField = (data, field) => {
    if (data[field] === undefined) throw new Error(`Champ manquant : ${field}`);
};

const checkPositiveNumber = (value, name) => {
    if (typeof value !== 'number' || value < 0)
        throw new Error(`${name} doit être un nombre positif ou nul`);
};

const checkStrictPositive = (value, name) => {
    if (typeof value !== 'number' || value <= 0)
        throw new Error(`${name} doit être un nombre positif`);
};

const checkString = (value, name) => {
    if (typeof value !== 'string') throw new Error(`${name} doit être une chaîne`);
};

const checkBoolean = (value, name) => {
    if (typeof value !== 'boolean') throw new Error(`${name} doit être un booléen`);
};

const validatePayrollInput = (data) => {
    REQUIRED_FIELDS.forEach((field) => checkField(data, field));
    checkStrictPositive(data.salaire_base, 'salaire_base');
    checkPositiveNumber(data.heures_sup, 'heures_sup');
    checkPositiveNumber(data.jours_absence, 'jours_absence');
    checkString(data.grade, 'grade');
    checkBoolean(data.objectifs, 'objectifs');
    checkPositiveNumber(data.anciennete_mois, 'anciennete_mois');
};

module.exports = { validatePayrollInput };