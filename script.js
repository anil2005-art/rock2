console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Innalekalil  Film Godha  Niranj Suresh  ", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Nee Himamazhayayi Song", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Neelakasham Pachakadal ", filePath: "3.mp3", coverPath: "3.jpeg"},
    {songName: "Oru Naal Ini Naam  Madhura Naranga  ", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Oru Vadakkan Selfie -Neelambalin", filePath: "5.mp3", coverPath: "5.jpeg"},
    {songName: "Ranam Title Track  You Made Me Feel   Prithviraj Sukumaran", filePath: "2.mp3", coverPath: "6.jpg"},
    {songName: "ULLASA GAYIKE   Adi Kapyare Koottamani  ", filePath: "2.mp3", coverPath: "7.jpg"},
    {songName: "Venmegham Video Song  2018  Tovino Thomas ", filePath: "2.mp3", coverPath: "8.jpg"},
    {songName: "Vijay Superum Pournamiyum  Song", filePath: "2.mp3", coverPath: "9.jpg"},
    {songName: "ഉയരൽ തട Uyiril Thodum - Kumbalangi Nights Official ", filePath: "4.mp3", coverPath: "10.jpg"},
]
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            // If the same song is playing, pause it
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Otherwise, play the selected song
            makeAllPlays(); // Reset other buttons
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});
let playButtons = document.querySelectorAll(".songItemPlay");

playButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Remove existing selection
        document.querySelectorAll(".songItem").forEach(item => {
            item.classList.remove("selected");
        });

        // Add glow to the parent songItem
        let songItem = e.target.closest(".songItem");
        songItem.classList.add("selected");
    });
});

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
audioElement.addEventListener('ended', () => {
    if(songIndex >= songs.length - 1){
        songIndex = 0; // loop back to first song
    } else {
        songIndex++;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    makeAllPlays(); // reset all play buttons
    let playingButton = document.getElementById(songIndex.toString());
    if (playingButton) {
        playingButton.classList.remove('fa-play-circle');
        playingButton.classList.add('fa-pause-circle');
    }
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})