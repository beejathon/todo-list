import { renderProjects, renderTasks } from './display';

let allProjects = [];

function saveLocal() {
  localStorage.setItem('projects', JSON.stringify(allProjects));
}

function restoreLocal() {
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects');
  } else {
    allProjects = JSON.parse(localStorage.getItem('projects'));
    renderProjects();
    renderTasks();
  }
}

export { allProjects, saveLocal, restoreLocal };