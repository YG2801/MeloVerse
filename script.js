import { songArray, artistArray } from "./data.js"
import { shuffleArray, getHtmlForMainSectionSongs, getHtmlForSideSectionSongs, getHtmlForArtists, getMinutes, getSeconds, setBlueTheme, setGreenTheme, setYellowTheme, setPurpleTheme } from "./utility.js";

const music = new Audio();
music.volume = 0.75;
let currSongId;

const downloadBtn = document.getElementById("download-btn");
const rootEl = document.querySelector(":root");

function renderIntitials() {
    shuffleArray(songArray);
    const htmlStringForMainSectionSongs = getHtmlForMainSectionSongs(songArray);
    document.querySelector(".popular-songs-cards ul").innerHTML = htmlStringForMainSectionSongs;

    shuffleArray(songArray);
    const htmlStringForSideSectionSongs = getHtmlForSideSectionSongs(songArray);
    document.querySelector(".side-bar-song-list ul").innerHTML = htmlStringForSideSectionSongs;

    const htmlStringForArtists = getHtmlForArtists(artistArray);
    document.querySelector(".popular-artists-cards ul").innerHTML = htmlStringForArtists;
    
    setPurpleTheme(rootEl);
}

renderIntitials();
const sideSongArr = document.querySelectorAll(".side-bar-song-list ul li i")

function setInitialMusic() {
    currSongId = songArray[0].id;
    renderSongInfo(currSongId);
    music.src = `Assets/Audios/${currSongId}.mp3`;
    Array.from(sideSongArr)[0].parentElement.style.background = "rgb(105,105,170,0.2)";
}
setInitialMusic();

const playPauseBtn = document.getElementById("play-pause-btn");
const prevTrackBtn = document.getElementById("previous-track-btn");
const nextTrackBtn = document.getElementById("next-track-btn");
const modeBtn = document.getElementById("mode-btn");
const waveBoxArray = document.getElementsByClassName("wave-rect");

function playMusic() {
    music.play();
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    for (let box of waveBoxArray) {
        box.classList.add("wave-animate");
    }
}

function pauseMusic() {
    music.pause();
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
    for (let box of waveBoxArray) {
        box.classList.remove("wave-animate");
    }
}

function renderSongInfo(songId) {
    let songDetails = songArray.filter((el) => {
        return el.id == songId;
    })
    // songDetails[0]
    document.querySelector(".player-section img").src = songDetails[0].poster;
    document.querySelector(".player-section .song-title").textContent = songDetails[0].title;
    document.querySelector(".player-section .song-artist").textContent = songDetails[0].artist;
    downloadBtn.setAttribute('download', songDetails[0].title);
    downloadBtn.href = `Assets/Audios/${songId}.mp3`;
}

function removeBackground() {
    const sideLi = document.querySelectorAll(".side-bar-song-list ul li");
    for (let li of sideLi) {
        li.style.background = "";
    }
    const mainSongLi = document.querySelectorAll(".popular-songs-cards ul li");
    for (let li of mainSongLi) {
        li.style.background = "";
    }
}

function playNextTrack() {
    let songIndex = songArray.findIndex((el) => {
        return el.id == currSongId;
    })
    if (songIndex == songArray.length - 1) {
        songIndex = -1;
    }
    currSongId = songArray[songIndex + 1].id;
    music.src = `Assets/Audios/${currSongId}.mp3`;
    playMusic();
    renderSongInfo(currSongId);
    removeBackground();
    sideSongArr.forEach((i) => {
        if (i.id == currSongId) {
            i.parentElement.style.background = "rgb(105, 105, 170, 0.2)";
        }
    })
}

function playPrevTrack() {
    let songIndex = songArray.findIndex((el) => {
        return el.id == currSongId;
    })
    if (songIndex == 0) {
        songIndex = songArray.length;
    }
    currSongId = songArray[songIndex - 1].id;
    music.src = `Assets/Audios/${currSongId}.mp3`;
    playMusic();
    renderSongInfo(currSongId);
    removeBackground();
    sideSongArr.forEach((i) => {
        if (i.id == currSongId) {
            i.parentElement.style.background = "rgb(105, 105, 170, 0.2)";
        }
    })
}

