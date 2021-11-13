import { renderTasks } from './display.js';
import { pubsub } from './pubsub.js';
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
  pubsub.publish('taskAdded', activeProject.tasks);
}

export { addTask };