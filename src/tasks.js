import { renderTasks } from './display.js';
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

function clearTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
}

export { addTask, clearTasks };