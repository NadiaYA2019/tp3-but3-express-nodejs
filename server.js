import mongoose from 'mongoose';
import { app } from './app.js'
import dotenv from 'dotenv';
import util from 'util';
import { Tour } from './models/tour.model.js'
//configure l'environnement
dotenv.config();

//const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)
const connectString = "mongodb://localhost:27017/mydb"
//console.log(DB)

async function connectDB() {
    await mongoose.connect(connectString)
}
connectDB().catch((err) => {
    console.log("Connexion à MongoDB a échoué", err)
})
/* mongoose.connect(connectString)
    .then(() => {
        console.log("connection to MongoDB has succeeded")
    })
    .catch((err) => {
        console.log("Connexion à MongoDB a échoué", err)
    }) */



/* const adresseSchema = new mongoose.Schema({
    rue: String,
    ville: String,
    cp: String
})
const clientSchema = new mongoose.Schema({
    nom: { type: String, required: "Le nom est obligatoire" },
    prenom: { type: String, required: "Le prenom est obligatoire" },
    adresse: {
        rue: String,
        ville: String,
        cp: String
    },
    age: { type: Number }
})


clientSchema.pre('validate', (next) => {
    if (true) {
        next(new Error("L'age doit être compris entre 7 et 77 ans"))
        next();
    }

    else next();

}) */


const adresseSchema = new mongoose.Schema({
    rue: String,
    ville: String,
    cp: String
});

// Définition du schéma Client
const clientSchema = new mongoose.Schema({
    nom: { type: String, required: "Le nom est obligatoire" },
    prenom: { type: String, required: "Le prénom est obligatoire" },
    adresse: adresseSchema, // Utilisation du schéma Adresse pour le champ adresse
    age: { type: Number }
});

// Middleware de validation pour le schéma Client
clientSchema.pre('validate', function (next) {
    if (this.age !== undefined && (this.age < 7 || this.age > 77)) {
        next(new Error("L'âge doit être compris entre 7 et 77 ans"));
    } else {
        next(); // Appeler next() pour passer à l'étape suivante de la validation
    }
});

/* const Client = mongoose.model("Client", clientSchema)
Client.create({
    nom: "Doe",
    prenom: "John",
    adresse: { rue: "123 Rue Principale", ville: "Ville", cp: "12345" },
    age: 80
})
    .then(createdClient => {
        console.log("Client créé avec succès :", createdClient);
    })
    .catch(err => {
        console.error("Erreur lors de la création du client :", err.message);
    });
 */
//const newClient = await Client.create({ nom: "Barack", prenom: "Obama", adresse: "Washington" })

/* const newClient2 = await Client.create({ nom: "Barack", prenom: "Obama", adresse: [{ rue: "1600 Pennsylvania Avenue", ville: "Washington DC", cp: "20398" }], age: 80 })



const count = await Client.countDocuments({ "prenom": /michele/i })

const deletedData = await Client.deleteMany({ "prenom": /michele/i })

console.log(deletedData.deletedCount)

const client = await Client.findOne().where('prenom').equals(/michele/i)
console.log("All clients", util.inspect(client, { depth: 3 }))
 */
//console.log(count)
//console.log(mongoose.Query)

//const newClient = new Client({ nom: "Barack", prenom: "Obama", adresse: "Washington" })

/* newClient.save()
    .then(() => {
        console.log("doc inséré dans la collection clients")
    })
    .catch((err) => {
        console.log(err)
    }) */
/* 
const tourSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A tour must have a name'], unique: true },
    rating: { type: Number, default: 4.5 },
    price: { type: Number, required: [true, 'A tour must have a price'] }
})

const Tour = mongoose.model('Tour', tourSchema) */

/* const testTour = new Tour({
    name: 'The forest Hiker',
    rating: 4.2,
    price: 497
})

testTour.save()
    .then((doc) => {
        console.log(doc)
    })
    .catch(err => {
        console.log("ERROR", err)
    }); */
/* mongoose.connect(process.env.LOCAL_DATABASE).then(() => {
    console.log("connection has succeeded")
}) */

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})