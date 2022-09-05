# To-do List

A simple web app to create and track projects and tasks completed as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) curriculum.

Live demo @ [https://beejathon.github.io/todo-list/](https://beejathon.github.io/todo-list/)

## Technologies used

<p align="left">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> 
<a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://webpack.js.org" target="_blank"> <img src="https://github.com/webpack/media/blob/master/logo/icon.svg" alt="webpack" width="40" height="40"/> </a>
<a href="https://firebase.google.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain-wordmark.svg" alt="firebase" width="40" height="40"/> </a> 
</p>

## Reflection

This was the first project to focus on using OOP and SOLID principles. I learned quite a lot while building this, particularly how to separate the logic of the UI and the application itself. This project took longer than anticipated as I initially wanted to implement this approach using the pubsub pattern, hit a roadblock in my understanding, and had to go back and rethink my approach. In the end, the modules I wrote are probably still tightly coupled but I at least have an understanding of how to avoid this in the future. 

After progressing further into the curriculum I chose to revisit this project in order to practice using Firebase. This again took much longer than anticipated since I hadn't looked at the code in months and had gotten used to using React. I decided to keep most of my old code intact while tryig to integrate Firebase Authentication to allow users to sign in using Google and to persist their data using Firestore backend-as-a-service. 