const rules = [
    {
        field: 'salaire_base',
        check: (v) => typeof v === 'number' && v > 0,
        message: 'salaire_base doit être un nombre positif'
    },
    {
        field: 'heures_sup',
        check: (v) => typeof v === 'number' && v >= 0,
        message: 'heures_sup doit être un nombre positif ou nul'
    },
    {
        field: 'jours_absence',
        check: (v) => typeof v === 'number' && v >= 0,
        message: 'jours_absence doit être un nombre positif ou nul'
    },
    {
        field: 'grade',
        check: (v) => typeof v === 'string',
        message: 'grade doit être une chaîne'
    },
    {
        field: 'objectifs',
        check: (v) => typeof v === 'boolean',
        message: 'objectifs doit être un booléen'
    },
    {
        field: 'anciennete_mois',
        check: (v) => typeof v === 'number' && v >= 0,
        message: 'anciennete_mois doit être un nombre positif ou nul'
    }
];

const validatePayrollInput = (data) => {
    rules.forEach(({ field, check, message }) => {
        if (data[field] === undefined) throw new Error(`Champ manquant : ${field}`);
        if (!check(data[field])) throw new Error(message);
    });
};

module.exports = { validatePayrollInput };