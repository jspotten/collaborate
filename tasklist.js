import {TaskList, pinnedIcon} from './main.js';
export {addTaskList};

let taskListCounter = 0;
let taskListContainer; 

function addTaskList()
{
    taskListContainer = document.getElementById('list-container');
    let newTaskList = new TaskList("CS 260 Exams", taskListCounter, []);
    taskListContainer.appendChild(newTaskList.taskListCard);
    newTaskList.taskListCard.getElementsByClassName('star')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const starIcon = e.target.parentElement;
        const filledStarIcon = document.createElement('i');
        filledStarIcon.className = "star";
        filledStarIcon.innerHTML += pinnedIcon;
        filledStarIcon.addEventListener('click', () => {
            divEl.replaceChild(starIcon, filledStarIcon);
        });
        divEl.replaceChild(filledStarIcon, starIcon);
    });
    
    taskListCounter++;
}

document.getElementById('addList').addEventListener('click', addTaskList);