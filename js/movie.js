/* =========================
   VibeFlix Movie System
   ========================= */

const movies = [

    {
        title: "The Last Adventure",
        year: "2026",
        genre: "Action",
        rating: "8.7",
        duration: "2h 14m",
        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",

        description:
        "A thrilling cinematic adventure full of mystery, action and unforgettable moments.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "Night City",
        year: "2026",
        genre: "Sci-Fi",
        rating: "8.4",
        duration: "1h 58m",
        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",

        description:
        "A mysterious futuristic city hides a dangerous secret.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "The Journey",
        year: "2025",
        genre: "Drama",
        rating: "8.1",
        duration: "2h 05m",
        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",

        description:
        "One journey that changes everything.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "Lost World",
        year: "2026",
        genre: "Adventure",
        rating: "8.6",
        duration: "2h 20m",
        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",

        description:
        "Discover a world nobody knew existed.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "Dark Moon",
        year: "2025",
        genre: "Sci-Fi",
        rating: "8.3",
        duration: "2h 01m",
        quality: "4K",

        image:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80",

        description:
        "Humanity faces an unknown threat from deep space.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "Ocean",
        year: "2026",
        genre: "Adventure",
        rating: "8.0",
        duration: "1h 45m",
        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",

        description:
        "A beautiful journey across the endless ocean.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },


    {
        title: "Dark House",
        year: "2026",
        genre: "Horror",
        rating: "7.9",
        duration: "1h 52m",
        quality: "HD",

        image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",

        description:
        "Something is waiting inside the old abandoned house.",

        video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    }

];


/* =========================
   GET MOVIE
   ========================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const movieTitle =
    params.get("movie");

const page =
    document.getElementById(
        "moviePage"
    );


/* =========================
   FIND MOVIE
   ========================= */

function findMovie(title) {

    return movies.find(
        function(movie) {

            return movie.title === title;

        }
    );

}


/* =========================
   ERROR
   ========================= */

function showError(title, text) {

    page.innerHTML = `

        <section class="movie-loading">

            <h2>${title}</h2>

            <p>${text}</p>

            <br>

            <a
                href="index.html"
                class="watch-button"
            >
                ← Go Home
            </a>

        </section>

    `;

}


/* =========================
   CREATE MOVIE PAGE
   ========================= */

function createMoviePage(movie) {

    page.innerHTML = `

        <section class="movie-page">


            <!-- HERO -->

            <section
                class="movie-hero"
                style="
                    background-image:
                    url('${movie.image}');
                "
            >

                <div class="movie-details">


                    <div class="movie-badges">

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


                    <p class="movie-meta">

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


                    <div class="movie-actions">


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



            <!-- VIDEO PLAYER -->

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
                        preload="metadata"
                        poster="${movie.image}"
                    >

                        <source
                            src="${movie.video}"
                            type="video/mp4"
                        >

                        Your browser does not
                        support video.

                    </video>

                </div>


                <p
                    id="videoMessage"
                    style="
                        text-align:center;
                        color:#777;
                        margin-top:15px;
                    "
                >
                    Test video ready.
                </p>

            </section>



            <!-- MOVIE INFORMATION -->

            <section class="movie-info">

                <h2>
                    Movie Information
                </h2>


                <br>


                <div class="info-grid">


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



            <!-- RELATED MOVIES -->

            <section class="related">

                <h2>
                    More Like This
                </h2>


                <div
                    class="related-grid"
                    id="relatedMovies"
                ></div>

            </section>


        </section>

    `;


    setupButtons(movie);

    loadRelatedMovies(movie);

}


/* =========================
   BUTTONS
   ========================= */

function setupButtons(movie) {

    const playButton =
        document.getElementById(
            "playButton"
        );


    const video =
        document.getElementById(
            "movieVideo"
        );


    const videoMessage =
        document.getElementById(
            "videoMessage"
        );


    /* WATCH NOW */

    playButton.addEventListener(
        "click",
        function() {

            video.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            video.play().catch(
                function() {

                    videoMessage.textContent =
                        "▶ নিচের Play button চাপুন।";

                }
            );

        }
    );


    /* MY LIST */

    const listButton =
        document.getElementById(
            "listButton"
        );


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

        listButton.textContent =
            "✓ In My List";

    }


    listButton.addEventListener(
        "click",
        function() {

            let currentList =
                JSON.parse(
                    localStorage.getItem(
                        "vibeflix_mylist"
                    )
                ) || [];


            if (
                currentList.includes(
                    movie.title
                )
            ) {

                currentList =
                    currentList.filter(
                        function(item) {

                            return item !==
                                movie.title;

                        }
                    );


                listButton.textContent =
                    "＋ My List";

            } else {

                currentList.push(
                    movie.title
                );


                listButton.textContent =
                    "✓ In My List";

            }


            localStorage.setItem(
                "vibeflix_mylist",
                JSON.stringify(
                    currentList
                )
            );

        }
    );

}


/* =========================
   RELATED MOVIES
   ========================= */

function loadRelatedMovies(
    currentMovie
) {

    const container =
        document.getElementById(
            "relatedMovies"
        );


    const relatedMovies =
        movies.filter(
            function(movie) {

                return movie.title !==
                    currentMovie.title;

            }
        );


    container.innerHTML =
        relatedMovies
            .slice(0, 4)
            .map(
                function(movie) {

                    return `

                        <div
                            class="related-card"
                            data-title="${movie.title}"
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
            )
            .join("");


    const cards =
        container.querySelectorAll(
            ".related-card"
        );


    cards.forEach(
        function(card) {

            card.addEventListener(
                "click",
                function() {

                    const title =
                        card.getAttribute(
                            "data-title"
                        );


                    window.location.href =
                        "movie.html?movie=" +
                        encodeURIComponent(
                            title
                        );

                }
            );

        }
    );

}


/* =========================
   START
   ========================= */

if (!page) {

    console.error(
        "VibeFlix: moviePage element not found."
    );

} else if (!movieTitle) {

    showError(
        "Movie not selected",
        "Home page থেকে একটি movie select করুন।"
    );

} else {

    const movie =
        findMovie(
            movieTitle
        );


    if (!movie) {

        showError(
            "Movie not found",
            "এই movie-টি পাওয়া যায়নি।"
        );

    } else {

        createMoviePage(
            movie
        );

    }

}
