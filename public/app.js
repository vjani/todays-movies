fetch('/movies')
  .then((response) => response.json())
  .then(async (data) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    data.forEach((movie) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
    
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
    
      const movieCardFront = document.createElement('div');
      movieCardFront.className = 'movie-card-front';
      movieCardFront.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.posterPath})`;
    
      const movieCardBack = document.createElement('div');
      movieCardBack.className = 'movie-card-back';
    
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
          ? '<b>Buy:</b> ' + providers.buy.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';
        const rentProviders = providers.rent
          ? '<b>Rent:</b> ' + providers.rent.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';
        const flatrateProviders = providers.flatrate
          ? '<b>Stream:</b> ' + providers.flatrate.map((provider) => provider.provider_name).join(', ') + '<br>'
          : '';

        watch.innerHTML = buyProviders + rentProviders + flatrateProviders;
      } else {
        watch.textContent = 'No streaming information available.';
      }

      movieCardBack.appendChild(title); // Move this line here
      movieCardBack.appendChild(overview);
      movieCardBack.appendChild(watch);

      movieCard.appendChild(movieCardFront);
      movieCard.appendChild(movieCardBack);
      slide.appendChild(movieCard);
      swiperWrapper.appendChild(slide);

      movieCard.addEventListener('click', () => { // Add this event listener
        movieCard.classList.toggle('flipped');
      });
    });

    new Swiper('.swiper-container', {
      direction: 'vertical', // Add this line
      slidesPerView: 'auto', // Add this line
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    
  });
