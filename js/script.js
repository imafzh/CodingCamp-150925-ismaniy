const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");

let todos = [];

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  let filteredTodos = todos;
  if (filter === "done") {
    filteredTodos = todos.filter(todo => todo.status === "Done");
  } else if (filter === "pending") {
    filteredTodos = todos.filter(todo => todo.status === "Pending");
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        <select data-index="${index}" class="status-select">
          <option value="Pending" ${todo.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Done" ${todo.status === "Done" ? "selected" : ""}>Done</option>
        </select>
      </td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;

    todoList.appendChild(row);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.getAttribute("data-index");
      todos.splice(index, 1);
      renderTodos(filter);
    });
  });

  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", e => {
      const index = e.target.getAttribute("data-index");
      todos[index].status = e.target.value;
    });
  });
}

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Please enter a task and date!");
    return;
  }

  todos.push({ task, date, status: "Pending" });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos();
});

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

filterBtn.addEventListener("click", () => {
  const filter = prompt("Enter filter: all / done / pending");
  if (["all", "done", "pending"].includes(filter)) {
    renderTodos(filter);
  } else {
    alert("Invalid filter");
  }
});

renderTodos();
