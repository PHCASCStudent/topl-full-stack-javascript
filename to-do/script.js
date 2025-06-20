// --- Todo Factory ---
function Todo({
  title,
  description,
  dueDate,
  priority,
  notes,
  completed = false,
  id = crypto.randomUUID(),
}) {
  return { title, description, dueDate, priority, notes, completed, id };
}

// --- Project Factory ---
function Project(name, todos = [], id = crypto.randomUUID()) {
  return { name, todos, id };
}

// --- Storage Module ---
const Storage = (() => {
  const save = (projects) => {
    localStorage.setItem("todo-projects", JSON.stringify(projects));
  };
  const load = () => {
    const data = localStorage.getItem("todo-projects");
    if (!data) return null;
    const arr = JSON.parse(data);
    // Restore methods if needed (not needed for plain objects)
    return arr;
  };
  return { save, load };
})();

// --- App Logic Module ---
const App = (() => {
  let projects = Storage.load() || [Project("Default")];
  let currentProjectId = projects[0].id;

  function getCurrentProject() {
    return projects.find((p) => p.id === currentProjectId);
  }

  function addProject(name) {
    const project = Project(name);
    projects.push(project);
    Storage.save(projects);
    return project;
  }

  function setCurrentProject(id) {
    currentProjectId = id;
    Storage.save(projects);
  }

  function addTodoToCurrent(todoData) {
    const todo = Todo(todoData);
    getCurrentProject().todos.push(todo);
    Storage.save(projects);
    return todo;
  }

  function updateTodo(todoId, updates) {
    const todo = getCurrentProject().todos.find((t) => t.id === todoId);
    if (todo) Object.assign(todo, updates);
    Storage.save(projects);
  }

  function deleteTodo(todoId) {
    const proj = getCurrentProject();
    proj.todos = proj.todos.filter((t) => t.id !== todoId);
    Storage.save(projects);
  }

  function deleteProject(id) {
    projects = projects.filter((p) => p.id !== id);
    if (!projects.length) projects = [Project("Default")];
    currentProjectId = projects[0].id;
    Storage.save(projects);
  }

  function getProjects() {
    return projects;
  }

  return {
    getProjects,
    getCurrentProject,
    addProject,
    setCurrentProject,
    addTodoToCurrent,
    updateTodo,
    deleteTodo,
    deleteProject,
  };
})();

// --- DOM Module ---
const DOM = (() => {
  const projectList = document.getElementById("project-list");
  const todoList = document.getElementById("todo-list");
  const projectForm = document.getElementById("project-form");
  const projectNameInput = document.getElementById("project-name");
  const currentProjectTitle = document.getElementById("current-project");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const todoModal = new bootstrap.Modal(document.getElementById("todoModal"));
  const todoForm = document.getElementById("todo-form");
  let editingTodoId = null;

  function renderProjects() {
    projectList.innerHTML = "";
    App.getProjects().forEach((proj) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item list-group-item-action" +
        (proj.id === App.getCurrentProject().id ? " active" : "");
      li.textContent = proj.name;
      li.onclick = () => {
        App.setCurrentProject(proj.id);
        render();
      };
      // Add delete button except for Default
      if (proj.name !== "Default") {
        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-sm btn-danger float-end";
        delBtn.textContent = "×";
        delBtn.onclick = (e) => {
          e.stopPropagation();
          App.deleteProject(proj.id);
          render();
        };
        li.appendChild(delBtn);
      }
      projectList.appendChild(li);
    });
  }

  function renderTodos() {
    todoList.innerHTML = "";
    const proj = App.getCurrentProject();
    currentProjectTitle.textContent = proj.name + " Todos";
    proj.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className =
        `list-group-item mb-2 priority-${todo.priority}` +
        (todo.completed ? " completed" : "");
      li.innerHTML = `
        <div>
          <strong>${todo.title}</strong> <span class="badge bg-secondary">${
        todo.dueDate
      }</span>
        </div>
        <div>
          <button class="btn btn-sm btn-info me-1" data-action="expand">Expand</button>
          <button class="btn btn-sm btn-success me-1" data-action="complete">${
            todo.completed ? "Undo" : "Complete"
          }</button>
          <button class="btn btn-sm btn-danger" data-action="delete">Delete</button>
        </div>
      `;
      // Button actions
      li.querySelector('[data-action="expand"]').onclick = () =>
        showTodoModal(todo);
      li.querySelector('[data-action="complete"]').onclick = () => {
        App.updateTodo(todo.id, { completed: !todo.completed });
        renderTodos();
      };
      li.querySelector('[data-action="delete"]').onclick = () => {
        App.deleteTodo(todo.id);
        renderTodos();
      };
      todoList.appendChild(li);
    });
  }

  function showTodoModal(todo = null) {
    editingTodoId = todo ? todo.id : null;
    todoForm.reset();
    todoModal.show();
    if (todo) {
      document.getElementById("todo-title").value = todo.title;
      document.getElementById("todo-desc").value = todo.description;
      document.getElementById("todo-due").value = todo.dueDate;
      document.getElementById("todo-priority").value = todo.priority;
      document.getElementById("todo-notes").value = todo.notes;
    }
  }

  // Event Listeners
  projectForm.onsubmit = (e) => {
    e.preventDefault();
    App.addProject(projectNameInput.value.trim());
    projectNameInput.value = "";
    renderProjects();
  };
  addTodoBtn.onclick = () => showTodoModal();
  todoForm.onsubmit = (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById("todo-title").value.trim(),
      description: document.getElementById("todo-desc").value.trim(),
      dueDate: document.getElementById("todo-due").value,
      priority: document.getElementById("todo-priority").value,
      notes: document.getElementById("todo-notes").value.trim(),
    };
    if (editingTodoId) {
      App.updateTodo(editingTodoId, data);
    } else {
      App.addTodoToCurrent(data);
    }
    todoModal.hide();
    renderTodos();
  };

  function render() {
    renderProjects();
    renderTodos();
  }

  // Initial render
  render();

  return { render };
})();
