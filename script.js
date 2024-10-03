let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize the event listeners
document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const taskText = todoInput.value;
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    updateLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

// Function to display tasks
function displayTasks() {
    todoList.innerHTML = ""; 
    let activeTaskCount = 0; // Variable to track uncompleted tasks
  
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("p");
  
      taskItem.innerHTML = `
        <div class="todo-container">
          <input type="checkbox" class="todo-checkbox" id="input-${index}" ${task.completed ? "checked" : ""}>
          <p id="task-${index}" class="${task.completed ? "disabled" : ""}" onclick="editTask(${index})">${task.text}</p>
        </div>
      `;
      
      taskItem.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
      todoList.appendChild(taskItem);
  
      // Only count tasks that are not completed
      if (!task.completed) {
        activeTaskCount++;
      }
    });
  
    // Update the count to reflect the number of uncompleted tasks
    todoCount.textContent = activeTaskCount;
  }

// Function to edit a task
function editTask(index) {
  const taskItem = document.getElementById(`task-${index}`);
  const inputField = document.createElement("input");
  
  inputField.value = tasks[index].text;
  taskItem.replaceWith(inputField);
  inputField.focus();

  inputField.addEventListener("blur", () => {
    const newText = inputField.value.trim();
    if (newText) {
      tasks[index].text = newText;
      updateLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    displayTasks();
  }

function deleteAllTasks() {
  tasks = [];
  updateLocalStorage();
  displayTasks();
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
