

let bellListener = {
    getPlayer() {
        const player = new Audio();
        player.autoplay = false;
        player.preload = true;
        //player.src = loadFile();
        return player;
    },
    init() {
        console.log('init successful')
        this.player = this.getPlayer();
        this.loadSound();
        //this.setPlayerVolume();
    },
    async setPlayerVolume(player = this.player) {
        player.volume = 1.0
    },
    async loadFile() {
        return await chrome.runtime.getURL("https://soundbuttons.net/embed/taco-bell-bong")//http://lezotre.free.fr/Mp3/disco.mp3
    },
    async loadSound() {
        if(this.player.src) {
            const oldURL = this.player.src;
            this.player.src = "";
            URL.revokeObjectURL(oldURL);
        }
            try {
                let url = await this.loadFile();
            }
            catch(error) {
                console.error("Could not load configured sound", error);
            }
        
        this.player.src = url;
    },
    makeSound() {
        console.log("BING BONG")
        //player.play()
    }
}

bellListener.init()


function ringTheBell(listener){
    
    listener.makeSound()
}

window.addEventListener("message", function(event) {
    if (event.source != window || !event.data.source && event.data.source != "YOUTUBE_BELL_NOTIF") {
        return;
    }

    if (event.data.action && event.data.action == "RING_THE_BELL") {
        console.log('hit ring the bell action')
        ringTheBell(bellListener)
    }
}, false);
