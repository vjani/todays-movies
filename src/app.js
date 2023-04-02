const TMDB_API_KEY = '6a92a29e1163b7af031dbc2067d4ffd5';
const OMDB_API_KEY = '8a358176';
const randomPage = Math.floor(Math.random() * 10) + 1;
const TMDB_API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&page=${randomPage}`;

fetch(TMDB_API_URL)
  .then((response) => response.json())
  .then(async (data) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    for (let i = 0; i < 5; i++) {
      const movie = data.results[i];
      const [imdbId, providers] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${TMDB_API_KEY}`)
          .then((response) => response.json())
          .then((data) => data.imdb_id),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${TMDB_API_KEY}`)
          .then((response) => response.json())
          .then((data) => data.results.US),
      ]);

      const ratingResponse = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`);
      const ratingData = await ratingResponse.json();
      const rating = ratingData.imdbRating;

      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

      const title = document.createElement('h2');
      title.className = 'movie-title';
      title.textContent = `${movie.title} (IMDb: ${rating})`;

      const overview = document.createElement('p');
      overview.className = 'movie-overview';
      overview.textContent = movie.overview;

      const watch = document.createElement('div');
      watch.className = 'movie-watch';

      if (providers) {
        const buyProviders = providers.buy
          ? 'Buy: ' + providers.buy.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';
        const rentProviders = providers.rent
          ? 'Rent: ' + providers.rent.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';
        const flatrateProviders = providers.flatrate
          ? 'Stream: ' + providers.flatrate.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';

        watch.innerHTML = buyProviders + rentProviders + flatrateProviders;
      } else {
        watch.textContent = 'No streaming information available.';
      }

      slide.appendChild(title);
      slide.appendChild(overview);
      slide.appendChild(watch);
      swiperWrapper.appendChild(slide);
    }

    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
