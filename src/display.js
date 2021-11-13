import { pubsub } from './pubsub.js';
import { allProjects } from './storage.js';
import { addProject, openActiveProject, switchActiveProject } from './projects.js';
import { addTask } from './tasks.js';

function renderProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';
  allProjects.forEach(project => {
    let div = document.createElement('div')
    div.textContent = project.title;
    div.setAttribute('id', project.title);
    projectList.appendChild(div);
    div.addEventListener('click', switchActiveProject);
  })
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  const activeProject = openActiveProject();
  const tasks = activeProject.tasks;
  const title = document.createElement('h2');
  title.textContent = activeProject.title;
  taskList.appendChild(title);
  tasks.forEach(task => {
    let div = document.createElement('div');
    div.textContent = task.title;
    div.setAttribute('id', task.title);
    taskList.appendChild(div);
  });
}

function loadHandlers() {
  const projectForm = document.getElementById('projectForm');
  projectForm.addEventListener('submit', projectFormHandler);
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', taskFormHandler);
}

function projectFormHandler(e) {
  e.preventDefault();
  const dataForm = new FormData(e.target);
  const title = dataForm.get('title')
  addProject(title);
  document.getElementById('projectForm').reset();
}

function taskFormHandler(e) {
  e.preventDefault();
  const dataForm = new FormData(e.target);
  addTask(dataForm.get('title'), dataForm.get('due'));
  document.getElementById('taskForm').reset();
}

export { renderProjects, renderTasks, loadHandlers };
