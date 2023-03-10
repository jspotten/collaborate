import {Task, pinnedIcon, taskSetUpComplete, setTaskSetUpComplete} from './main.js';
export {addTask};

let taskCounter = 0;
let taskContainer;
const currUser = (JSON.parse(sessionStorage.getItem('currentUser')));
console.log(currUser.username);
document.getElementById('user').innerHTML = currUser.username;


function addTask()
{
    if(!taskSetUpComplete) return;

    taskContainer = document.getElementById('list-container');
    let newTask = new Task("CS 260 Exams");
    taskContainer.appendChild(newTask.taskCard);
    newTask.taskCard.getElementsByClassName('star')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const starIcon = e.target.parentElement;
        const filledStarIcon = document.createElement('i');
        filledStarIcon.className = "star";
        filledStarIcon.innerHTML += pinnedIcon;
        filledStarIcon.addEventListener('click', () => {
            divEl.replaceChild(starIcon, filledStarIcon);
            newTask.pinned = false;
        });
        divEl.replaceChild(filledStarIcon, starIcon);
        newTask.pinned = true;
    });

    newTask.taskCard.getElementsByClassName('trash')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const tasksDivEl = divEl.parentElement;
        tasksDivEl.removeChild(divEl);
        setTaskSetUpComplete(true);
    })
    taskCounter++;
}
document.getElementById('addList').addEventListener('click', addTask);