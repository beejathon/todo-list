import { addProject } from './projects';
import { addTask } from './tasks';
import {
  collection,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '.';


// Firestore
let projectsRef;
let tasksRef;

async function syncDb(id) {
  projectsRef = query(
    collection(db, 'projects'), 
    where('user', '==', id), 
    orderBy('created')
    );
  tasksRef = query(
    collection(db, 'tasks'), 
    where('user', '==', id), 
    orderBy('created')
    );
}

// Local storage
let projectArray = [];
function saveLocal() {
  localStorage.setItem('projects', JSON.stringify(projectArray));
}

function restoreLocal() {
  if (!localStorage.getItem('projects')) {
    addProject('Template project');
    addTask('Make a todo list', today);
    addTask('Finish tasks', tomorrow);
  } else {
    projectArray = JSON.parse(localStorage.getItem('projects'));
  }
  saveLocal();
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export { 
  projectArray, 
  saveLocal, 
  restoreLocal, 
  syncDb,
  projectsRef,
  tasksRef,
};