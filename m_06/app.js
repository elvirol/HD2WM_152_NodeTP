// Importer express
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Instancier le serveur
const app = express();

// Autoriser à envoyer des données dans le request body
app.use(express.json());

// ================ BDD ============== //
// Importer mongoose
const mongoose = require('mongoose');

// Ecouter quand la connexion success
mongoose.connection.once('open', () => {
    console.log(`Connecté à la base de données`);
});

// Ecouter quand la connexion plante
mongoose.connection.on('error', (err) => {
    console.log(`Erreur de base de données : ${err}`);
});

// Se connecter à mongo db
mongoose.connect("mongodb://localhost:27017/db_demo_eni");

// Déclarer le modele Person
// 1 : Nom pour les relations dans le code JS (on utilise pas pour le moment)
// 2 : Les attributs attendus pour ce Model
// 3 : Le nom de la collection en base liée (synonyme du nom de la table en sql)
const Person = mongoose.model('Person', { uid: String, pseudo : String }, 'persons');

// ================ BDD ============== //

app.get('/persons', async (request, response) => {

    // Select all persons
    const persons = await Person.find();

    return response.json(persons);
});

app.get('/person/:id', async (request, response) => {
    // Recupérer l'id
    const idParam = request.params.id;

    // Select une person by son id
    const foundPerson = await Person.findOne({ uid : idParam });

    // Si je trouve pas 
    if (!foundPerson){
        return response.json({message : `La personne n'existe pas`});
    }

    // Par défaut si aucune erreur -> retourner la personne trouvé en Json
    return response.json(foundPerson);
});

app.post('/save-person', async (request, response) => {

    // Récupérer la personne envoyer
    const personJson = request.body;

    // -- metier : Générer l'id
    personJson.uid = uuidv4();

    // Instancier une personne en tant que Model Mongo
    const createdPerson = await Person.create(personJson);

    // La persister en base (la sauvegarder)
    //await createdPerson.save();

    return response.json(createdPerson);
});

// Lancer le serveur
app.listen(3000, () => {
    console.log(`Le serveur a démarré`);
});