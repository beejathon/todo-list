import './style.css';
import { addProject } from './projects.js';
import { addTask } from './tasks.js';
import { saveLocal, restoreLocal } from './storage.js'
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { displaySignIn, displayUser } from './display';

const firebaseConfig = {
  apiKey: "AIzaSyAlb1ds7EKIayhcVgYZHBCn3_K2eigsqs0",
  authDomain: "to-do-list-713f2.firebaseapp.com",
  projectId: "to-do-list-713f2",
  storageBucket: "to-do-list-713f2.appspot.com",
  messagingSenderId: "831369558149",
  appId: "1:831369558149:web:cdb8129cebb3bcb8f591ec"
};

const app = initializeApp(firebaseConfig);

// Signs-in to Simple Todo List
async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// Signs-out of Simple Todo List
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Initiate firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || 'src/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();
    // Display user info
    displayUser(profilePicUrl, userName);
  } else {
    // User is signed out!
    displaySignIn();
  }
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function init() {
  if (!localStorage.getItem('template')) {
    addProject('Template project');
    addTask('Make a todo list', today);
    addTask('Finish tasks', tomorrow);
    saveLocal();
  }
  restoreLocal();
}

init();
initFirebaseAuth();

export {
  app,
  signIn,
  signOutUser,
}