fetch('/movies')
  .then((response) => response.json())
  .then(async (data) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    data.forEach((movie) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.posterPath})`;

      const title = document.createElement('h2');
      title.className = 'movie-title';
      title.textContent = `${movie.title} (IMDb: ${movie.rating})`;

      const overview = document.createElement('p');
      overview.className = 'movie-overview';
      overview.textContent = movie.overview;

      const watch = document.createElement('div');
      watch.className = 'movie-watch';

      const providers = movie.providers;

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
    });

    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });