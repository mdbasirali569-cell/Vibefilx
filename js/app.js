/* =========================
   VIBEFLIX MOVIES
   ========================= */

const movies = [
    { title: "The Last Adventure", year: "2026", genre: "Action", rating: "8.7", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80" },
    { title: "Night City", year: "2026", genre: "Sci-Fi", rating: "8.4", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80" },
    { title: "The Journey", year: "2025", genre: "Drama", rating: "8.1", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80" },
    { title: "Lost World", year: "2026", genre: "Adventure", rating: "8.6", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" },
    { title: "Dark Moon", year: "2025", genre: "Sci-Fi", rating: "8.3", image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80" },
    { title: "Ocean", year: "2026", genre: "Adventure", rating: "8.0", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
    { title: "Dark House", year: "2026", genre: "Horror", rating: "7.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" }
];

const movieGrid = document.getElementById("movieGrid");
const trendingMovies = document.getElementById("trendingMovies");
const movieCount = document.getElementById("movieCount");
const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("movieSearchInput");
const searchResults = document.getElementById("searchResults");

function createMovieCard(movie) {
    return `
        <article class="movie-card" onclick="showMovie('${movie.title.replace(/'/g, "\\'")}')" tabindex="0" role="button" aria-label="Open ${movie.title}">
            <div class="movie-poster-wrap">
                <img src="${movie.image}" alt="${movie.title}" loading="lazy">
                <span class="movie-quality">HD</span>
                <span class="movie-rating">★ ${movie.rating}</span>
                <div class="movie-card-overlay">
                    <span class="play-circle" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M9 6.5L17 12L9 17.5V6.5Z" fill="currentColor"/></svg>
                    </span>
                    <span>View details</span>
                </div>
            </div>
            <h3>${movie.title}</h3>
            <p>${movie.year} <span>•</span> ${movie.genre}</p>
        </article>
    `;
}

function loadMovies(list) {
    if (!movieGrid) return;
    movieGrid.innerHTML = list.map(createMovieCard).join("");
    if (movieCount) movieCount.innerText = list.length + " Movies";
}

function loadTrending() {
    if (!trendingMovies) return;
    trendingMovies.innerHTML = movies.slice(0, 5).map(createMovieCard).join("");
}

function showMovie(title) {
    window.location.href = "movie.html?movie=" + encodeURIComponent(title);
}

function filterMovies(category) {
    document.querySelectorAll(".category").forEach(button => button.classList.remove("active"));
    const activeButton = document.querySelector(`.category[data-category="${category}"]`);
    if (activeButton) activeButton.classList.add("active");
    loadMovies(category === "All" ? movies : movies.filter(movie => movie.genre === category));
}

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", function () { filterMovies(this.dataset.category); });
});

function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add("active");
    if (searchInput) {
        searchInput.value = "";
        setTimeout(() => searchInput.focus(), 100);
    }
    showSearchMessage("Start typing to search movies.");
}

function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove("active");
}

function showSearchMessage(message) {
    if (searchResults) searchResults.innerHTML = `<div class="search-empty">${message}</div>`;
}

function searchMovies(query) {
    const text = query.trim().toLowerCase();
    if (!text) return showSearchMessage("Start typing to search movies.");

    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(text) ||
        movie.genre.toLowerCase().includes(text) ||
        movie.year.includes(text)
    );

    if (!results.length) return showSearchMessage("No movie found.");

    searchResults.innerHTML = results.map(movie => `
        <div class="search-result-card" data-title="${movie.title}">
            <img src="${movie.image}" alt="${movie.title}">
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.year} • ${movie.genre} • ★ ${movie.rating}</p>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".search-result-card").forEach(card => {
        card.addEventListener("click", function () { showMovie(this.dataset.title); });
    });
}

if (searchButton) searchButton.addEventListener("click", openSearch);
if (searchClose) searchClose.addEventListener("click", closeSearch);
if (searchInput) searchInput.addEventListener("input", function () { searchMovies(this.value); });

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSearch();
});

if (searchOverlay) {
    searchOverlay.addEventListener("click", function (event) {
        if (event.target === searchOverlay) closeSearch();
    });
}

const heroWatchButton = document.getElementById("heroWatchButton");
if (heroWatchButton) heroWatchButton.addEventListener("click", () => showMovie("The Last Adventure"));

const heroInfoButton = document.getElementById("heroInfoButton");
if (heroInfoButton) heroInfoButton.addEventListener("click", () => showMovie("The Last Adventure"));

document.addEventListener("keydown", function (event) {
    const target = event.target;
    if ((event.key === "Enter" || event.key === " ") && target.classList && target.classList.contains("movie-card")) {
        event.preventDefault();
        target.click();
    }
});

loadTrending();
loadMovies(movies);
