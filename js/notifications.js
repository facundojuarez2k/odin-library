/**
 * Creates a notification at the top of the page
 * @param {*} text Text to show in the notification
 * @param {*} timeout Time in seconds the notification will be displayed. Min: 0, Max: 25
 */
function appendNotification(text, timeout=5) {
    const body = document.querySelector("body");
    const firstChild = body.firstChild;

    const notification = document.createElement("div");
    notification.classList.add("top-notification");
    notification.innerText = text;
    
    if(firstChild) {
        body.insertBefore(notification, firstChild);
    } else { 
        body.appendChild(notification);
    }

    timeout = (timeout <= 0 || timeout > 25) ? 5 : timeout;

    setTimeout(function() {
        if(body) {
            body.removeChild(notification);
        }
    }, timeout*1000);
}