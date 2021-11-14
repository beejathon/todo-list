import { allProjects } from './storage.js';
import { addProject, openActiveProject, removeProject, switchActiveProject } from './projects.js';
import { addTask, removeTask, editTask } from './tasks.js';

function createProjectNode(title) {
  const projectNode = document.createElement('div');
  projectNode.classList.add('project-node');
  projectNode.setAttribute('id', title);
  const projectTitle = document.createElement('div');
  projectTitle.textContent = title;
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', title);
  delBtn.classList.add('del-project')
  delBtn.innerHTML = '&times;';
  projectNode.appendChild(projectTitle);
  projectNode.appendChild(delBtn);
  return projectNode;
}

function renderProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';
  allProjects.forEach(project => {
    const projectNode = createProjectNode(project.title);
    projectList.appendChild(projectNode);
  })
  loadHandlers();
}

function createTaskNode(title, due) {
  const taskNode = document.createElement('div');
  taskNode.classList.add('task-node');
  taskNode.setAttribute('id', title);
  const taskTitle = document.createElement('div');
  taskTitle.textContent = title;
  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');
  dueDate.textContent = due;
  const editBtn = document.createElement('button');
  editBtn.setAttribute('id', title);
  editBtn.classList.add('edit-task');
  editBtn.innerHTML = 'edit';
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', title);
  delBtn.classList.add('del-task');
  delBtn.innerHTML = '&times;';
  taskNode.appendChild(taskTitle);
  taskNode.appendChild(dueDate);
  taskNode.appendChild(editBtn);
  taskNode.appendChild(delBtn);
  return taskNode;
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
    const taskNode = createTaskNode(task.title, task.due)
    taskList.appendChild(taskNode);
  });
  loadHandlers();
}

function loadHandlers() {
  const projectForm = document.getElementById('projectForm');
  projectForm.addEventListener('submit', projectFormHandler);
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', taskFormHandler);
  const projectNodes = document.querySelectorAll('.project-node');
  projectNodes.forEach(node => node.addEventListener('click', switchActiveProject));
  const delProjectBtns = document.querySelectorAll('.del-project');
  delProjectBtns.forEach(btn => btn.addEventListener('click', removeProject));
  const editTaskBtns = document.querySelectorAll('.edit-task');
  editTaskBtns.forEach(btn => btn.addEventListener('click', editTask));
  const delTaskBtns = document.querySelectorAll('.del-task');
  delTaskBtns.forEach(btn => btn.addEventListener('click', removeTask));
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
