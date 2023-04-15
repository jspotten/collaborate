import {Task, pinnedIcon, checkedIcon, taskSetUpComplete, setTaskSetUpComplete} from './taskcard.js';

let taskContainer;
const currUser = (localStorage.getItem('username'));
document.getElementById('user-button').innerHTML = currUser;
const currTasklist = (localStorage.getItem('currTasklist'));
document.getElementById('nav-bar').innerHTML += currTasklist;
(async () =>
{
    await loadTasks();
})();

async function addTask()
{
    if(!taskSetUpComplete) return;

    taskContainer = document.getElementById('in-progress');
    let newTask = new Task("Startup");
    taskContainer.appendChild(newTask.taskCard);

    newTask.taskCard.getElementsByClassName('unchecked')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const uncheckedIcon = e.target.parentElement;
        const checkIcon = document.createElement('i');
        checkIcon.className = "unchecked";
        checkIcon.innerHTML += checkedIcon;
        checkIcon.addEventListener('click', () => {
            divEl.replaceChild(uncheckedIcon, checkIcon);
            newTask.pinned = false;
        });
        divEl.replaceChild(checkIcon, uncheckedIcon);
        newTask.pinned = true;
    });

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

    newTask.taskCard.getElementsByClassName('trash')[0].addEventListener('click', async (e) => {
        const divEl = e.target.parentElement.parentElement;
        const tasksDivEl = divEl.parentElement;
        await tasksDivEl.removeChild(divEl);
        setTaskSetUpComplete(true);
    })
    taskCounter++;
}
document.getElementById('addTask').addEventListener('click', addTask);

function deleteList()
{

}
document.getElementById('deleteList').addEventListener('click', deleteList);

document.getElementById('toHomePage').addEventListener('click', () => {
    onclick = window.location.href = 'tasklist.html';});

async function loadTasks()
{

}

export {loadTasks};