// Get the canvas element and its context
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Clock parameters
const center = { x: canvasSize / 2, y: canvasSize / 2 };
const radius = 150;

// Task list
let tasks = loadTasksFromStorage(); // Load tasks from localStorage

// Functions to handle localStorage
function loadTasksFromStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Draw the clock numbers
function drawClockNumbers() {
  const numberRadius = radius + 20;
  ctx.font = '16px Comic Sans MS';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#333';

  for (let num = 1; num <= 12; num++) {
    const angle = (num - 3) * (Math.PI / 6);
    const x = center.x + numberRadius * Math.cos(angle);
    const y = center.y + numberRadius * Math.sin(angle);
    ctx.fillText(num, x, y);
  }
}

// Draw the clock hands
function drawClockHands() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Hour hand
  const hourAngle = ((hours % 12) + minutes / 60) * (Math.PI / 6);
  drawHand(hourAngle, radius - 40, 8, '#333');

  // Minute hand
  const minuteAngle = (minutes + seconds / 60) * (Math.PI / 30);
  drawHand(minuteAngle, radius - 20, 6, '#333');

  // Second hand
  const secondAngle = seconds * (Math.PI / 30);
  drawHand(secondAngle, radius - 10, 4, '#ff0000');
}

// Helper function to draw a hand
function drawHand(angle, length, width, color) {
  const x = center.x + length * Math.cos(angle);
  const y = center.y + length * Math.sin(angle);
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(x, y);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Draw tasks on the clock
function drawTasksOnClock() {
  const taskRadius = radius - 55;

  tasks.forEach((task) => {
    const [date, time] = task.deadline.split(', ');
    const [hours, minutes] = time.split(':').map(Number);

    const taskAngle = ((hours % 12) + minutes / 60 - 3) * (Math.PI / 6);
    const x = center.x + taskRadius * Math.cos(taskAngle);
    const y = center.y + taskRadius * Math.sin(taskAngle);

    ctx.fillStyle = '#f9c5d5';
    ctx.fillRect(x - 50, y - 15, 100, 30);

    ctx.fillStyle = '#333';
    ctx.font = '10px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(task.description, x, y);
  });
}

// Update the clock
function updateClock() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw clock border
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#333';
  ctx.stroke();

  drawClockNumbers();
  drawClockHands();
  drawTasksOnClock();
}

// Add a new task
function addNewTask() {
  const newTaskInput = document.getElementById('newTaskInput');
  const taskDeadlineInput = document.getElementById('taskDeadline');
  const taskTimeInput = document.getElementById('taskTime');

  const newTask = newTaskInput.value.trim();
  const deadlineDate = taskDeadlineInput.value.trim();
  const deadlineTime = taskTimeInput.value.trim();

  if (newTask && deadlineDate && deadlineTime) {
    const formattedDeadline = `${deadlineDate.slice(5)}/${deadlineDate.slice(8)}, ${deadlineTime}`;
    tasks.push({ description: newTask, deadline: formattedDeadline });
    saveTasksToStorage();
    displayTasks();
    updateClock();

    // Clear inputs
    newTaskInput.value = '';
    taskDeadlineInput.value = '';
    taskTimeInput.value = '';
  }
}

// Display tasks in the sidebar
function displayTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${task.description} (Deadline: ${task.deadline})`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.onclick = () => {
      tasks.splice(index, 1);
      saveTasksToStorage();
      displayTasks();
      updateClock();
    };

    li.appendChild(deleteButton);
    taskListElement.appendChild(li);
  });
}

// Initialize the clock and tasks
setInterval(updateClock, 1000);
document.getElementById('addTaskButton').addEventListener('click', addNewTask);
displayTasks();