function playRandom() {
    let songIndex = Math.floor(Math.random() * (songArray.length));
    while (currSongId == songArray[songIndex].id) {
        songIndex = Math.floor(Math.random() * (songArray.length));
    }
    currSongId = songArray[songIndex].id;
    music.src = `Assets/Audios/${currSongId}.mp3`;
    playMusic();
    renderSongInfo(currSongId);
    removeBackground()
    sideSongArr.forEach((i) => {
        if (i.id == currSongId) {
            i.parentElement.style.background = "rgb(105, 105, 170, 0.2)";
        }
    })
}

function nextTrackDecision(mode) {
    if (mode == "next") {
        playNextTrack();
    }
    else if (mode == "repeat") {
        playMusic();
    }
    else {
        playRandom();
    }
}

playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
        playMusic();
    }
    else {
        pauseMusic();
    }
})

prevTrackBtn.addEventListener("click", playPrevTrack)

nextTrackBtn.addEventListener("click", playNextTrack)

modeBtn.addEventListener("click", (e) => {
    const mode = e.target.dataset.mode;
    if (mode == "next") {
        modeBtn.classList.remove('fa-music');
        modeBtn.classList.add('fa-repeat');
        e.target.dataset.mode = "repeat";
    }
    else if (mode == "repeat") {
        modeBtn.classList.remove('fa-repeat');
        modeBtn.classList.add('fa-shuffle');
        e.target.dataset.mode = "shuffle";
    }
    else {
        modeBtn.classList.remove('fa-shuffle');
        modeBtn.classList.add('fa-music');
        e.target.dataset.mode = "next";
    }
})


const songPlayBtns = document.getElementsByClassName("song-play-btn");

for (let btn of songPlayBtns) {
    btn.addEventListener("click", (e) => {
        currSongId = e.target.id;
        music.src = `Assets/Audios/${currSongId}.mp3`;
        playMusic();
        renderSongInfo(currSongId);
        removeBackground();
        e.target.parentElement.style.background = "rgb(105, 105, 170, 0.2)";
    })
}


const timeElapsedEl = document.getElementById("time-elapsed");
const totalTimeEl = document.getElementById("total-time");
const primaryProgressBarEl = document.getElementById("primary-progress-bar");
const secondaryProgressBarEl = document.getElementById("secondary-progress-bar");
const secondaryProgressThumbEl = document.getElementById("secondary-progress-thumb");

const volIcon = document.getElementById("vol-icon");
const primaryVolumeBarEl = document.getElementById('primary-volume-bar');
const secondaryVolumeBarEl = document.getElementById('secondary-volume-bar');
const secondaryVolumeThumbEl = document.getElementById('secondary-volume-thumb');

music.addEventListener("timeupdate", () => {
    const duration = music.duration;
    const currTime = music.currentTime;
    const minutesTotal = getMinutes(duration);
    let secondsTotal = getSeconds(duration);
    if (secondsTotal < 10) {
        secondsTotal = `0${secondsTotal}`;
    }
    totalTimeEl.textContent = `${minutesTotal}:${secondsTotal}`;

    const minutesCurr = getMinutes(currTime);
    let secondsCurr = getSeconds(currTime);
    if (secondsCurr < 10) {
        secondsCurr = `0${secondsCurr}`;
    }
    timeElapsedEl.textContent = `${minutesCurr}:${secondsCurr}`;

    if (currTime === duration) {
        nextTrackDecision(modeBtn.dataset.mode);
    }

    const PercentProgress = parseInt((currTime / duration) * 100)
    primaryProgressBarEl.value = PercentProgress;
    secondaryProgressBarEl.style.width = `${PercentProgress}%`;
    secondaryProgressThumbEl.style.left = `${PercentProgress}%`;

})

primaryProgressBarEl.addEventListener("change", () => {
    music.currentTime = (primaryProgressBarEl.value * music.duration) / 100;
})

function modifyVolumeSlider(currVolume) {
    primaryVolumeBarEl.value = currVolume * 100;
    secondaryVolumeBarEl.style.width = `${currVolume * 100}%`
    secondaryVolumeThumbEl.style.left = `${currVolume * 100}%`;
}

