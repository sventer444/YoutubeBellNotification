
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

function getSubButton() {
    // search by class
    const notifBellClass = document.getElementsByClassName("style-scope ytd-subscribe-button-renderer");

    return (notifBellClass.length > 0) ? notifBellClass[0] : null;
}

let subButton = getSubButton()
if (subButton != null){
    console.log(subButton)
}
else {
    console.log('didnt find the sub button')
}

let theBell = getNotificationBell();
if (theBell != null){
    //add listeners to the other options instead
    theBell.addEventListener("click", bashBell);
    console.log('added bell listener')
}
else {
    console.log('didnt find any bells to ring')
}

function bashBell(){
    console.log('posting bell ring notification')
    window.postMessage({
        "source": "YOUTUBE_BELL_NOTIF",
        "action": "RING_THE_BELL"
    });

}


