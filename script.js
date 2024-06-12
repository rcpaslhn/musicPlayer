const music =document.querySelector("audio")
const playBtn =document.getElementById("play")
const prevBtn =document.getElementById("prev")
const nextBtn =document.getElementById("next")
const img=document.querySelector("img")
const title =document.getElementById("title")
const creater =document.getElementById("creater")
const progressDiv =document.getElementById("progressDiv")
const progress =document.getElementById("progress")
const currentTimeDisplay =document.getElementById("currentTime")

const totalTime =document.getElementById("totalTime")
console.log(currentTime )



let songIndex =0

//!Müzik Çalma ve Durdurma

let isPlaying=false


function playSong(){
    isPlaying=true
    music.play()
}

function pauseSong(){
    isPlaying=false
    music.pause()
}


playBtn.addEventListener("click",()=>{
if(!isPlaying){
    playSong()
    playBtn.classList.replace("fa-play","fa-pause")
}else{
 pauseSong()
 playBtn.classList.replace("fa-pause","fa-play")
}
})

//!İleri ve Geri tuşuna bastıkça müziği değiştirme



//Müzik tanımlıyoruz

const songs =[{
    name:"bootstrap",
    title:"bootstrap 5 Eğitimi",
    creater:"Can Boz"

},{
    name:"c",
    title:"C Programlama Eğitimi",
    creater:"Can Boz"

}
]

function loadSong(song) {
   title.textContent=song.title
   creater.textContent=song.creater
   music.src=`mp3 çalar içerik/${song.name}.mp3`
   img.src=`/mp3 çalar içerik/${song.name}.png`
    
  }
  
  loadSong(songs[songIndex])


  prevBtn.addEventListener("click",()=>{
    
        songIndex--; 
        if(songIndex<0){
            songIndex=songs.length-1
        }
        loadSong(songs[songIndex]);
        playSong()
        console.log(songIndex)
        
    

  })

  nextBtn.addEventListener("click",()=>{
    
        songIndex++
        if(songIndex>songs.length-1){
            songIndex=0
        }
        loadSong(songs[songIndex])
        playSong()
        console.log(songIndex)

      

  })



//!progressbarın dakikaya göre ilerlemesi

music.addEventListener("timeupdate",(e)=>{
    if(isPlaying){
        
        const {currentTime,duration} =e.target
        const progressPercent =(currentTime/duration)*100
        progress.style.width=`${progressPercent}%`

        const durationMinute =Math.floor(duration/60)
        let durationSecond =Math.floor(duration%60)

        if(durationSecond<10){
            durationSecond="0" + durationSecond}
            if(durationSecond){

                totalTime.textContent=`${durationMinute}:${durationSecond}`
            }
        


            const currentMinute =Math.floor(currentTime/60)
            let currentSecond =Math.floor(currentTime%60)
    
            
            if(currentSecond<10){
                currentSecond="0" + currentSecond}
                console.log(currentSecond)
                console.log(currentMinute)

         currentTimeDisplay.textContent=`${currentMinute}:${currentSecond}`
                
            

    }

})

//!tıkladığın yerden müziğin başlaması

function setProgressBar(e) {
    
    const width =e.srcElement.clientWidth
    console.log(width)

    const {duration}=music

    const clickx =e.offsetX

  

    music.currentTime=(clickx/width)*duration

  }

progressDiv.addEventListener("click",setProgressBar)


//!Müzik Bittiğinde bir sonrakine geçmesi

music.addEventListener("ended",()=>{
    songIndex++
    if(songIndex>songs.length-1){
        songIndex=0
    }
    loadSong(songs[songIndex])
    playSong()
    console.log(songIndex)
})

