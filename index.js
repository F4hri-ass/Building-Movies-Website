const API_KEY = "edc4fa6541106aaa5f08b4b4f5f3bfc5";

let page = 1;
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`


async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const { title, poster_path, overview, popularity, vote_average } = movie
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")
        

        movieCard.innerHTML = `
        <img src="${API_IMAGE_URL + poster_path}" alt="html the movie maieges" />
        <div class="detail">
            <div class="megatitle">
                <div class="title">
                    <h3>${title}</h3>
            </div>
            </div> 
            <div class= "overview">
            <p>${overview.substring(0, 200)}...</p>
            </div>
            <div class="popularity">
            <h4>Popularity: ${popularity}</h4>
            <h4>Vote Average: ${vote_average}</h4>
            </div>
        </div>
        `

        movieCard.addEventListener("click", () => {
            openModal(movie);
        });

        moviesElement.appendChild(movieCard)
    })
}

function nextPage(){
    if (page >= 1) {
        page += 1;
    }
    updatePage()
}

function previousPage() {
    if(page > 1) {
        page -= 1;
    }
    updatePage()
}

function updatePage() {
    currentPage.innerHTML = page
    getMovies(API_URL())
}

next.addEventListener("click", () => {
    nextPage()
})

prev.addEventListener("click", () => {
    previousPage()
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery= search.value

    if(searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value= ""
    }
})

title.addEventListener("click", () => {
    location.reload()
})

updatePage()


const movieModal = document.getElementById("movieModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.querySelector(".close");

function openModal(movie) {
    modalDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${API_IMAGE_URL + movie.poster_path}" alt="${movie.title}" width="200px"/>
        <p>${movie.overview}</p>
        <h4>Popularity: ${movie.popularity}</h4>
        <h4>Vote Average: ${movie.vote_average}</h4>
    `;
    movieModal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    movieModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === movieModal) {
        movieModal.style.display = "none";
    }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});
