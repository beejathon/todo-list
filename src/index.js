import './style.css';
import { addProject } from './projects.js';
import { addTask } from './tasks.js';
import { saveLocal, restoreLocal } from './storage.js'

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function init() {
  if (!localStorage.getItem('template')) {
    addProject('template project');
    addTask('make a todo list', today);
    addTask('finish tasks', tomorrow);
    saveLocal();
  }
  restoreLocal();
}

init();
