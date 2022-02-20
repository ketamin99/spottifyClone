const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const imageItem = $('.img__items')
const playlistName = $('.header>p')
const singerName = $('.song-info>h4')
const songName = $('.song-info>h3')
const audio = $('#audio')
const playBtn = $('.btn__toggle-play')
const rangeProgress = $('#myRange')
const totalTime = $('.total__time')
const currentTime = $('.current__time')
const nextBtn = $('.btn__next')
const prevBtn = $('.btn__prev')
const randomBtn = $('.btn__random')
const repeatBtn = $('.btn__share')
const loveBtn = $('.btn__love')
const angleDownBtn =$('.btn__angle-down')
const dashboard = $('.dashboard')
const subSongInfo = $('.now-Playing-bar')
const playlist = $('.playlist')
const sub_SongInfo = $('.playlist__song--info')
const subSongName = $('.holder>h4')
const subSongSinger= $('.holder>h4:nth-child(2)')
const runningText = $('marquee')
const subLoveBtn = $('.sub__btn--love')
const sub_ToggleBtn = $('.playlist__songs--toggleBtn')
const playlistSongList = $('.playlist__songs--list')
const subPlayBtn = $('.sub__toggleBtn')


const app = {
    currentIndex: 0,
    isPlaying:false,
    isRandom: false,
    isRepeat:false,
    isReact: false,
    songs: [
        {
            name: 'GANG GANG',
            singer: 'JACKBOYS, Sheck Wes, Don Toliver, Luxury Tax 50 & Cactus Jack ',
            path: './assets/nhac/song1.mp3',
            image: './assets/images/download.jpg',
            playlist: 'On Repeat'
        },
        {
            name: 'GATTI',
            singer: 'JACKBOYS, Pop Smoke, Travis Scott',
            path: './assets/nhac/song2.mp3',
            image: './assets/images/download.jpg',
            playlist: 'On Repeat'
        },
        {
            name: 'DIOR',
            singer: 'POP SMOKE',
            path: './assets/nhac/song3.mp3',
            image: './assets/images/download3.jpg',
            playlist: 'On Repeat'
        },
        {
            name: 'Chia Cách Bình Yên',
            singer: 'Bùi Anh Tuấn',
            path: './assets/nhac/song4.mp3',
            image: './assets/images/download4.jpg',
            playlist: 'On Repeat'
        },
        {
            name: 'Một Thủa Yêu Người',
            singer: 'Vicky Nhung',
            path: './assets/nhac/song5.mp3',
            image: './assets/images/download5.jpg',
            playlist: 'On Repeat'
        },
        {
            name: 'Ít Nhưng Dài Lâu Remix',
            singer: 'Đại Mèo',
            path: './assets/nhac/song6.mp3',
            image: './assets/images/download6.jpg',
            playlist:'Love Song'
        },
        {
            name: 'Chưa Bao Giờ',
            singer: 'Bùi Anh Tuấn',
            path: './assets/nhac/song7.mp3',
            image: './assets/images/download7.jpg',
            playlist:'Love Song'
        },
        {
            name: 'Chuyện Như Chưa Bắt Đầu',
            singer: 'Bùi Anh Tuấn',
            path: './assets/nhac/song8.mp3',
            image: './assets/images/download8.jpg',
            playlist:'Love Song'
        },
        {
            name: 'Nơi Tình Yêu Kết Thúc',
            singer: 'Bùi Anh Tuấn',
            path: './assets/nhac/song9.mp3',
            image: './assets/images/download9.jpg',
            playlist:'Love Song'
        },
    ],
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
    
        })

    },
    handleEvents: function(){
        const _this = this

        // Handle play button
        playBtn.onclick = function(){   
            if (_this.isPlaying === false) {
                audio.play()
            }else{
                audio.pause()
            }
        }

        audio.onplay = function(){
            playBtn.classList.add('playing')
            sub_ToggleBtn.classList.add('sub__playing')     
            _this.isPlaying = true
            _this.getTotalTime()
            subPlayBtn.classList.add('sub__playing')
            
        }
   
        audio.onpause = function(){
            playBtn.classList.remove('playing')
            _this.isPlaying = false
            sub_ToggleBtn.classList.remove('sub__playing')     
            subPlayBtn.classList.remove('sub__playing')
            
        }
        
        // Handle progress bar
        audio.ontimeupdate = function(){
            let newTime = Math.floor((audio.currentTime/audio.duration)*100)
            if (newTime) {
                rangeProgress.value = newTime
            }
            _this.getCurrentTime()
            _this.getTotalTime()
            
        }

        // Handle slide to seek song
        rangeProgress.onchange = function(){
            let newTime = ((rangeProgress.value*audio.duration)/100 )
            audio.currentTime = newTime
        }
        // Handle next button
        nextBtn.onclick = function(){
            if(_this.isRandom === false && _this.isRepeat === false){
                _this.nextSong()
                audio.play()
            }else if(_this.isRandom === true && _this.isRepeat === false){
                _this.randomSong()
                _this.loadCurrentSong()
                audio.play()
            }else if(_this.isRandom === false && _this.isRepeat === true){
                _this.nextSong()
                audio.play()
            }
        }
        // Handle previous button
        prevBtn.onclick = function(){
            _this.previousSong()
            audio.play()
        }
        // Handle random button
        randomBtn.onclick = function(){
            randomBtn.classList.toggle('active')
            if (_this.isRandom) {
                randomBtn.classList.remove('active')

                _this.isRandom = false
                
            }else{
                repeatBtn.classList.remove('active')
                randomBtn.classList.add('active')
                _this.isRandom = true

            }
            
        }
        // Hanle repeat button
        repeatBtn.onclick = function(){
            
            if (_this.isRepeat) {
                
                repeatBtn.classList.remove('active')
                _this.isRepeat = false

            }else{
                randomBtn.classList.remove('active')
                repeatBtn.classList.add('active')
                _this.isRepeat = true
            }
            
        }

        // Handle song when ended
        audio.onended = function(){
            if(_this.isRandom === false && _this.isRepeat === false){
                _this.currentIndex++
                _this.loadCurrentSong()
                audio.play()
            }else if(_this.isRandom === true && _this.isRepeat === false){
                _this.randomSong()
                _this.loadCurrentSong()
                audio.play()
            }else if(_this.isRandom === false && _this.isRepeat === true){
                _this.loadCurrentSong()
                audio.play()
            }
        }

        // Handle love reaction
        loveBtn.onclick = function(){
            if (_this.isReact === false) {
                loveBtn.classList.add('reacted')
                _this.isReact  = true
            }else{
                loveBtn.classList.remove('reacted')
                _this.isReact  = false
            }
        }
        // Handle angle down dash board
        angleDownBtn.onclick = function(){
            dashboard.style.opacity = 0
            playlist.style.display = "block"
            runningText.start()
            _this.loadSubCurrentSong()
            _this.renderPlaylist()
        }
        // Handle Sub Song Info
        sub_SongInfo.onclick = function(){
            dashboard.style.opacity = 1
            playlist.style.display = "none"
            runningText.stop()
            if (_this.isReact === true) {
                loveBtn.classList.add('reacted')
                _this.isReact  = true
            }else{
                loveBtn.classList.remove('reacted')
                _this.isReact  = false
            }
        }

        // Handle Sub toggle play button
        sub_ToggleBtn.onclick = function(){
            if (_this.isPlaying === false) {
                sub_ToggleBtn.classList.add('sub__playing')     
                _this.currentIndex = 0
                _this.loadCurrentSong()
                audio.play()
            }else if(_this.isPlaying === true){
                sub_ToggleBtn.classList.remove('sub__playing')     
                audio.pause()
            }   
        }
        // Handle sub reaction button
        subLoveBtn.onclick = function(){
            if (_this.isReact === false) {
                subLoveBtn.classList.add('reacted')
                _this.isReact  = true
            }else{
                subLoveBtn.classList.remove('reacted')
                _this.isReact  = false
            }
        }

        subPlayBtn.onclick = function(){
            if (_this.isPlaying === true) {
                subPlayBtn.classList.remove('sub__playing')
                _this.isPlaying === false
                audio.pause()
            }else{
                subPlayBtn.classList.add('sub__playing')
                _this.isPlaying === true
                audio.play()
            }
        }

        window.onscroll = function(){
            if (window.scrollY >= 250) {
                sub_ToggleBtn.classList.add('stop')

            }else{
                sub_ToggleBtn.classList.remove('stop')

            }
            
        }
        
        playlistSongList.onclick = function(e){
            const songNum = e.target.closest('.playlist__songs--items').dataset.index
            _this.currentIndex = songNum
            _this.loadCurrentSong()
            _this.loadSubCurrentSong()
            audio.play()
        }
    },
    
    renderPlaylist: function(){
        
        let htmls = this.songs.map((song,index) => {
            return `<div class="playlist__songs--items" data-index="${index}">
                        <span class="playlist__songs--OrdinalNum">${index+1}</span>

                        <div class="playlist__songs--items-info">
                            <div class="playlist__songs--items-name">
                                ${song.name}
                            </div>

                            <div class="playlist__songs--items-singer">
                                ${song.singer}
                            </div>
                        </div>
                        <audio class=""></audio>
                    </div>`
        })
        playlistSongList.innerHTML = htmls.join('')

    },
    loadCurrentSong: function(){
        imageItem.style.backgroundImage = `url(${this.currentSong.image})`
        playlistName.innerText = this.currentSong.playlist
        singerName.innerText = this.currentSong.singer
        songName.innerText = this.currentSong.name
        audio.src = this.currentSong.path
     
    },
    loadSubCurrentSong: function(){
        subSongSinger.innerText = this.currentSong.singer 
        subSongName.innerText = this.currentSong.name + "  •"
        if (this.isPlaying === true) {
            subPlayBtn.classList.add('sub__playing')
        }else{
            subPlayBtn.classList.remove('sub__playing')
        }
        if (this.isReact === true) {
            subLoveBtn.classList.add('reacted')
        }else{
            subLoveBtn.classList.remove('reacted')

        }
        
      
    },
    
    getTotalTime: function(){  
        if (audio.duration) {
            let minutes = Math.floor(audio.duration / 60)
            let seconds = Math.floor((audio.duration % 60))
            totalTime.innerText = minutes + ':' + seconds
        }else{
            totalTime.innerText = '0:00'
        }
        
        
    },
    getCurrentTime: function(){
        if (audio.currentTime) {
            let minutes = Math.floor((audio.currentTime)/60)
            let secondInDozen = Math.floor((audio.currentTime % 60) /10)
            let secondInUnits = Math.floor((audio.currentTime % 60) % 10)
            currentTime.innerText = minutes + ':' + secondInDozen + secondInUnits
            
        }else{
            currentTime.innerText = '0:00'

        }
    },
    nextSong: function(){
        if (this.currentIndex === this.songs.length - 1) {
            this.currentIndex = 0
        }else{
            this.currentIndex++
        }
        this.loadCurrentSong()
    },
    previousSong: function(){
        if (this.currentIndex === 0) {
            this.currentIndex = this.songs.length - 1
        }else{
            this.currentIndex--
        }
        this.loadCurrentSong()
    },
    randomSong: function(){ 
        let newIndex 
        do{
            newIndex = Math.floor(Math.random()* this.songs.length) 
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex

    },
    

    
    // Start App function
    
    start:function(){
        

        this.defineProperties()

        this.loadCurrentSong()
        
        this.handleEvents()

        this.getTotalTime()


    },

}


app.start()
