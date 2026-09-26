/* =========================
   VIBEFLIX + TMDB MOVIES
   ========================= */

let movies = [];
let selectedMovie = null;

const movieGrid = document.getElementById("movieGrid");
const trendingMovies = document.getElementById("trendingMovies");
const movieCount = document.getElementById("movieCount");
const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("movieSearchInput");
const searchResults = document.getElementById("searchResults");

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP = "https://image.tmdb.org/t/p/w1280";
const TMDB_API = "https://api.themoviedb.org/3";
const accessToken = window.TMDB_CONFIG?.accessToken || "";

const genreNames = {
    28: "Action", 12: "Adventure", 18: "Drama", 878: "Sci-Fi", 27: "Horror",
    35: "Comedy", 80: "Crime", 10749: "Romance", 53: "Thriller", 16: "Animation",
    14: "Fantasy", 9648: "Mystery", 36: "History", 10752: "War", 99: "Documentary"
};

function normalizeMovie(item) {
    const year = item.release_date ? item.release_date.slice(0, 4) : "—";
    const genre = genreNames[item.genre_ids?.[0]] || "Movie";
    return {
        id: item.id,
        title: item.title || item.original_title || "Untitled",
        year,
        genre,
        rating: item.vote_average ? Number(item.vote_average).toFixed(1) : "—",
        image: item.poster_path ? TMDB_IMAGE + item.poster_path : "",
        backdrop: item.backdrop_path ? TMDB_BACKDROP + item.backdrop_path : "",
        overview: item.overview || "No description available."
    };
}

function createMovieCard(movie) {
    const image = movie.image || "https://via.placeholder.com/500x750/151515/ffffff?text=Vibefilx";
    return `<article class="movie-card" data-id="${movie.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(movie.title)}"><div class="movie-poster-wrap"><img src="${image}" alt="${escapeHtml(movie.title)}" loading="lazy"><span class="movie-quality">HD</span><span class="movie-rating">★ ${movie.rating}</span><div class="movie-card-overlay"><span class="play-circle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 6.5L17 12L9 17.5V6.5Z" fill="currentColor"/></svg></span><span>View details</span></div></div><h3>${escapeHtml(movie.title)}</h3><p>${movie.year} <span>•</span> ${escapeHtml(movie.genre)}</p></article>`;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}

