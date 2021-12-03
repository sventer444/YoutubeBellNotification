
// inject player script
const script = document.createElement("script");
script.setAttribute("src", chrome.runtime.getURL("player.js"));
script.addEventListener("load", function() {
    this.remove();
});
(document.head || document.documentElement).appendChild(script);

function getNotificationBell() {

    // search by class
    const notifBellClass = document.getElementsByClassName("style-scope ytd-subscription-notification-toggle-button-renderer");

    return (notifBellClass.length > 0) ? notifBellClass[0] : null;
}

var theBell = this.getNotificationBell();
if (theBell != null){
    theBell.addEventListener("click", ringTheBell);
}

function ringTheBell(){
    let url = chrome.runtime.getUrl('Taco-Bell-Bong-SFX.mp3')
    console.log('audio at'+url)
    window.postMessage({
        "source": "YOUTUBE_BELL_NOTIF",
        "action": "RING_THE_BELL"
    });

}


