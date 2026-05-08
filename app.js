const express = require('express');
const app = express();
app.use(express.json());

// ROUTE SALE (Dette Technique maximale)
app.post('/api/calculate-payroll', (req, res) => {
    const { salaire_base, heures_sup, jours_absence, grade, objectifs, anciennete_mois } = req.body;
    
    let result = salaire_base;
    let taux_horaire = salaire_base / 160; // Base 160h/mois
    let heures_sup_montant = 0;
    
    // Règle 1 : Heures sup (imbriqué)
    if (heures_sup > 0) {
        if (heures_sup > 10) {
            let sup_10 = 10 * taux_horaire;
            let sup_restant = (heures_sup - 10) * (taux_horaire * 1.5);
            heures_sup_montant = sup_10 + sup_restant;
        } else {
            heures_sup_montant = heures_sup * taux_horaire;
        }
    }
    result += heures_sup_montant;

    // Règle 2 : Absences (imbriqué)
    if (jours_absence > 0) {
        if (jours_absence > 2) {
            let deduction = salaire_base * 0.05 * jours_absence;
            result -= deduction;
        }
    }

    let prime_manager = 0;
    // Règle 3 : Manager (imbriqué)
    if (grade === 'Manager') {
        prime_manager = 500;
        result += prime_manager;
    }

    let bonus_performance = 0;
    // Règle 4 : Bonus (imbriqué avec ancienneté)
    if (objectifs === true) {
        if (anciennete_mois >= 12) {
            bonus_performance = salaire_base * 0.1;
            result += bonus_performance;
        }
    }

    res.json({
        salaire_base: salaire_base,
        salaire_final: result,
        details: {
            heures_sup_montant,
            deduction_absence: (jours_absence > 2 ? salaire_base * 0.05 * jours_absence : 0),
            prime_manager,
            bonus_performance,
            taux_horaire_calcule: taux_horaire
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));