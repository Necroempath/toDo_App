let tasks = load();
let nextId = tasks.length + 1;

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskTableBody = document.querySelector("#taskTableBody");
const taskCounter = document.querySelector("#taskCounter");
const alertBox = document.querySelector('#alertBox');

function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.add('show');
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}

function formatDate(date) {
  const d = (date instanceof Date) ? date : new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function save() {
  tasksJson = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksJson)
}

function load() {
  const tasksJson = localStorage.getItem('tasks') || '[]';
  const loaded = JSON.parse(tasksJson);

  return loaded.map(task => ({
    ...task,
    creationDate: new Date(task.creationDate)
  }));
}

function addTask() {
  const title = taskInput.value.trim();

  if (title === "") {
    showAlert("Please enter a task title!");
    return;
  }

  const task = {
    id: nextId++,
    title: title,
    creationDate: new Date(),
  };

  tasks.push(task);
  taskInput.value = "";
  save();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  save();
  renderTasks();
}

function renderTasks() {
  taskTableBody.innerHTML = "";

  if (tasks.length === 0) {
    taskTableBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty-message">No tasks yet. Add one above!</td>
                    </tr>
                `;
  } else {
    tasks.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${task.id}</td>
                        <td>${task.title}</td>
                        <td>${formatDate(task.creationDate)}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteTask(${
                              task.id
                            })">Delete</button>
                        </td>
                    `;
      taskTableBody.appendChild(row);
    });
  }

  taskCounter.textContent = `Total tasks: ${tasks.length}`;
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
