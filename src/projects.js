import { renderProjects, renderTasks } from './display.js';
import { allProjects, saveLocal } from './storage.js';
import { clearTasks } from './tasks.js';

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.active = true;
  }
}

function addProject(title) {
  const newProject = new Project(title);
  newProject.active = true;
  allProjects.push(newProject);
  saveLocal();
  renderProjects();
}

function openActiveProject() {
  let activeProject = allProjects.filter(project => project.active);
  return activeProject[0];
}

function switchActiveProject(e) {
  e.preventDefault();
  resetActiveProject();
  const index = findProject(this.id);
  allProjects[index].active = true;
  renderProjects();
  renderTasks();
}

function removeProject(e) {
  e.stopPropagation();
  e.preventDefault();
  const index = findProject(this.id);
  if (allProjects[index].active = true) {
    allProjects.splice(index, 1);
    resetActiveProject();
    renderProjects();
    clearTasks();
  } else {
    allProjects.splice(index, 1);
    renderProjects();
    renderTasks();
  }
  saveLocal();
}

function resetActiveProject() {
  allProjects.forEach(project => project.active = false);
}

function findProject(title) {
  for (const project of allProjects) {
    if (project.title === title) return allProjects.indexOf(project);
  }
}

export { addProject, openActiveProject, switchActiveProject, removeProject };
