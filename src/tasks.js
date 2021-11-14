import { renderTasks } from './display.js';
import { openActiveProject } from './projects.js';
import { saveLocal } from './storage.js';

class Task {
  constructor(title, due) {
    this.title = title;
    this.due = due;
  }
  edit(field, value) {
    this[field] = value;
  }
}

function addTask(title, due) {
  const newTask = new Task(title, due);
  const activeProject = openActiveProject();
  activeProject.tasks.push(newTask);
  saveLocal();
  renderTasks();
}

function removeTask(e) {
  e.stopPropagation();
  e.preventDefault();
  const index = findTask(this.id);
  const activeProject = openActiveProject();
  activeProject.tasks.splice(index, 1)
  saveLocal();
  renderTasks();
}

function editTask(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log(this.id)
}

function findTask(title) {
  const activeProject = openActiveProject();
  for (const task of activeProject.tasks) {
    if (task.title === title) return activeProject.tasks.indexOf(task);
  }
}

function clearTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = `
  <h1>DO SOMETHING WILL YA... EXCEPT ADD A TASK. DON'T DO THAT</h1>
  `;
}

export { addTask, removeTask, editTask, findTask, clearTasks };