function renderMovieCards(list, target = movieGrid) {
    if (!target) return;
    target.innerHTML = list.length ? list.map(createMovieCard).join("") : `<div class="search-empty">No movies found.</div>`;
    target.querySelectorAll(".movie-card").forEach(card => {
        const open = () => showMovieById(Number(card.dataset.id));
        card.addEventListener("click", open);
        card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
}

function loadMovies(list) {
    movies = list;
    renderMovieCards(list, movieGrid);
    if (movieCount) movieCount.innerText = `${list.length} Movies`;
}

function loadTrending(list) {
    renderMovieCards(list.slice(0, 8), trendingMovies);
}

function showMovieById(id) {
    const movie = movies.find(item => item.id === id);
    if (!movie) return;
    window.location.href = "movie.html?movieId=" + encodeURIComponent(movie.id);
}

async function tmdbFetch(endpoint) {
    if (!accessToken) throw new Error("TMDB token is missing");
    const response = await fetch(TMDB_API + endpoint, {
        headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" }
    });
    if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
    return response.json();
}

async function loadRealMovies() {
    if (!accessToken) {
        showSetupMessage();
        return;
    }
    try {
        const [popularData, trendingData] = await Promise.all([
            tmdbFetch("/movie/popular?language=en-US&page=1"),
            tmdbFetch("/trending/movie/week?language=en-US")
        ]);
        const popular = (popularData.results || []).map(normalizeMovie);
        const trending = (trendingData.results || []).map(normalizeMovie);
        loadMovies(popular);
        loadTrending(trending);
        if (trending[0]) updateHero(trending[0]);
    } catch (error) {
        console.error(error);
        showSetupMessage("TMDB connection failed. Check your API token.");
    }
}

function showSetupMessage(message = "Add your TMDB API Read Access Token to js/tmdb-config.js to load real movie data.") {
    if (movieGrid) movieGrid.innerHTML = `<div class="search-empty">${escapeHtml(message)}</div>`;
    if (trendingMovies) trendingMovies.innerHTML = `<div class="search-empty">Real movie data is ready once TMDB is connected.</div>`;
    if (movieCount) movieCount.innerText = "TMDB setup needed";
}

function updateHero(movie) {
    const title = document.getElementById("heroTitle");
    const meta = document.getElementById("heroMeta");
    const description = document.getElementById("heroDescription");
    const hero = document.querySelector(".hero");
    if (title) title.textContent = movie.title;
    if (meta) meta.textContent = `${movie.year} • ${movie.genre} • ⭐ ${movie.rating}`;
    if (description) description.textContent = movie.overview;
    if (hero && movie.backdrop) hero.style.backgroundImage = `linear-gradient(90deg,#000 0%,rgba(0,0,0,.8) 40%,rgba(0,0,0,.2) 100%),url("${movie.backdrop}")`;
    selectedMovie = movie;
}

function filterMovies(category) {
    document.querySelectorAll(".category").forEach(button => button.classList.remove("active"));
    const activeButton = document.querySelector(`.category[data-category="${CSS.escape(category)}"]`);
    if (activeButton) activeButton.classList.add("active");
    if (category === "All") loadMovies(movies);
    else loadMovies(movies.filter(movie => movie.genre === category));
}

document.querySelectorAll(".category").forEach(button => button.addEventListener("click", function () { filterMovies(this.dataset.category); }));

function openSearch() {
    searchOverlay?.classList.add("active");
    if (searchInput) { searchInput.value = ""; setTimeout(() => searchInput.focus(), 100); }
    showSearchMessage("Start typing to search real movies.");
}
function closeSearch() { searchOverlay?.classList.remove("active"); }
function showSearchMessage(message) { if (searchResults) searchResults.innerHTML = `<div class="search-empty">${escapeHtml(message)}</div>`; }

async function searchMovies(query) {
    const text = query.trim();
    if (!text) return showSearchMessage("Start typing to search real movies.");
    if (!accessToken) return showSearchMessage("Connect TMDB first to search real movies.");
    showSearchMessage("Searching...");
    try {
        const data = await tmdbFetch(`/search/movie?query=${encodeURIComponent(text)}&include_adult=false&language=en-US&page=1`);
        const results = (data.results || []).slice(0, 12).map(normalizeMovie);
        if (!results.length) return showSearchMessage("No movie found.");
        searchResults.innerHTML = results.map(movie => `<div class="search-result-card" data-id="${movie.id}"><img src="${movie.image || 'https://via.placeholder.com/100x150/151515/ffffff?text=Movie'}" alt="${escapeHtml(movie.title)}"><div><h3>${escapeHtml(movie.title)}</h3><p>${movie.year} • ${escapeHtml(movie.genre)} • ★ ${movie.rating}</p></div></div>`).join("");
        searchResults.querySelectorAll(".search-result-card").forEach(card => card.addEventListener("click", () => showMovieById(Number(card.dataset.id))));
    } catch (error) {
        console.error(error);
        showSearchMessage("Search failed. Please try again.");
    }
}

searchButton?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", e => searchMovies(e.target.value));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSearch(); });
searchOverlay?.addEventListener("click", e => { if (e.target === searchOverlay) closeSearch(); });

document.getElementById("heroWatchButton")?.addEventListener("click", () => selectedMovie && showMovieById(selectedMovie.id));
document.getElementById("heroInfoButton")?.addEventListener("click", () => selectedMovie && showMovieById(selectedMovie.id));

loadRealMovies();
