import { allProjects } from './storage.js';
import { 
  addProject, 
  openActiveProject, 
  removeProject, 
  switchActiveProject 
} from './projects.js';
import { addTask, removeTask, editTask } from './tasks.js';
import { parseISO, format } from 'date-fns';
import { signIn, signOutUser } from './index.js';

function createProjectNode(title) {
  const projectNode = document.createElement('div');
  projectNode.classList.add('project-node');
  projectNode.setAttribute('id', title);
  const projectTitle = document.createElement('div');
  projectTitle.textContent = title;
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', title);
  delBtn.classList.add('del-project')
  const delIcon = document.createElement('span');
  delIcon.classList.add('material-icons');
  delIcon.classList.add('md-28');
  delIcon.innerHTML = 'delete';
  delBtn.append(delIcon);
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
  const wrapper = document.createElement ('div');
  wrapper.classList.add('add-task-wrapper');
  const form = document.createElement('form');
  form.setAttribute('id', 'taskForm');
  form.classList.add('task-form');
  const title = document.createElement('input');
  title.classList.add('add-task-desc');
  title.setAttribute('type', 'text');
  title.setAttribute('id', 'taskTitle');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'Enter task description');
  title.setAttribute('autocomplete', 'off');
  title.setAttribute('required', 'true');
  const date = document.createElement('input');
  date.classList.add('add-task-date')
  date.setAttribute('type', 'date');
  date.setAttribute('id', 'taskDue');
  date.setAttribute('name', 'due');
  date.setAttribute('placeholder', 'Due Date');
  date.setAttribute('autcomplete', 'off');
  date.setAttribute('required', 'true');
  const addTaskBtn = document.createElement('button');
  addTaskBtn.setAttribute('id', 'addTask');
  addTaskBtn.setAttribute('type', 'submit');
  addTaskBtn.classList.add('mdl-button');
  addTaskBtn.classList.add('mdl-js-button');
  addTaskBtn.classList.add('mdl-button--raised');
  addTaskBtn.classList.add('mdl-button--colored');
  addTaskBtn.innerHTML = 'Add Task';
  form.appendChild(title);
  form.appendChild(date);
  form.appendChild(addTaskBtn);
  wrapper.appendChild(form);
  return wrapper;
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
  taskTitle.setAttribute('value', title);
  taskTitle.setAttribute('autocomplete', 'off');
  const dueDate = document.createElement('input');
  dueDate.classList.add('task-edit-duedate');
  dueDate.setAttribute('type', 'date');
  dueDate.setAttribute('name', 'due');
  dueDate.setAttribute('value', parseISO(due));
  dueDate.setAttribute('autocomplete', 'off');
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('save-btn');
  saveBtn.classList.add('mdl-button');
  saveBtn.classList.add('mdl-js-button');
  saveBtn.classList.add('mdl-button--raised');
  saveBtn.classList.add('mdl-button--colored');
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
  const editIcon = document.createElement('span');
  editIcon.classList.add('material-icons');
  editIcon.innerHTML = 'edit';
  editBtn.appendChild(editIcon);
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', title);
  delBtn.classList.add('del-task');
  const delIcon = document.createElement('span');
  delIcon.classList.add('material-icons');
  delIcon.classList.add('md-18');
  delIcon.innerHTML = 'delete';
  delBtn.append(delIcon);
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
  const taskEditForms = document.querySelectorAll('.task-edit-form');
  taskEditForms.forEach(form => form.addEventListener('submit', editTask));
  const projectNodes = document.querySelectorAll('.project-node');
  projectNodes.forEach(node => node.addEventListener('click', switchActiveProject));
  const delProjectBtns = document.querySelectorAll('.del-project');
  delProjectBtns.forEach(btn => btn.addEventListener('click', removeProject));
  const editTaskBtns = document.querySelectorAll('.edit-task');
  editTaskBtns.forEach(btn => btn.addEventListener('click', showEditForm));
  const delTaskBtns = document.querySelectorAll('.del-task');
  delTaskBtns.forEach(btn => btn.addEventListener('click', removeTask));
  signOutButtonElement.addEventListener('click', signOutUser);
  signInButtonElement.addEventListener('click', signIn);
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

// Shortcuts to DOM Elements.
const userPicElement = document.getElementById('user-pic');
const userNameElement = document.getElementById('user-name');
const signInButtonElement = document.getElementById('sign-in');
const signOutButtonElement = document.getElementById('sign-out');

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

function displayUser(profilePicUrl, userName) {
  // Set the user's profile pic and name.
  userPicElement.style.backgroundImage =
    'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
  userNameElement.textContent = userName;

  // Show user's profile and sign-out button.
  userNameElement.removeAttribute('hidden');
  userPicElement.removeAttribute('hidden');
  signOutButtonElement.removeAttribute('hidden');

  // Hide sign-in button.
  signInButtonElement.setAttribute('hidden', 'true');
}

function displaySignIn() {
  // Hide user's profile and sign-out button.
  userNameElement.setAttribute('hidden', 'true');
  userPicElement.setAttribute('hidden', 'true');
  signOutButtonElement.setAttribute('hidden', 'true');

  // Show sign-in button.
  signInButtonElement.removeAttribute('hidden');
}

export { 
  renderProjects, 
  renderTasks, 
  loadHandlers, 
  displayUser, 
  displaySignIn 
};
