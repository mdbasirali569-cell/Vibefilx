const movies = [

    {
        title: "The Last Adventure",

        year: "2026",

        genre: "Action",

        rating: "8.7",

        image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401"
    },


    {
        title: "Night City",

        year: "2026",

        genre: "Sci-Fi",

        rating: "8.4",

        image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455"
    },


    {
        title: "The Journey",

        year: "2025",

        genre: "Drama",

        rating: "8.1",

        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7"
    },


    {
        title: "Lost World",

        year: "2026",

        genre: "Adventure",

        rating: "8.6",

        image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    },


    {
        title: "Dark Moon",

        year: "2025",

        genre: "Sci-Fi",

        rating: "8.3",

        image:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
    },


    {
        title: "Ocean",

        year: "2026",

        genre: "Adventure",

        rating: "8.0",

        image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },


    {
        title: "Dark House",

        year: "2026",

        genre: "Horror",

        rating: "7.9",

        image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23"
    }

];


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


/* ================= CARD ================= */

function createMovieCard(movie) {

    return `

        <div
            class="movie-card"
            onclick="
                showMovie(
                    '${movie.title}'
                )
            "
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
                •
                ${movie.genre}
                •
                ⭐ ${movie.rating}
            </p>

        </div>

    `;

}


/* ================= LOAD ================= */

function loadMovies(list) {

    movieGrid.innerHTML =
        list
            .map(createMovieCard)
            .join("");

    movieCount.innerText =
        list.length + " Movies";

}


/* ================= TRENDING ================= */

function loadTrending() {

    trendingMovies.innerHTML =
        movies
            .slice(0,5)
            .map(createMovieCard)
            .join("");

}


/* ================= CATEGORY ================= */

function filterMovies(category) {

    const buttons =
        document.querySelectorAll(
            ".category"
        );


    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );

    });


    event.target.classList.add(
        "active"
    );


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


/* ================= MOVIE ================= */

function showMovie(title) {

    const movie =
        movies.find(
            item =>
                item.title === title
        );


    if (!movie) return;


    alert(

        movie.title +

        "\n\n" +

        movie.year +

        " • " +

        movie.genre +

        "\n⭐ " +

        movie.rating

    );

}


/* ================= HERO ================= */

document
    .getElementById(
        "heroWatchButton"
    )
    .addEventListener(
        "click",
        function() {

            alert(
                "Video player will be added in the next phase."
            );

        }
    );


document
    .getElementById(
        "heroInfoButton"
    )
    .addEventListener(
        "click",
        function() {

            showMovie(
                "The Last Adventure"
            );

        }
    );


/* ================= CATEGORY EVENTS ================= */

document
    .querySelectorAll(
        ".category"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                filterMovies(
                    this.dataset.category
                );

            }
        );

    });


/* ================= SEARCH ================= */

document
    .getElementById(
        "searchButton"
    )
    .addEventListener(
        "click",
        function() {

            const query =
                prompt(
                    "Search movie:"
                );


            if (!query) return;


            const result =
                movies.filter(
                    movie =>
                        movie.title
                            .toLowerCase()
                            .includes(
                                query
                                    .toLowerCase()
                            )
                );


            if (!result.length) {

                alert(
                    "Movie not found."
                );

                return;

            }


            loadMovies(result);


            document
                .getElementById(
                    "movies"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ================= START ================= */

loadTrending();

loadMovies(movies);
