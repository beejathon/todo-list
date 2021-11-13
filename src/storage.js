import { renderProjects, renderTasks } from "./display";
import { addProject } from "./projects";
import { addTask } from "./tasks";

let allProjects = [];

function load() {
  if (!localStorage.getItem('saved')) {
    addProject('template project');
    addTask('make a todo list', 'now');
    addTask('finish tasks', 'later');
    renderTasks();
  } else {
    restoreLocal();
  }
}

function saveLocal() {
  localStorage.setItem('projects', JSON.stringify(allProjects));
}

function restoreLocal() {
  allProjects = JSON.parse(localStorage.getItem('projects'));
  renderProjects();
  renderTasks();
}

export { allProjects, load, saveLocal, restoreLocal };