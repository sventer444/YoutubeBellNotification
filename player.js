

function ringTheBell() {
    console.log("BING BONG")
    var bellSound = new Audio("./music/Taco-Bell-Bong-SFX.mp3")
    bellSound.play()
}

window.addEventListener("message", function(event) {
    if (event.source != window || !event.data.source && event.data.source != "YOUTUBE_BELL_NOTIF") {
        return;
    }

    if (event.data.action && event.data.action == "RING_THE_BELL") {
        ringTheBell();
    }
}, false);
