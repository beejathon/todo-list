import './style.css';
import loadList from './lists.js';
import render from './display.js';

function init() {
    loadList();
    render();
}

init;