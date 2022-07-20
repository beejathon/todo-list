import { 
  deleteDoc,
  doc, 
  getDocs, 
  serverTimestamp, 
  setDoc, 
  updateDoc, 
} from 'firebase/firestore';
import { loadHandlers, render, renderTasks } from './display.js';
import { auth, db } from './index.js';
import { 
  projectArray, 
  projectsRef, 
  saveLocal,
  tasksRef, 
} from './storage.js';

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.active = true;
  }
}

async function addProject(title) {
  await resetActiveProject();
  if (auth.currentUser) {
    await setDoc(doc(db, 'projects', title), {
      title: title,
      active: true,
      user: auth.currentUser.uid,
      created: serverTimestamp()
    });
  } else {
    const newProject = new Project(title);
    newProject.active = true;
    projectArray.push(newProject);
    saveLocal();
  }
  await render();
}

async function getActiveProject() {
  const projects = await getDocs(projectsRef)
  let id;
  projects.forEach((project) => {
    if (project.data().active === true) id = project.id;
  })
  return id;
}

function openActiveProject() {
  const activeProject = projectArray.find((project) => project.active);
  return activeProject;
}

async function switchActiveProject(e) {
  e.stopPropagation();
  e.preventDefault();
  await resetActiveProject();
  if (auth.currentUser) {
    const projects = await getDocs(projectsRef)
    projects.forEach(async (project) => {
      if (project.id === this.id) {
        const docRef = doc(db, 'projects', project.id)
        await updateDoc(docRef, { active: true });
      }
    })
  } else {
    const index = findProject(this.id);
    projectArray[index].active = true;
    saveLocal();
  }
  await renderTasks();
  loadHandlers();
}

async function removeProject(e) {
  e.stopPropagation();
  e.preventDefault();
  if (auth.currentUser) {
    const projects = await getDocs(projectsRef)
    projects.forEach(async (doc) => {
      if (doc.id === this.id) await deleteDoc(doc.ref)
    })
    const tasks = await getDocs(tasksRef)
    tasks.forEach((doc) => {
      if (doc.data().project === this.id) 
      deleteDoc(doc.ref)
    })
  } else {
    const index = findProject(this.id);
    if (projectArray.length === 1 && projectArray[index].active) {
      projectArray.splice(0, projectArray.length);
    } else if (projectArray[index].active) {
      projectArray.splice(index, 1);
      resetActiveProject();
      setDefaultActiveProject();
    } else {
      projectArray.splice(index, 1);
    }
    saveLocal();
  }
  await render();
}

async function resetActiveProject() {
  if (auth.currentUser) {
    const data = { active: false }
    const projects = await getDocs(projectsRef)
    projects.forEach(async (project) => {
      const docRef = doc(db, 'projects', project.id)
      await updateDoc(docRef, data);
    })
  } else {
    projectArray.forEach(project => project.active = false);
  }
}

async function setDefaultActiveProject() {
  if (auth.currentUser) {
    const projects = await getDocs(projectsRef)
    const id = projects.docs[0].id
    const docRef = doc(db, 'projects', id)
    await updateDoc(docRef, { active: true })
  } else {
    projectArray[0].active = true;
  }
}

function findProject(title) {
  for (const project of projectArray) {
    if (project.title === title) return projectArray.indexOf(project);
  }
}

export { 
  addProject, 
  openActiveProject, 
  getActiveProject,
  switchActiveProject, 
  removeProject 
};
