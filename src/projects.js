import { renderProjects, renderTasks } from './display.js';
import { allProjects, saveLocal } from './storage.js';

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.active = true;
  }
}

function addProject(title) {
  resetActiveProject();
  const newProject = new Project(title);
  newProject.active = true;
  allProjects.push(newProject);
  saveLocal();
  renderProjects();
  renderTasks();
}

function openActiveProject() {
  let activeProject = allProjects.filter(project => project.active);
  return activeProject[0];
}

function switchActiveProject(e) {
  e.stopPropagation();
  e.preventDefault();
  resetActiveProject();
  const index = findProject(this.id);
  allProjects[index].active = true;
  saveLocal();
  renderProjects();
  renderTasks();
}

function removeProject(e) {
  e.stopPropagation();
  e.preventDefault();
  const index = findProject(this.id);
  if (allProjects.length === 1 && allProjects[index].active) {
    allProjects.splice(0, allProjects.length);
    renderProjects();
    renderTasks();
  } else if (allProjects[index].active) {
    allProjects.splice(index, 1);
    resetActiveProject();
    renderProjects();
    setDefaultActiveProject();
    renderTasks();
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

function setDefaultActiveProject() {
  allProjects[0].active = true;
}

function findProject(title) {
  for (const project of allProjects) {
    if (project.title === title) return allProjects.indexOf(project);
  }
}

export { addProject, openActiveProject, switchActiveProject, removeProject };
