fetch('/movies')
  .then((response) => response.json())
  .then(async (data) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    data.forEach((movie) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      const moviePoster = document.createElement('div');
      moviePoster.className = 'movie-poster';
      moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.posterPath})`;

      const title = document.createElement('h2');
      title.className = 'movie-title';
      title.textContent = `${movie.title} (IMDb: ${movie.rating})`;

      const overview = document.createElement('p');
      overview.className = 'movie-overview';
      overview.textContent = movie.overview;

      const watch = document.createElement('div');
      watch.className = 'movie-watch';
      // ...rest of the code remains the same

      slide.appendChild(moviePoster);
      slide.appendChild(title);
      slide.appendChild(overview);
      slide.appendChild(watch);
      swiperWrapper.appendChild(slide);
    });

    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
