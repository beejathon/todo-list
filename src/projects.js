import { renderProjects, renderTasks } from './display.js';
import { pubsub } from './pubsub.js';
import { allProjects, saveLocal } from './storage.js';

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
  pubsub.publish('projectAdded', allProjects);
  console.log(allProjects);
}

function openActiveProject() {
  let activeProject = allProjects.filter(project => project.active);
  return activeProject[0];
}

function switchActiveProject(e) {
  e.preventDefault();
  resetActiveProjects();
  const index = findProject(e.target.id);
  allProjects[index].active = true;
  renderProjects();
  renderTasks();
}

function resetActiveProjects() {
  allProjects.forEach(project => project.active = false);
}

function findProject(title) {
  for (const project of allProjects) {
    if (project.title === title) return allProjects.indexOf(project);
  }
}

export { addProject, openActiveProject, switchActiveProject };
