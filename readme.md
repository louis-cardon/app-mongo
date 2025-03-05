# CARDON Louis

**Promotion MAALSI 24**

## Liste de toutes les requêtes :

- [http://localhost:3000/totalFilms](http://localhost:3000/totalFilms)
- [http://localhost:3000/totalSeries](http://localhost:3000/totalSeries)
- [http://localhost:3000/contentTypes](http://localhost:3000/contentTypes)
- [http://localhost:3000/genres](http://localhost:3000/genres)
- [http://localhost:3000/filmsAfter2015](http://localhost:3000/filmsAfter2015)
- [http://localhost:3000/filmsWithAwards](http://localhost:3000/filmsWithAwards)
- [http://localhost:3000/filmsWithAwardsFrench](http://localhost:3000/filmsWithAwardsFrench)
- [http://localhost:3000/thrillerDramaCount](http://localhost:3000/thrillerDramaCount)
- [http://localhost:3000/crimeOrThriller](http://localhost:3000/crimeOrThriller)
- [http://localhost:3000/frenchItalianFilms](http://localhost:3000/frenchItalianFilms)
- [http://localhost:3000/highRatedFilms](http://localhost:3000/highRatedFilms)
- [http://localhost:3000/filmsWith4Actors](http://localhost:3000/filmsWith4Actors)

## Marche à suivre :

1. **Copier le fichier `movies.json` dans l'image Docker :**

   ```bash
   docker cp movies.json mongodb_mflix:/movies.json
   ```

2. **Importer les données dans mongo :**

   ```bash
   docker exec -i mongodb_mflix mongoimport --db mflix --collection movies --file /movies.json --jsonArray
   ```

3. **Démarrer l'application:**

   ```bash
   npm start
   ```