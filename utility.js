function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getHtmlForMainSectionSongs(songArray){
    return songArray.map((song)=>{
        const {id, title, album, poster} = song;
        return `
            <li>
                <img src=${poster} alt="">
                <div>
                    <p class="song-title">${title}</p>
                    <p class="song-album">${album}</p>
                </div>
                <i class="fa-solid fa-circle-play song-play-btn" id=${id}></i>
            </li>
        `
    }).join("");
}

function getHtmlForSideSectionSongs(songArray){
    let count = 1;
    return songArray.map((song)=>{
        const {id, title, artist, poster} = song;
        let countStr = ``;
        if(count < 10)  countStr = `0${count}`;
        else    countStr = count
        count++;
        return `
            <li>
                <span class="song-number">${countStr}</span>
                <img src=${poster} alt="">
                <div>
                    <p class="song-title">${title}</p>
                    <p class="song-artist">${artist}</p>
                </div>
                <i class="fa-solid fa-circle-play song-play-btn" id=${id}></i>
            </li>
        `
    }).join("");
}

function getHtmlForArtists(artistArray){
    return artistArray.map((artist)=>{
        return `
            <li>
                <img src=${artist.poster} alt="">
            </li>
        `
    }).join("");
}

function getMinutes(val){
    return Math.floor(val/60);
}

function getSeconds(val){
    return Math.floor(val)%60;
}

function setPurpleTheme(r){
    r.style.setProperty("--main-bg-color", "#160124");
    r.style.setProperty("--main-bg-lighter-color", "#290641");
    r.style.setProperty("--main-bg-lightest-color", "#2e034b");
    r.style.setProperty("--light-shade-color", "#D283FF");
    r.style.setProperty("--lighter-shade-color", "#DC97FF");
    r.style.setProperty("--player-section-bg-color", "#10021a");
}

function setBlueTheme(r){
    r.style.setProperty("--main-bg-color", "#010220");
    r.style.setProperty("--main-bg-lighter-color", "#090947");
    r.style.setProperty("--main-bg-lightest-color", "#101267");
    r.style.setProperty("--light-shade-color", "#4782ca");
    r.style.setProperty("--lighter-shade-color", "#67a5e8");
    r.style.setProperty("--player-section-bg-color", "#030418");
}

function setGreenTheme(r){
    r.style.setProperty("--main-bg-color", "#041506");
    r.style.setProperty("--main-bg-lighter-color", "#083307");
    r.style.setProperty("--main-bg-lightest-color", "#084410");
    r.style.setProperty("--light-shade-color", "#46b136");
    r.style.setProperty("--lighter-shade-color", "#62cb52");
    r.style.setProperty("--player-section-bg-color", "#030f04");
}

function setYellowTheme(r){
    r.style.setProperty("--main-bg-color", "#141004");
    r.style.setProperty("--main-bg-lighter-color", "#3d350a");
    r.style.setProperty("--main-bg-lightest-color", "#7d7019");
    r.style.setProperty("--light-shade-color", "#bdb53c");
    r.style.setProperty("--lighter-shade-color", "#c1cb52");
    r.style.setProperty("--player-section-bg-color", "#0f0f03");
}

export {shuffleArray, 
        getHtmlForMainSectionSongs, 
        getHtmlForSideSectionSongs,
        getHtmlForArtists,
        getMinutes,
        getSeconds,
        setBlueTheme,
        setGreenTheme,
        setYellowTheme,
        setPurpleTheme};