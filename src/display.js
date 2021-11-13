import { allProjects } from './storage.js';
import { addProject, openActiveProject, removeProject, switchActiveProject } from './projects.js';
import { addTask } from './tasks.js';

function renderProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';
  allProjects.forEach(project => {
    const projectNode = document.createElement('div');
    projectNode.setAttribute('id', project.title);
    const projectTitle = document.createElement('div');
    projectTitle.textContent = project.title;
    const delBtn = document.createElement('button');
    delBtn.setAttribute('id', project.title);
    delBtn.classList.add('delProject')
    delBtn.innerHTML = '&times;';
    projectNode.appendChild(projectTitle);
    projectNode.appendChild(delBtn);
    projectList.appendChild(projectNode);
    projectNode.addEventListener('click', switchActiveProject);
    delBtn.addEventListener('click', removeProject);
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
