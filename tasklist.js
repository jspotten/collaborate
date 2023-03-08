import {TaskList} from './main.js';
export {addTaskList, pinList};

let taskListCounter = 0;
let taskListContainer; 

function addTaskList()
{
    taskListContainer = document.getElementById('list-container');
    let newTaskList = new TaskList("CS 260 Exams", taskListCounter, []);
    taskListContainer.appendChild(newTaskList.taskListCard);
    console.log(newTaskList.taskListCard);
    newTaskList.taskListCard.getElementsByClassName('star')[0].addEventListener('click', pinList);

    taskListCounter++;
}

document.getElementById('addList').addEventListener('click', addTaskList);

function pinList()
{
    console.log("In pinList");
    return;
}

document.getElementById('star').addEventListener('click', pinList);