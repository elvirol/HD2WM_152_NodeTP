const express = require('express');

// Instancier l'application serveur
const app = express();

// Mock list viennoiseries
let DB_VIENNOISERIES = [
    'Chocolatines',
    'Beurre Doux',
    'Pain au chocolat',
    "Nantes c'est la Bretagne",
    'Croissant au chocolat',
    'Pizza Ananas',
    'Crevette Nutella'
];

// Déclarer des routes
app.get('/viennoiseries', (request, response) => {
    // Retourner la réponse json
    return response.json({ viennoiseries : DB_VIENNOISERIES});
});

// Démarrer
// param 1 = le port ou on lance le serveur
// param 2 = Que faire quand le serveur à démarrer (afficher un log)
app.listen(3000, () => {
    console.log("Le serveur à demarré");
});