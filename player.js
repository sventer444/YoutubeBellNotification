

BellListener = {
    getPlayer() {
        const player = new Audio();
        player.autoplay = false;
        player.preload = true;
        return player;
    },
    init() {
        this.player = this.getPlayer();
        this.loadSound();
        this.setPlayerVolume();
    },
    async setPlayerVolume(player = this.player) {
        player.volume = 1.0
    },
    async loadFile() {
        return await chrome.runtime.getURL('Taco-Bell-Bong-SFX.mp3')//http://lezotre.free.fr/Mp3/disco.mp3
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
    async promisedPlay(player) {
        await player.play()
        .catch(console.error);
    },
    makeSound() {
        return this.promisedPlay(this.player);
    }
}

function ringTheBell(listener){
    console.log("BING BONG")
    listener.makeSound().catch(console.error)
}

BellListener.init()

window.addEventListener("message", function(event) {
    if (event.source != window || !event.data.source && event.data.source != "YOUTUBE_BELL_NOTIF") {
        return;
    }

    if (event.data.action && event.data.action == "RING_THE_BELL") {
        console.log('hit message')
        ringTheBell(BellListener)
    }
}, false);
