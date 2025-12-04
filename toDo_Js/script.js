let tasks = [];
let nextId = 1;

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
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
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
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
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
