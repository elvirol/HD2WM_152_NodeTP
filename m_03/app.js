const calculatrice = require('./calculatrice');

// Démo : Utiliser notre fonction "add"
// Stocker le resultat dans result
const result = calculatrice.add(10, 20);

// -- afficher du texte formatté (Template string/Template literals)
console.log(`Le résultat de l'addition est : ${result}`);

// Démo : Utiliser notre fonction "multiply"
const result2 = calculatrice.multiply(5, 3);
// -- afficher
console.log(`Le résultat de la multiplication est : ${result2}`);