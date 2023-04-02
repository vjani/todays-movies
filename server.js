const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/movies', async (req, res) => {
    const TMDB_API_KEY = '6a92a29e1163b7af031dbc2067d4ffd5';
    const OMDB_API_KEY = '8a358176';
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const TMDB_API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&page=${randomPage}`;
    
    try {
      const tmdbResponse = await axios.get(TMDB_API_URL);
      const movies = tmdbResponse.data.results.slice(0, 5);
    
      const movieData = await Promise.all(
        movies.map(async (movie) => {
          const [imdbIdRes, providersRes] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${TMDB_API_KEY}`),
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${TMDB_API_KEY}`),
          ]);
    
          const imdbId = imdbIdRes.data.imdb_id;
          const providers = providersRes.data.results.US;
    
          const omdbResponse = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`);
          const rating = omdbResponse.data.imdbRating;
    
          return {
            title: movie.title,
            posterPath: movie.poster_path,
            overview: movie.overview,
            rating,
            providers,
          };
        })
      );
    
      res.json(movieData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch movie data' });
    }    
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
