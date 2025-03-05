require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model('Movie', movieSchema, 'movies');

app.get('/', (req, res) => {
    res.send('🚀 API MongoDB est en ligne !');
});

// 1. Obtenez le nombre total de films.
app.get('/totalFilms', async (req, res) => {
    const count = await Movie.countDocuments();
    res.json({ totalFilms: count });
});

// 2. Obtenez le nombre total de séries.
app.get('/totalSeries', async (req, res) => {
    const count = await Movie.countDocuments({ type: "series" });
    res.json({ totalSeries: count });
});

// 3. Obtenez les 2 différents types de contenu présents dans la collection movies (cf.attribut type).
app.get('/contentTypes', async (req, res) => {
    const types = await Movie.distinct("type");
    res.json({ contentTypes: types });
});

// 4. Obtenez la liste des genres de contenus disponibles dans la collection movies.
app.get('/genres', async (req, res) => {
    const genres = await Movie.distinct("genres");
    res.json({ genres });
});

// 5. Récupérez les films depuis 2015 classés par ordre décroissant.
app.get('/filmsAfter2015', async (req, res) => {
    const films = await Movie.find({ year: { $gte: 2015 } }).sort({ year: -1 }).limit(10);
    res.json({ films });
});

// 6. Obtenez le nombre de films sortis depuis 2015 ayant remporté au moins 5 récompenses.
app.get('/filmsWithAwards', async (req, res) => {
    const count = await Movie.countDocuments({ year: { $gte: 2015 }, "awards.wins": { $gte: 5 } });
    res.json({ filmsWithAwards: count });
});

// 7. Parmi ces films, indiquez le nombre de films disponibles en français ?
app.get('/filmsWithAwardsFrench', async (req, res) => {
    const count = await Movie.countDocuments({ year: { $gte: 2015 }, "awards.wins": { $gte: 5 }, languages: "French" });
    res.json({ filmsInFrench: count });
});

// 8. Sélectionnez les films dont le genre est Thriller et Drama. Indiquez leur nombre.
app.get('/thrillerDramaCount', async (req, res) => {
    const count = await Movie.countDocuments({ genres: { $all: ["Thriller", "Drama"] } });
    res.json({ thrillerDramaCount: count });
});

// 9. Sélectionnez le titre et les genres des films dont le genre est Crime ou Thriller.
app.get('/crimeOrThriller', async (req, res) => {
    const films = await Movie.find({ genres: { $in: ["Crime", "Thriller"] } }, { title: 1, genres: 1 }).limit(10);
    res.json({ films });
});

// 10. Sélectionnez le titre et les langues des films disponibles en français et en italien.
app.get('/frenchItalianFilms', async (req, res) => {
    const films = await Movie.find({ languages: { $all: ["French", "Italian"] } }, { title: 1, languages: 1 }).limit(10);
    res.json({ films });
});

// 11. Sélectionnez le titre et le genre des films dont la note d'IMDB est supérieure à 9.
app.get('/highRatedFilms', async (req, res) => {
    const films = await Movie.find({ "imdb.rating": { $gt: 9 } }, { title: 1, genres: 1 }).limit(10);
    res.json({ films });
});

// 12. Affichez le nombre de contenus dont le nombre d'acteurs au casting est égal à 4.
app.get('/filmsWith4Actors', async (req, res) => {
    const count = await Movie.countDocuments({ cast: { $size: 4 } });
    res.json({ filmsWith4Actors: count });
});

app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
