// Task Manager
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  const deadlineInput = document.getElementById('deadline-input');
  const taskList = document.getElementById('task-list');

  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <span>${taskInput.value} - ${deadlineInput.value || 'No Deadline'}</span>
    <button onclick="deleteTask(this)">X</button>
  `;
  taskList.appendChild(taskItem);

  taskInput.value = '';
  deadlineInput.value = '';
});

function deleteTask(button) {
  button.parentElement.remove();
}

// Timer
let timerInterval;
function startTimer() {
  const input = document.getElementById('timer-input');
  let time = parseInt(input.value, 10) || 0;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById('timer-display').textContent = new Date(time * 1000).toISOString().substr(14, 5);
    } else {
      clearInterval(timerInterval);
      alert('Timer finished!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer-display').textContent = '00:00';
}

// Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Alarm
let alarmTimeout;
function setAlarm() {
  const alarmInput = document.getElementById('alarm-input').value;
  const alarmTime = new Date();
  const [hours, minutes] = alarmInput.split(':');
  alarmTime.setHours(hours, minutes, 0);

  const delay = alarmTime.getTime() - Date.now();
  if (delay > 0) {
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(() => {
      alert('Alarm ringing!');
    }, delay);
    alert('Alarm set!');
  } else {
    alert('Invalid alarm time.');
  }
}

// Section Navigation
function showSection(sectionId) {
  document.querySelectorAll('main > section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}