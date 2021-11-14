import { renderProjects, renderTasks } from './display.js';
import { openActiveProject } from './projects.js';
import { saveLocal } from './storage.js';

class Task {
  constructor(title, due) {
    this.title = title;
    this.due = due;
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
  renderTasks();
  saveLocal();
}

function findTask(title) {
  const activeProject = openActiveProject();
  for (const task in activeProject.tasks) {
    if (task.title === title) return activeProject.tasks.indexOf(task);
  }
}

function clearTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
}

export { addTask, removeTask, findTask, clearTasks };