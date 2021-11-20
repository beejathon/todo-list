import { allProjects } from './storage.js';
import { addProject, openActiveProject, removeProject, switchActiveProject } from './projects.js';
import { addTask, removeTask, editTask } from './tasks.js';
import { format, parseISO } from 'date-fns';

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
}

function createAddTaskForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'taskForm');
  form.classList.add('task-form')
  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('id', 'taskTitle');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'Enter task description');
  title.setAttribute('autocomplete', 'off');
  title.setAttribute('required', 'true');
  const date = document.createElement('input');
  date.setAttribute('type', 'date');
  date.setAttribute('id', 'taskDue');
  date.setAttribute('name', 'due');
  date.setAttribute('placeholder', 'Due Date');
  date.setAttribute('autcomplete', 'off');
  date.setAttribute('required', 'true');
  const addTaskBtn = document.createElement('button');
  addTaskBtn.setAttribute('id', 'addTask');
  addTaskBtn.setAttribute('type', 'submit');
  addTaskBtn.innerHTML = 'Add Task';
  form.appendChild(title);
  form.appendChild(date);
  form.appendChild(addTaskBtn);
  return form;
}

function createTaskEditForm(title, due) {
  const formWrapper = document.createElement('div');
  formWrapper.classList.add('hidden');
  formWrapper.setAttribute('id', `edit-${title}`);
  const form = document.createElement('form');
  form.classList.add('task-edit-form');
  form.setAttribute('id', title)
  const taskTitle = document.createElement('input');
  taskTitle.classList.add('task-edit-title');
  taskTitle.setAttribute('type', 'text');
  taskTitle.setAttribute('name', 'title');
  taskTitle.setAttribute('placeholder', title);
  taskTitle.setAttribute('autocomplete', 'off');
  const dueDate = document.createElement('input');
  dueDate.classList.add('task-edit-duedate');
  dueDate.setAttribute('type', 'date');
  dueDate.setAttribute('name', 'date');
  dueDate.setAttribute('placeholder', parseISO(due));
  dueDate.setAttribute('autocomplete', 'off');
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('save-btn');
  saveBtn.innerHTML = 'save';
  form.appendChild(taskTitle);
  form.appendChild(dueDate);
  form.appendChild(saveBtn);
  formWrapper.appendChild(form);
  return formWrapper;
}

function createTaskNode(title, due) {
  const taskNode = document.createElement('div');
  taskNode.classList.add('task-node');
  taskNode.setAttribute('id', title);
  const taskWrapper = document.createElement('div');
  taskWrapper.classList.add('task-wrapper');
  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  taskTitle.textContent = title;
  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');
  dueDate.textContent = format(new Date(due), 'dd / MM / yy');
  const editBtn = document.createElement('button');
  editBtn.setAttribute('id', title);
  editBtn.classList.add('edit-task');
  editBtn.innerHTML = 'edit';
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', title);
  delBtn.classList.add('del-task');
  delBtn.innerHTML = '&times;';
  const taskEnd = document.createElement('div');
  taskEnd.classList.add('task-end')
  taskEnd.appendChild(dueDate);
  taskEnd.appendChild(editBtn);
  taskEnd.appendChild(delBtn);
  taskWrapper.appendChild(taskTitle);
  taskWrapper.appendChild(taskEnd);
  const taskEditForm = createTaskEditForm(title, due);
  taskNode.appendChild(taskWrapper);
  taskNode.appendChild(taskEditForm);
  return taskNode;
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  if (!openActiveProject()) {
    taskList.innerHTML = '';
    return;
  }
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
  const addTaskForm = createAddTaskForm();
  taskList.appendChild(addTaskForm);
  loadHandlers();
}

function loadHandlers() {
  const projectForm = document.getElementById('projectForm');
  projectForm.addEventListener('submit', projectFormHandler);
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', taskFormHandler);
  const taskEditForm = document.querySelectorAll('task-edit-form');
  taskEditForm.forEach(element => element.addEventListener('submit', editTask));
  const projectNodes = document.querySelectorAll('.project-node');
  projectNodes.forEach(node => node.addEventListener('click', switchActiveProject));
  const delProjectBtns = document.querySelectorAll('.del-project');
  delProjectBtns.forEach(btn => btn.addEventListener('click', removeProject));
  const editTaskBtns = document.querySelectorAll('.edit-task');
  editTaskBtns.forEach(btn => btn.addEventListener('click', showEditForm));
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
  document.querySelector('.task-form').reset();
}

function showEditForm(e) {
  e.stopPropagation();
  e.preventDefault();
  const editForm = document.getElementById(`edit-${this.id}`);
  editForm.classList.toggle('hidden');
}

export { renderProjects, renderTasks, loadHandlers };
