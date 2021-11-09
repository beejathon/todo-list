import { pubsub } from './pubsub.js';

class Task {
    constructor(title, description, duedate, priority) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
    }
    edit(field, value) {
        if (this[field] == undefined) return;
        this[field] = value;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = []
    }
    newTask(title, description, duedate, priority) {
        const task = new Task(title, description, duedate, priority);
        this.tasks.push(task);
    }   
}

const projects = [];

function loadList() {
    if (!localStorage.getItem('sampleProject')) {
        projects.push(
            new Project('My First Project')
        );
        saveLocal();
    }
    restoreLocal();
}

function saveLocal() {
    localStorage.setItem('projects', JSON.stringify(projects))
}

function restoreLocal() {
    if(!localStorage.getItem('sampleProject')) {
        localStorage.setItem('sampleProject', true);
    } else {
        objects = JSON.parse(localStorage.getItem('projects'));    
        for(let element of objects) {
            if(element !== null) {
                projects.push(new Project(element.title, element.tasks))
            }
        }
        saveLocal();
    }
}

function findProject(title) {
    return projects.indexOf(projects.filter((project) => project.title === title))
}

function addProject() {
    const newProject = new Project(title);
    projects.push(newProject);
    pubsub.publish('projectAdded', storage.projects);
}

function removeProject() {
    e.preventDefault();
    const index = findProject(e.target.id);
    projects.splice(index, 1);
    saveLocal();
    pubsub.publish('projectRemoved', storage.projects);
}

export { loadList, addProject, removeProject };