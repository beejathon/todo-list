import './style.css';
import { load } from './storage.js';
import { renderProjects, renderTasks, loadHandlers } from './display.js';

function init() {
  load();
}

init();
