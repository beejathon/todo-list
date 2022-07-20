import './style.css';
import { restoreLocal, syncDb } from './storage.js'
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { displaySignIn, displayUser, render } from './display';

const firebaseConfig = {
  apiKey: "AIzaSyAlb1ds7EKIayhcVgYZHBCn3_K2eigsqs0",
  authDomain: "to-do-list-713f2.firebaseapp.com",
  projectId: "to-do-list-713f2",
  storageBucket: "to-do-list-713f2.appspot.com",
  messagingSenderId: "831369558149",
  appId: "1:831369558149:web:cdb8129cebb3bcb8f591ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signs-in to Simple Todo List
async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  await signInWithPopup(auth, provider);
}

// Signs-out of Simple Todo List
function signOutUser() {
  // Sign out of Firebase.
  signOut(auth);
}

// Initiate firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(auth, authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return auth.currentUser.photoURL || 'src/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return auth.currentUser.displayName;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();
    // Display user info and
    displayUser(profilePicUrl, userName);
    syncDb(user.uid);
    render();
  } else {
    // User is signed out!
    displaySignIn();
    restoreLocal();
    render();
  }
}

initFirebaseAuth();

export {
  app,
  auth,
  db,
  signIn,
  signOutUser,
}