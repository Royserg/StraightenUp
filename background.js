var timerID;
const timerInterval = 1000 * 60 // 1 minute in miliseconds

// When Browser Opened run interval
chrome.storage.sync.get(['timer'], function(data) {
  if (data.timer) {
    runTimer(data.timer);
  }
})



function runTimer(time) {
  let intervalTime = timerInterval * time;
  // Notification Options
  const options = {
    type: "image",
    title: "Straighten Up Your Back",
    message: "Fix you posture!",
    iconUrl: "assets/icon48.png",
    imageUrl: "assets/notification_img.png"
  }

  timerID = setInterval(function showNotification() {
    chrome.notifications.create(options);
  }, intervalTime);

}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt, message.time);
  if (message.txt === 'start') {
    // start notification interval
    runTimer(message.time);
  }

  if (message.txt === 'stop') {
    clearInterval(timerID);
  }
}