primaryVolumeBarEl.addEventListener("change", () => {
    music.volume = primaryVolumeBarEl.value / 100;
    const currVolume = music.volume;
    modifyVolumeSlider(currVolume);
    if (currVolume == 0.0) {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.add("fa-volume-xmark");
    }
    else if (currVolume < 0.4) {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.add("fa-volume-off");
    }
    else if (currVolume < 0.75) {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.add("fa-volume-low");
    }
    else {
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.add("fa-volume-high");
    }

})

volIcon.addEventListener("click", () => {
    if (music.volume != 0.0) {
        music.volume = 0;
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.add("fa-volume-xmark");
    }
    else {
        music.volume = 0.75;
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.remove("fa-volume-off");
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.add("fa-volume-high");
    }
    modifyVolumeSlider(music.volume);
})

primaryVolumeBarEl.addEventListener("change", () => {

})

// Scrolling Popular songs cards
document.getElementById("pop-song-scroll-right").addEventListener("click", () => {
    document.querySelector(".popular-songs-cards ul").scrollLeft += 300;
})
document.getElementById("pop-song-scroll-left").addEventListener("click", () => {
    document.querySelector(".popular-songs-cards ul").scrollLeft -= 300;
})

// Scrolling Popular artists cards
document.getElementById("pop-artist-scroll-right").addEventListener("click", () => {
    document.querySelector(".popular-artists-cards ul").scrollLeft += 300;
})
document.getElementById("pop-artist-scroll-left").addEventListener("click", () => {
    document.querySelector(".popular-artists-cards ul").scrollLeft -= 300;
})

const searchResultContainerEl = document.getElementById("search-results-container");
const searchInputEl = document.querySelector(".search input");


searchInputEl.addEventListener("keyup", () => {
    const inputVal = searchInputEl.value;
    if (inputVal == "") {
        searchResultContainerEl.style.display = "none";
        searchResultContainerEl.innerHTML = "";
    }
    else {
        let htmlForSearch = ``;
        songArray.forEach((song) => {
            const { title, poster, album, id } = song;
            if (title.toUpperCase().indexOf(inputVal.toUpperCase()) > -1) {
                htmlForSearch += `
                <li class="search-result-card">
                <img src=${poster} alt="">
                <div>
                <p class="song-title" id=${id}>${title}</p>
                <p class="song-album">${album}</p>
                </div>
                </li>
                `
            }
        })
        searchResultContainerEl.innerHTML = htmlForSearch;
        searchResultContainerEl.style.display = "";
        Array.from(document.querySelectorAll(".search .search-results-container .search-result-card .song-title")).forEach((el) => {
            el.addEventListener("click", (e) => {
                searchInputEl.value = "";
                searchResultContainerEl.style.display = "none";
                currSongId = e.target.id;
                console.log(currSongId);
                music.src = `Assets/Audios/${currSongId}.mp3`;
                playMusic();
                renderSongInfo(currSongId);
                removeBackground();
                sideSongArr.forEach((i) => {
                    if (i.id == currSongId) {
                            i.parentElement.style.background = "rgb(105, 105, 170, 0.2)";
                        }
                })
            })
        })
    }
})

document.addEventListener("click", (e)=>{
    searchResultContainerEl.style.display = "none";
    searchResultContainerEl.innerHTML = "";
    searchInputEl.value = "";
})

const changeThemeBtnEl = document.getElementById("change-theme-btn");
changeThemeBtnEl.addEventListener("click", (e)=>{
    const theme = e.target.dataset.theme;
    if(theme == "purple"){
        setBlueTheme(rootEl);
        e.target.dataset.theme = "blue";
    }
    else if(theme == "blue"){
        setGreenTheme(rootEl);
        e.target.dataset.theme = "green";
    }
    else if(theme == "green"){
        setYellowTheme(rootEl);
        e.target.dataset.theme = "yellow";
    }
    else{
        setPurpleTheme(rootEl);
        e.target.dataset.theme = "purple";
    }
})