let videos = [
    {
        youTubeUrl: "https://www.youtube.com/watch?v=w_ljRNeemrA",
        title: "Next Exit | Peterbot Highlights #41",
        creator: "Peterbot",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=RqwiB2uAF3g",
        title: "I know Love❤️ | Verbex Highlights #5",
        creator: "Verbex",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=VRJ-PTSrE54",
        title: "The London | Highlights #3",
        creator: "Kapuzenlarry",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=EhsHb4tva34",
        title: "Dum, Dumb, and Dumber 🤪 | Fortnite highlights #20 | ft. Peterbot",
        creator: "eynifnr",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=a7Xfe-Z3lPE",
        title: "Locked out of Heaven🎺 | Memo highlights #1",
        creator: "Memo",
        rating: null,
    },
    {
        youTubeUrl: "https://www.youtube.com/watch?v=cUuM2yq9H48",
        title: "#1 Highlights 🔥",
        creator: "999cedi",
        rating: null,
    },
];

videos.sort(() => Math.random() - 0.5);
let currentVideoIndex = 0;
let selectedRating = 0;

const videoContainer = document.getElementById('videoContainer');
const ratingContainer = document.getElementById('ratingContainer');
const nextButton = document.getElementById('nextButton');
const rankingContainer = document.getElementById('rankingContainer');

// script.js (Änderung in der displayVideo Funktion)
function displayVideo() {
    videoContainer.innerHTML = "";
    ratingContainer.innerHTML = "";
    nextButton.style.display = "none";
    selectedRating = 0;

    if (currentVideoIndex >= videos.length) {
        displayRanking();
        return;
    }
    const video = videos[currentVideoIndex];
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `<h2>${video.title}</h2><p>von ${video.creator}</p>`;
    videoContainer.appendChild(infoDiv);

    const videoId = new URL(video.youTubeUrl).searchParams.get("v");

    // Erstelle einen Container für das responsive Video
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('video-wrapper');

    const iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/" + videoId + "?rel=0";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    //force 1080p
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");

    wrapperDiv.appendChild(iframe);
    videoContainer.appendChild(wrapperDiv);

    for (let i = 1; i <= 5; i++) {
        const starSpan = document.createElement('span');
        starSpan.textContent = "★";
        starSpan.classList.add('star');
        starSpan.dataset.value = i;
        starSpan.addEventListener('click', () => selectRating(i));
        ratingContainer.appendChild(starSpan);
    }
}

function selectRating(ratingValue) {
    // Prüfe, ob bereits volle Bewertung oder halbe Bewertung gesetzt ist und toggle
    if (selectedRating === ratingValue) {
        selectedRating = ratingValue - 0.5;
    } else if (selectedRating === ratingValue - 0.5) {
        selectedRating = ratingValue;
    } else {
        selectedRating = ratingValue;
    }
    updateStars();
    nextButton.style.display = "block";
}

function updateStars() {
    const stars = ratingContainer.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected', 'half');
        const starValue = parseInt(star.dataset.value);
        if (starValue <= Math.floor(selectedRating)) {
            star.classList.add('selected');
        } else if (starValue === Math.floor(selectedRating) + 1 && selectedRating % 1 !== 0) {
            star.classList.add('half');
        }
    });
}

nextButton.addEventListener('click', () => {
    videos[currentVideoIndex].rating = selectedRating;
    currentVideoIndex++;
    displayVideo();
});

function displayRanking() {
    videoContainer.innerHTML = "";
    ratingContainer.innerHTML = "";
    nextButton.style.display = "none";

    let sortedVideos = videos.slice().sort((a, b) => b.rating - a.rating);
    rankingContainer.innerHTML = "<h2>Ranking</h2>";
    const ul = document.createElement('ol');
    sortedVideos.forEach(video => {
        const li = document.createElement('li');
        li.innerHTML = `${video.title} - ${video.creator}: ${video.rating} Sterne`;
        ul.appendChild(li);
    });
    rankingContainer.appendChild(ul);
}

displayVideo();