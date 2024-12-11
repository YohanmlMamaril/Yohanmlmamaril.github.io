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

// Task list to display (initial tasks with deadlines)
let tasks = [
  { description: "Task 1: Study Math", deadline: "12/15, 14:30" },
  { description: "Task 2: Complete Homework", deadline: "12/12, 09:00" },
  { description: "Task 3: Take a Break", deadline: "12/10, 16:00" },
];

function drawClockNumbers() {
  const numberRadius = radius + 20; // Place numbers slightly outside the clock circle
  const numberFont = '16px Comic Sans MS'; // Font style for numbers
  ctx.font = numberFont;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#333'; // Number color

  for (let num = 1; num <= 12; num++) {
    const angle = (num - 3) * (Math.PI / 6); // Angle for each number
    const x = center.x + numberRadius * Math.cos(angle); // X-coordinate
    const y = center.y + numberRadius * Math.sin(angle); // Y-coordinate
    ctx.fillText(num, x, y); // Draw the number
  }
}

// Function to draw the clock hands
function drawClockHands() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Hour hand (24-hour format)
  const hourAngle = ((hours % 12) + minutes / 60) * (Math.PI / 6);
  const hourX = center.x + (radius - 40) * Math.cos(hourAngle);
  const hourY = center.y + (radius - 40) * Math.sin(hourAngle);
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(hourX, hourY);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#333';
  ctx.stroke();

  // Minute hand
  const minuteAngle = (minutes + seconds / 60) * (Math.PI / 30);
  const minuteX = center.x + (radius - 20) * Math.cos(minuteAngle);
  const minuteY = center.y + (radius - 20) * Math.sin(minuteAngle);
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(minuteX, minuteY);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#333';
  ctx.stroke();

  // Second hand
  const secondAngle = seconds * (Math.PI / 30);
  const secondX = center.x + (radius - 10) * Math.cos(secondAngle);
  const secondY = center.y + (radius - 10) * Math.sin(secondAngle);
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(secondX, secondY);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ff0000';
  ctx.stroke();
}

// Function to draw tasks on the clock at their respective times
function drawTasksOnClock() {
  tasks.forEach(task => {
    const taskTime = task.deadline.split(', ');
    const date = new Date(`2024-${taskTime[0]}`); // Set a static year (since year is removed)
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const taskAngle = ((hours % 12) + minutes / 60 - 3) * (Math.PI / 6); // Normalize for clock face
    const taskX = center.x + (radius - 40) * Math.cos(taskAngle);
    const taskY = center.y + (radius - 40) * Math.sin(taskAngle);

    // Draw the task description on the clock
    ctx.fillStyle = '#333';
    ctx.font = '16px Comic Sans MS';
    ctx.fillText(task.description, taskX - 30, taskY + 10);
  });
}

// Function to update the clock
function updateClock() {
  ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear the canvas
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI); // Draw clock border
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#333';
  ctx.stroke();

  drawClockNumbers();
  drawClockHands();
  drawTasksOnClock();
}

// Call the updateClock function every second
setInterval(updateClock, 1000);

// Handle adding new tasks
const addTaskButton = document.getElementById('addTaskButton');
const newTaskInput = document.getElementById('newTaskInput');
const taskDeadlineInput = document.getElementById('taskDeadline');
const taskTimeInput = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addNewTask() {
  const newTask = newTaskInput.value.trim();
  const deadlineDate = taskDeadlineInput.value.trim();
  const deadlineTime = taskTimeInput.value.trim();

  if (newTask && deadlineDate && deadlineTime) {
    // Format deadline as "MM/DD, HH:MM"
    const formattedDeadline = `${deadlineDate.slice(5)}/${deadlineDate.slice(8)}, ${deadlineTime}`;
    tasks.push({ description: newTask, deadline: formattedDeadline });
    newTaskInput.value = ''; // Clear the task input field
    taskDeadlineInput.value = ''; // Clear the date input field
    taskTimeInput.value = ''; // Clear the time input field
    updateTaskList();
  }
}

// Function to update the task list display
function updateTaskList() {
  taskList.innerHTML = ''; // Clear current task list
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" id="taskCheckbox${index}" class="taskCheckbox" data-index="${index}">
        <label for="taskCheckbox${index}"></label>
      </div>
      ${task.description} <span class="deadline">Deadline: ${task.deadline}</span>
    `;
    taskList.appendChild(li);

    // Add event listener to each checkbox
    const checkbox = document.getElementById(`taskCheckbox${index}`);
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        deleteTask(index);
      }
    });
  });
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the array
  updateTaskList(); // Re-render the task list
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', addNewTask);

// Optional: Allow pressing "Enter" to add the task
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addNewTask();
  }
});

// Initialize the task list
updateTaskList();

function drawTasksOnClock() {
  const taskRadius = radius - 55; // Position tasks slightly inside the clock face
  const taskFont = '10px Comic Sans MS'; // Task font
  const taskBoxWidth = 100; // Width of task background box
  const taskBoxHeight = 30; // Height of task background box

  tasks.forEach((task, index) => {
    const taskParts = task.deadline.split(', '); // Split the "MM/DD, HH:MM" format
    if (taskParts.length < 2) return; // Skip invalid formats

    const [hours, minutes] = taskParts[1].split(':').map(Number); // Extract hours and minutes
    const taskAngle = ((hours % 12) + minutes / 60 - 3) * (Math.PI / 6); // Angle for time on the clock
    const taskX = center.x + taskRadius * Math.cos(taskAngle); // Position based on angle
    const taskY = center.y + taskRadius * Math.sin(taskAngle);

    // Draw task background (rectangle highlight)
    const rectX = taskX - taskBoxWidth / 2; // Center the rectangle horizontally
    const rectY = taskY - taskBoxHeight / 2; // Center the rectangle vertically
    ctx.fillStyle = '#f9c5d5'; // Soft pink for highlight
    ctx.fillRect(rectX, rectY, taskBoxWidth, taskBoxHeight);

    // Draw task description text
    ctx.fillStyle = '#333'; // Text color
    ctx.font = taskFont;
    ctx.textAlign = 'center'; // Center text horizontally
    ctx.textBaseline = 'middle'; // Center text vertically
    ctx.fillText(task.description, taskX, taskY);
  });
}