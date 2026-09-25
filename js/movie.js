const movies = [
    {title:"The Last Adventure",year:"2026",genre:"Action",rating:"8.7",duration:"2h 14m",quality:"4K",image:"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",description:"A thrilling cinematic adventure full of mystery, action and unforgettable moments.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"Night City",year:"2026",genre:"Sci-Fi",rating:"8.4",duration:"1h 58m",quality:"4K",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80",description:"A mysterious futuristic city hides a dangerous secret.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"The Journey",year:"2025",genre:"Drama",rating:"8.1",duration:"2h 05m",quality:"HD",image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",description:"One journey that changes everything.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"Lost World",year:"2026",genre:"Adventure",rating:"8.6",duration:"2h 20m",quality:"4K",image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",description:"Discover a world nobody knew existed.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"Dark Moon",year:"2025",genre:"Sci-Fi",rating:"8.3",duration:"2h 01m",quality:"4K",image:"https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80",description:"Humanity faces an unknown threat from deep space.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"Ocean",year:"2026",genre:"Adventure",rating:"8.0",duration:"1h 45m",quality:"HD",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",description:"A beautiful journey across the endless ocean.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"},
    {title:"Dark House",year:"2026",genre:"Horror",rating:"7.9",duration:"1h 52m",quality:"HD",image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",description:"Something is waiting inside the old abandoned house.",video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"}
];

const params=new URLSearchParams(window.location.search);
const movieTitle=params.get("movie");
const page=document.getElementById("moviePage");

function findMovie(title){return movies.find(movie=>movie.title===title);}

function showError(title,text){
    page.innerHTML=`<section class="movie-loading"><h2>${title}</h2><p>${text}</p><br><a href="index.html" class="watch-button">← Go Home</a></section>`;
}

function createMoviePage(movie){
    page.innerHTML=`
    <section class="movie-page">
        <section class="movie-hero" style="background-image:url('${movie.image}')">
            <div class="movie-details">
                <div class="movie-badges">
                    <span class="movie-badge red">${movie.quality}</span>
                    <span class="movie-badge">${movie.genre}</span>
                </div>
                <h1>${movie.title}</h1>
                <p class="movie-meta">${movie.year} • ${movie.duration} • ${movie.genre} • <span class="movie-rating">⭐ ${movie.rating}</span></p>
                <p class="movie-description">${movie.description}</p>
                <div class="movie-actions">
                    <button class="watch-button" id="playButton">▶ Watch Now</button>
                    <button class="list-button" id="listButton">＋ My List</button>
                </div>
            </div>
        </section>

        <section class="movie-player-section" id="watchSection">
            <h2>▶ Watch</h2>
            <div class="video-wrapper">
                <video id="movieVideo" controls playsinline preload="metadata" poster="${movie.image}">
                    <source src="${movie.video}" type="video/mp4">
                    Your browser does not support video.
                </video>
            </div>
            <p id="videoMessage" style="text-align:center;color:#777;margin-top:15px">Test video ready.</p>
        </section>

        <section class="movie-info">
            <h2>Movie Information</h2>
            <div class="info-grid">
                <div class="info-box"><span>Release</span><strong>${movie.year}</strong></div>
                <div class="info-box"><span>Genre</span><strong>${movie.genre}</strong></div>
                <div class="info-box"><span>Rating</span><strong>⭐ ${movie.rating}</strong></div>
                <div class="info-box"><span>Duration</span><strong>${movie.duration}</strong></div>
                <div class="info-box"><span>Quality</span><strong>${movie.quality}</strong></div>
            </div>
        </section>

        <section class="related">
            <h2>More Like This</h2>
            <div class="related-grid" id="relatedMovies"></div>
        </section>
    </section>`;

    setupButtons(movie);
    loadRelatedMovies(movie);
}

function setupButtons(movie){
    const playButton=document.getElementById("playButton");
    const video=document.getElementById("movieVideo");
    const message=document.getElementById("videoMessage");

    playButton.addEventListener("click",()=>{
        document.getElementById("watchSection").scrollIntoView({behavior:"smooth",block:"center"});
        const result=video.play();
        if(result) result.catch(()=>{message.textContent="▶ Play button চাপুন ভিডিও চালানোর জন্য।";});
    });

    const listButton=document.getElementById("listButton");
    const storageKey="vibeflix_mylist";
    let list=JSON.parse(localStorage.getItem(storageKey)||"[]");
    updateListButton();

    listButton.addEventListener("click",()=>{
        list=JSON.parse(localStorage.getItem(storageKey)||"[]");
        const index=list.indexOf(movie.title);
        if(index>=0) list.splice(index,1); else list.push(movie.title);
        localStorage.setItem(storageKey,JSON.stringify(list));
        updateListButton();
    });

    function updateListButton(){
        const saved=list.includes(movie.title);
        listButton.textContent=saved?"✓ In My List":"＋ My List";
        listButton.setAttribute("aria-pressed",saved?"true":"false");
    }
}

function loadRelatedMovies(currentMovie){
    const container=document.getElementById("relatedMovies");
    const related=movies.filter(movie=>movie.title!==currentMovie.title).slice(0,4);
    container.innerHTML=related.map(movie=>`
        <div class="related-card" data-title="${movie.title}">
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <h3>${movie.title}</h3>
            <p>${movie.year} • ${movie.genre} • ⭐ ${movie.rating}</p>
        </div>`).join("");

    container.querySelectorAll(".related-card").forEach(card=>{
        card.addEventListener("click",()=>{
            window.location.href="movie.html?movie="+encodeURIComponent(card.dataset.title);
        });
    });
}

if(!page){
    console.error("VibeFlix: moviePage element not found.");
}else if(!movieTitle){
    showError("Movie not selected","Home page থেকে একটি movie select করুন।");
}else{
    const movie=findMovie(movieTitle);
    if(!movie) showError("Movie not found","এই movie-টি পাওয়া যায়নি।");
    else createMoviePage(movie);
}
