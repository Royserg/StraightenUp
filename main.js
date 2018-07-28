const increaseBtn = document.querySelector('.timer__up');
const decreaseBtn = document.querySelector('.timer__down');
const counter = document.querySelector('.timer__count');
const startBtn = document.querySelector('#timerStart');

increaseBtn.addEventListener('click', () => updateCounter(15), false);
decreaseBtn.addEventListener('click', () => updateCounter(-15), false);

function updateCounter(value) {
  let currentCounter = Number(counter.innerHTML);
  if (value < 0 && currentCounter === 15) {
    // terminate function when trying to decrease below 0
    return
  }
  counter.innerHTML = (currentCounter + value);
}


startBtn.onclick = startTimer;


function startTimer() {
  // Notification Options
  const options = {
    type: "image",
    title: "Straighten Up Your Back",
    message: "Fix you posture!",
    iconUrl: "assets/icon_128.png",
    imageUrl: "assets/notification_img.png"
  }

  chrome.notifications.create(options);
}



