const increaseBtn = document.querySelector('.timer__up');
const decreaseBtn = document.querySelector('.timer__down');
const counter = document.querySelector('.timer__count');
const startBtn = document.querySelector('#timerStart');

// Extension icon is clicked - lookup if timer running
chrome.storage.sync.get(['timer'], (data) => {
  if (data.timer) {
    // Change button to Stop
    startBtn.innerHTML = 'Stop';
    startBtn.classList.remove('button--green');
    startBtn.classList.add('button--red');
    startBtn.onclick = stopTimer;

    counter.innerHTML = data.timer;

    increaseBtn.style.display = 'none';
    decreaseBtn.style.display = 'none';
  }
});


increaseBtn.addEventListener('click', () => updateCounter(5), false);
decreaseBtn.addEventListener('click', () => updateCounter(-5), false);
startBtn.onclick = () => startTimer(counter.innerHTML);

function updateCounter(value) {
  let currentCounter = Number(counter.innerHTML);
  if (value < 0 && currentCounter === 5) {
    // terminate function when trying to decrease below 0
    return
  }
  counter.innerHTML = (currentCounter + value);
}

function startTimer(time) {
  // send time and start timer in the background;
  let msg = {
    txt: 'start',
    time: Number(time)
  }
  chrome.runtime.sendMessage(msg);

  chrome.storage.sync.set({timer: Number(time)}, () => {
    console.log('Set value in the storage')
  });

  window.close();
}

function stopTimer() {
  // Change button back and add arrows and txt
  startBtn.innerHTML = 'Start';
  startBtn.classList.remove('button--red');
  startBtn.classList.add('button--green');
  increaseBtn.style.display = 'block';
  decreaseBtn.style.display = 'block';

  // send msg to background script
  let msg = {
    txt: 'stop',
  }
  chrome.runtime.sendMessage(msg);

  // remove timer value from storage
  chrome.storage.sync.set({timer: ""}, () => {
    console.log('Remove value of timer')
  });

  startBtn.onclick = () => startTimer(counter.innerHTML);
}
