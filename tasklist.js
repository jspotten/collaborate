import {TaskList} from './main.js';
export {addTaskList};

let taskListCounter = 0;
let taskListContainer; 

function addTaskList()
{
    taskListContainer = document.getElementById('list-container');
    let newTaskList = new TaskList("CS 260 Exams", taskListCounter, []);
    taskListContainer.appendChild(newTaskList.taskCard);
    taskListCounter++;
}

document.getElementById('addList').addEventListener('click', addTaskList);