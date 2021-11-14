import { renderProjects, renderTasks } from "./display";
import { addProject } from "./projects";
import { addTask } from "./tasks";

let allProjects = [];

function load() {
  if (!localStorage.getItem('template')) {
    addProject('template project');
    addTask('make a todo list', 'now');
    addTask('finish tasks', 'later');
    saveLocal();
  }
  restoreLocal();
}

function saveLocal() {
  localStorage.setItem('projects', JSON.stringify(allProjects));
}

function restoreLocal() {
  if (!localStorage.getItem('template')) {
    localStorage.setItem('template', true);
  } else {
    allProjects = JSON.parse(localStorage.getItem('projects'));
    renderProjects();
    renderTasks();
  }
}

export { allProjects, load, saveLocal, restoreLocal };