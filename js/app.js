/* =========================
   VIBEFLIX MOVIES
   ========================= */

const movies = [

    {
        title: "The Last Adventure",
        year: "2026",
        genre: "Action",
        rating: "8.7",
        image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "Night City",
        year: "2026",
        genre: "Sci-Fi",
        rating: "8.4",
        image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "The Journey",
        year: "2025",
        genre: "Drama",
        rating: "8.1",
        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "Lost World",
        year: "2026",
        genre: "Adventure",
        rating: "8.6",
        image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "Dark Moon",
        year: "2025",
        genre: "Sci-Fi",
        rating: "8.3",
        image:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "Ocean",
        year: "2026",
        genre: "Adventure",
        rating: "8.0",
        image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    },

    {
        title: "Dark House",
        year: "2026",
        genre: "Horror",
        rating: "7.9",
        image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    }

];


/* =========================
   ELEMENTS
   ========================= */

const movieGrid =
    document.getElementById(
        "movieGrid"
    );

const trendingMovies =
    document.getElementById(
        "trendingMovies"
    );

const movieCount =
    document.getElementById(
        "movieCount"
    );


/* SEARCH ELEMENTS */

const searchButton =
    document.getElementById(
        "searchButton"
    );

const searchOverlay =
    document.getElementById(
        "searchOverlay"
    );

const searchClose =
    document.getElementById(
        "searchClose"
    );

const searchInput =
    document.getElementById(
        "movieSearchInput"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );


/* =========================
   MOVIE CARD
   ========================= */

function createMovieCard(movie) {

    return `

        <div
            class="movie-card"
            onclick="showMovie('${movie.title}')"
        >

            <img
                src="${movie.image}"
                alt="${movie.title}"
                loading="lazy"
            >

            <h3>
                ${movie.title}
            </h3>

            <p>

                ${movie.year}

                • ${movie.genre}

                • ⭐ ${movie.rating}

            </p>

        </div>

    `;
}


/* =========================
   LOAD MOVIES
   ========================= */

function loadMovies(list) {

    if (!movieGrid) return;


    movieGrid.innerHTML =
        list
            .map(createMovieCard)
            .join("");


    if (movieCount) {

        movieCount.innerText =
            list.length + " Movies";

    }

}


/* =========================
   TRENDING
   ========================= */

function loadTrending() {

    if (!trendingMovies) return;


    trendingMovies.innerHTML =
        movies
            .slice(0, 5)
            .map(createMovieCard)
            .join("");

}


/* =========================
   OPEN MOVIE
   ========================= */

function showMovie(title) {

    window.location.href =
        "movie.html?movie=" +
        encodeURIComponent(title);

}


/* =========================
   CATEGORY FILTER
   ========================= */

function filterMovies(category) {

    document
        .querySelectorAll(".category")
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


    const activeButton =
        document.querySelector(
            `.category[data-category="${category}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }


    if (category === "All") {

        loadMovies(movies);

        return;

    }


    const filtered =
        movies.filter(
            movie =>
                movie.genre === category
        );


    loadMovies(filtered);

}


/* =========================
   CATEGORY BUTTONS
   ========================= */

document
    .querySelectorAll(".category")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    filterMovies(
                        this.dataset.category
                    );

                }
            );

        }
    );


/* =========================
   LIQUID GLASS SEARCH
   ========================= */

function openSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.add(
        "active"
    );


    if (searchInput) {

        searchInput.value = "";

        setTimeout(
            () => searchInput.focus(),
            100
        );

    }


    showSearchMessage(
        "Start typing to search movies."
    );

}


function closeSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.remove(
        "active"
    );

}


/* =========================
   SEARCH MESSAGE
   ========================= */

function showSearchMessage(
    message
) {

    if (!searchResults) return;


    searchResults.innerHTML = `

        <div class="search-empty">

            ${message}

        </div>

    `;

}


/* =========================
   SEARCH MOVIES
   ========================= */

function searchMovies(query) {

    const text =
        query
            .trim()
            .toLowerCase();


    if (!text) {

        showSearchMessage(
            "Start typing to search movies."
        );

        return;

    }


    const results =
        movies.filter(
            movie => {

                return (

                    movie.title
                        .toLowerCase()
                        .includes(text)

                    ||

                    movie.genre
                        .toLowerCase()
                        .includes(text)

                    ||

                    movie.year
                        .toString()
                        .includes(text)

                );

            }
        );


    if (!results.length) {

        showSearchMessage(
            "😕 No movie found."
        );

        return;

    }


    searchResults.innerHTML =
        results
            .map(
                movie => `

                    <div
                        class="search-result-card"
                        data-title="${movie.title}"
                    >

                        <img
                            src="${movie.image}"
                            alt="${movie.title}"
                        >

                        <div>

                            <h3>
                                ${movie.title}
                            </h3>

                            <p>

                                ${movie.year}

                                • ${movie.genre}

                                • ⭐ ${movie.rating}

                            </p>

                        </div>

                    </div>

                `
            )
            .join("");


    document
        .querySelectorAll(
            ".search-result-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    function() {

                        const title =
                            this.dataset.title;


                        showMovie(title);

                    }
                );

            }
        );

}


/* =========================
   SEARCH BUTTON
   ========================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearch
    );

}


/* =========================
   CLOSE SEARCH
   ========================= */

if (searchClose) {

    searchClose.addEventListener(
        "click",
        closeSearch
    );

}


/* =========================
   SEARCH INPUT
   ========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            searchMovies(
                this.value
            );

        }
    );

}


/* =========================
   ESC TO CLOSE
   ========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeSearch();

        }

    }
);


/* =========================
   CLICK OUTSIDE
   ========================= */

if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================
   HERO BUTTONS
   ========================= */

const heroWatchButton =
    document.getElementById(
        "heroWatchButton"
    );


if (heroWatchButton) {

    heroWatchButton.addEventListener(
        "click",
        function() {

            showMovie(
                "The Last Adventure"
            );

        }
    );

}


const heroInfoButton =
    document.getElementById(
        "heroInfoButton"
    );


if (heroInfoButton) {

    heroInfoButton.addEventListener(
        "click",
        function() {

            showMovie(
                "The Last Adventure"
            );

        }
    );

}


/* =========================
   START
   ========================= */

loadTrending();

loadMovies(movies);
