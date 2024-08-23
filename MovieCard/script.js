const apiKey = '3a9a763e';
const movieId = 'tt3896198';
const endpoint = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;

async function getData() {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const movieCard = document.getElementById('movie-card');
            movieCard.innerHTML = `
                <img class="movie-poster" src="${data.Poster}" alt="${data.Title} Poster">
                <div class="movie-details">
                    <h2 class="movie-title">${data.Title} (${data.Year})</h2>
                    <p class="movie-meta">${data.Genre} | ${data.Runtime} | Rated: ${data.Rated}</p>
                    <p class="movie-ratings"><span>Ratings:</span> ${data.imdbRating}/10 </p>
                    <p class="movie-director"><span>Director:</span> ${data.Director}</p>
                    <p class="movie-actors"><span>Actors:</span> ${data.Actors}</p>
                    <p class="movie-plot">${data.Plot}</p>
                    <p class="movie-writer"><span>Writers:</span> ${data.Writer} </p>
                    <p class="movie-language"><span>Language:</span> ${data.Language} </p>
                    <p class="movie-country"><span>Country:</span> ${data.Country} </p>
                    <p class="movie-award"><span>Awards:</span> ${data.Awards} </p>
                </div>
            `;
        } else {
            console.error('Failed to fetch data from OMDb API. Please check your endpoint or API key.');
        }
    } catch (error) {
        console.error('An error occurred while fetching data: ', error);
    }
}

getData();

// Define the API URL for a search query
const searchUrl = "http://www.omdbapi.com/?s=Inception&apikey=3a9a763e";

// Function to create movie card elements
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-poster';
    moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image+Available';
    moviePoster.alt = 'Movie Poster';

    const movieDetails = document.createElement('div');
    movieDetails.className = 'movie-details';

    const movieTitle = document.createElement('h1');
    movieTitle.innerText = movie.Title;

    const movieYear = document.createElement('p');
    movieYear.innerHTML = `<strong>Year:</strong> ${movie.Year}`;

    const movieRated = document.createElement('p');
    movieRated.innerHTML = `<strong>Rated:</strong> ${movie.Rated}`;

    const movieReleased = document.createElement('p');
    movieReleased.innerHTML = `<strong>Released:</strong> ${movie.Released}`;

    const movieRuntime = document.createElement('p');
    movieRuntime.innerHTML = `<strong>Runtime:</strong> ${movie.Runtime}`;

    const movieGenre = document.createElement('p');
    movieGenre.innerHTML = `<strong>Genre:</strong> ${movie.Genre}`;

    const movieDirector = document.createElement('p');
    movieDirector.innerHTML = `<strong>Director:</strong> ${movie.Director}`;

    const movieWriter = document.createElement('p');
    movieWriter.innerHTML = `<strong>Writer:</strong> ${movie.Writer}`;

    const movieActors = document.createElement('p');
    movieActors.innerHTML = `<strong>Actors:</strong> ${movie.Actors}`;

    const moviePlot = document.createElement('p');
    moviePlot.innerHTML = `<strong>Plot:</strong> ${movie.Plot}`;

    const movieLanguage = document.createElement('p');
    movieLanguage.innerHTML = `<strong>Language:</strong> ${movie.Language}`;

    const movieCountry = document.createElement('p');
    movieCountry.innerHTML = `<strong>Country:</strong> ${movie.Country}`;

    const movieAwards = document.createElement('p');
    movieAwards.innerHTML = `<strong>Awards:</strong> ${movie.Awards}`;

    const movieImdbRating = document.createElement('p');
    movieImdbRating.innerHTML = `<strong>IMDb Rating:</strong> ${movie.imdbRating}`;

    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(movieYear);
    movieDetails.appendChild(movieRated);
    movieDetails.appendChild(movieReleased);
    movieDetails.appendChild(movieRuntime);
    movieDetails.appendChild(movieGenre);
    movieDetails.appendChild(movieDirector);
    movieDetails.appendChild(movieWriter);
    movieDetails.appendChild(movieActors);
    movieDetails.appendChild(moviePlot);
    movieDetails.appendChild(movieLanguage);
    movieDetails.appendChild(movieCountry);
    movieDetails.appendChild(movieAwards);
    movieDetails.appendChild(movieImdbRating);

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieDetails);

    return movieCard;
}

// Fetch data from the OMDb API
fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        if (data.Search && data.Search.length > 0) {
            const moviePromises = data.Search.slice(0, 9).map(async movie => {
                const movieId = movie.imdbID;
                const movieUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=3a9a763e`;
                const response = await fetch(movieUrl);
                return await response.json();
            });

            return Promise.all(moviePromises);
        } else {
            throw new Error('No movie found');
        }
    })
    .then(movies => {
        const moviesContainer = document.getElementById('movies-container');
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesContainer.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });