// validator.js - version ultra simple sans boucle ni conditions complexes

const checkSalaireBase = (data) => {
    if (data.salaire_base === undefined) throw new Error('Champ manquant : salaire_base');
    if (typeof data.salaire_base !== 'number' || data.salaire_base <= 0) {
        throw new Error('salaire_base doit être un nombre positif');
    }
};

const checkHeuresSup = (data) => {
    if (data.heures_sup === undefined) throw new Error('Champ manquant : heures_sup');
    if (typeof data.heures_sup !== 'number' || data.heures_sup < 0) {
        throw new Error('heures_sup doit être un nombre positif ou nul');
    }
};

const checkJoursAbsence = (data) => {
    if (data.jours_absence === undefined) throw new Error('Champ manquant : jours_absence');
    if (typeof data.jours_absence !== 'number' || data.jours_absence < 0) {
        throw new Error('jours_absence doit être un nombre positif ou nul');
    }
};

const checkGrade = (data) => {
    if (data.grade === undefined) throw new Error('Champ manquant : grade');
    if (typeof data.grade !== 'string') {
        throw new Error('grade doit être une chaîne de caractères');
    }
};

const checkObjectifs = (data) => {
    if (data.objectifs === undefined) throw new Error('Champ manquant : objectifs');
    if (typeof data.objectifs !== 'boolean') {
        throw new Error('objectifs doit être un booléen');
    }
};

const checkAncienneteMois = (data) => {
    if (data.anciennete_mois === undefined) throw new Error('Champ manquant : anciennete_mois');
    if (typeof data.anciennete_mois !== 'number' || data.anciennete_mois < 0) {
        throw new Error('anciennete_mois doit être un nombre positif ou nul');
    }
};

// Orchestrateur : ne fait qu'appeler les autres fonctions (complexité = 1)
const validatePayrollInput = (data) => {
    checkSalaireBase(data);
    checkHeuresSup(data);
    checkJoursAbsence(data);
    checkGrade(data);
    checkObjectifs(data);
    checkAncienneteMois(data);
};

module.exports = { validatePayrollInput };