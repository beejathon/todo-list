import { deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { loadHandlers, renderTasks } from './display.js';
import { auth, db } from './index.js';
import { openActiveProject } from './projects.js';
import { saveLocal, tasksRef } from './storage.js';

class Task {
  constructor(title, due) {
    this.title = title;
    this.due = due;
  }
}

async function addTask(project, title, due) {
  if (auth.currentUser) {
    await setDoc(doc(db, 'tasks', title), {
      project: project,
      title: title,
      due: due,
      user: auth.currentUser.uid,
      created: serverTimestamp()
    })
  } else {
    const newTask = new Task(title, due);
    const activeProject = openActiveProject();
    activeProject.tasks.push(newTask);
    saveLocal();
  }
  await renderTasks();
  loadHandlers();
}

async function removeTask(e) {
  e.stopPropagation();
  e.preventDefault();
  if (auth.currentUser) {
    const tasks = await getDocs(tasksRef);
    tasks.forEach(async (doc) => {
      if (doc.data().title === this.id) await deleteDoc(doc.ref)
    })
    console.log(this.id)
  } else {
    const index = findTask(this.id);
    const activeProject = openActiveProject();
    activeProject.tasks.splice(index, 1)
    saveLocal();
  }
  await renderTasks();
  loadHandlers();
}

async function editTask(id, title, due) {
  const data = { title: title, due: due }
  if (auth.currentUser) {
    const tasks = await getDocs(tasksRef);
    tasks.forEach(async (doc) => {
      if (doc.data().title === id) await updateDoc(doc.ref, data)
    })
  } else {
    const index = findTask(id);
    const activeProject = openActiveProject();
    activeProject.tasks[index].title = title;
    activeProject.tasks[index].due = due;
    saveLocal();
  }
  await renderTasks();
  loadHandlers();
}

function findTask(title) {
  const activeProject = openActiveProject();
  for (const task of activeProject.tasks) {
    if (task.title === title) return activeProject.tasks.indexOf(task);
  }
}

export { 
  addTask, 
  removeTask, 
  editTask, 
  findTask 
};