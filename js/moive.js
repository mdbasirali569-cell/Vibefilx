/* ================= MOVIE DATA ================= */

const movies = [

    {
        title: "The Last Adventure",

        year: "2026",

        genre: "Action",

        rating: "8.7",

        duration: "2h 14m",

        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401",

        description:
        "A thrilling cinematic adventure full of mystery, action and unforgettable moments.",

        video: ""
    },


    {
        title: "Night City",

        year: "2026",

        genre: "Sci-Fi",

        rating: "8.4",

        duration: "1h 58m",

        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455",

        description:
        "A mysterious futuristic city hides a dangerous secret.",

        video: ""
    },


    {
        title: "The Journey",

        year: "2025",

        genre: "Drama",

        rating: "8.1",

        duration: "2h 05m",

        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7",

        description:
        "One journey that changes everything.",

        video: ""
    },


    {
        title: "Lost World",

        year: "2026",

        genre: "Adventure",

        rating: "8.6",

        duration: "2h 20m",

        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e",

        description:
        "Discover a world nobody knew existed.",

        video: ""
    },


    {
        title: "Dark Moon",

        year: "2025",

        genre: "Sci-Fi",

        rating: "8.3",

        duration: "2h 01m",

        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",

        description:
        "Humanity faces an unknown threat from deep space.",

        video: ""
    },


    {
        title: "Ocean",

        year: "2026",

        genre: "Adventure",

        rating: "8.0",

        duration: "1h 45m",

        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",

        description:
        "A beautiful journey across the endless ocean.",

        video: ""
    },


    {
        title: "Dark House",

        year: "2026",

        genre: "Horror",

        rating: "7.9",

        duration: "1h 52m",

        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",

        description:
        "Something is waiting inside the old abandoned house.",

        video: ""
    }

];


/* ================= GET MOVIE ================= */

function getMovie(title) {

    return movies.find(
        movie =>
            movie.title === title
    );

}


/* ================= URL MOVIE ================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const movieTitle =
    params.get("movie");


/* ================= PAGE ================= */

const page =
    document.getElementById(
        "moviePage"
    );


/* ================= CREATE PAGE ================= */

function createMoviePage(movie) {

    page.innerHTML = `

        <section
            class="movie-page"
        >

            <section
                class="movie-hero"
                style="
                    background-image:
                    url('${movie.image}');
                "
            >

                <div
                    class="movie-details"
                >

                    <div
                        class="movie-badges"
                    >

                        <span
                            class="movie-badge red"
                        >
                            ${movie.quality}
                        </span>

                        <span
                            class="movie-badge"
                        >
                            ${movie.genre}
                        </span>

                    </div>


                    <h1>
                        ${movie.title}
                    </h1>


                    <p
                        class="movie-meta"
                    >

                        ${movie.year}

                        • ${movie.duration}

                        • ${movie.genre}

                        •

                        <span
                            class="movie-rating"
                        >
                            ⭐ ${movie.rating}
                        </span>

                    </p>


                    <p
                        class="movie-description"
                    >
                        ${movie.description}
                    </p>


                    <div
                        class="movie-actions"
                    >

                        <button
                            class="watch-button"
                            id="playButton"
                        >
                            ▶ Watch Now
                        </button>


                        <button
                            class="list-button"
                            id="listButton"
                        >
                            ＋ My List
                        </button>

                    </div>

                </div>

            </section>



            <section
                class="movie-player-section"
            >

                <h2>
                    ▶ Watch
                </h2>


                <div
                    class="video-wrapper"
                >

                    <video
                        id="movieVideo"
                        controls
                        playsinline
                        poster="${movie.image}"
                    >

                        <source
                            id="videoSource"
                            src="${movie.video}"
                            type="video/mp4"
                        >

                        Your browser does not
                        support video.

                    </video>

                </div>

            </section>



            <section
                class="movie-info"
            >

                <h2>
                    Movie Information
                </h2>


                <br>


                <div
                    class="info-grid"
                >

                    <div class="info-box">

                        <span>
                            Release
                        </span>

                        <strong>
                            ${movie.year}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Genre
                        </span>

                        <strong>
                            ${movie.genre}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Rating
                        </span>

                        <strong>
                            ⭐ ${movie.rating}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Duration
                        </span>

                        <strong>
                            ${movie.duration}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>
                            Quality
                        </span>

                        <strong>
                            ${movie.quality}
                        </strong>

                    </div>

                </div>

            </section>



            <section
                class="related"
            >

                <h2>
                    More Like This
                </h2>


                <div
                    class="related-grid"
                    id="relatedMovies"
                >
                </div>

            </section>

        </section>

    `;


    setupButtons(movie);

    loadRelated(movie);

}


/* ================= BUTTONS ================= */

function setupButtons(movie) {

    const playButton =
        document.getElementById(
            "playButton"
        );


    playButton.addEventListener(
        "click",
        function() {

            const video =
                document.getElementById(
                    "movieVideo"
                );


            if (!movie.video) {

                alert(
                    "এই movie-এর video এখনো যোগ করা হয়নি।"
                );

                return;

            }


            video.play();

        }
    );


    const listButton =
        document.getElementById(
            "listButton"
        );


    listButton.addEventListener(
        "click",
        function() {

            let list =
                JSON.parse(
                    localStorage.getItem(
                        "vibeflix_mylist"
                    )
                ) || [];


            if (
                list.includes(
                    movie.title
                )
            ) {

                list =
                    list.filter(
                        item =>
                            item !==
                            movie.title
                    );

                listButton.innerText =
                    "＋ My List";

            } else {

                list.push(
                    movie.title
                );

                listButton.innerText =
                    "✓ In My List";

            }


            localStorage.setItem(
                "vibeflix_mylist",
                JSON.stringify(list)
            );

        }
    );

}


/* ================= RELATED ================= */

function loadRelated(currentMovie) {

    const container =
        document.getElementById(
            "relatedMovies"
        );


    const related =
        movies
            .filter(
                movie =>
                    movie.title !==
                    currentMovie.title
            )
            .filter(
                movie =>
                    movie.genre ===
                    currentMovie.genre
            );


    const finalList =
        related.length
            ? related
            : movies.filter(
                movie =>
                    movie.title !==
                    currentMovie.title
            );


    container.innerHTML =
        finalList
            .slice(0,4)
            .map(movie => `

                <div
                    class="related-card"
                    onclick="
                        window.location.href =
                        'movie.html?movie=' +
                        encodeURIComponent(
                            '${movie.title}'
                        )
                    "
                >

                    <img
                        src="${movie.image}"
                        alt="${movie.title}"
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

            `)
            .join("");

}


/* ================= ERROR ================= */

if (!movieTitle) {

    page.innerHTML = `

        <section
            class="movie-loading"
        >

            <h2>
                Movie not selected
            </h2>

            <p>
                Please select a movie
                from the home page.
            </p>

            <br>

            <a
                href="index.html"
                class="watch-button"
            >
                ← Go Home
            </a>

        </section>

    `;

} else {

    const movie =
        getMovie(movieTitle);


    if (!movie) {

        page.innerHTML = `

            <section
                class="movie-loading"
            >

                <h2>
                    Movie not found
                </h2>

                <br>

                <a
                    href="index.html"
                    class="watch-button"
                >
                    ← Go Home
                </a>

            </section>

        `;

    } else {

        createMoviePage(movie);

    }

}
