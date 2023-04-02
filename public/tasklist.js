const uuid = require('uuid');
import {TaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete} from './main.js';
export {addTaskList};

let taskListCounter = 0;
let taskListContainer;
const currUser = (JSON.parse(sessionStorage.getItem('currentUser')));
console.log(currUser.username);
document.getElementById('user').innerHTML = currUser.username;

function addTaskList()
{
    if(!listSetUpComplete) return;

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
            newTaskList.pinned = false;
        });
        divEl.replaceChild(filledStarIcon, starIcon);
        newTaskList.pinned = true;
    });

    newTaskList.taskListCard.getElementsByClassName('trash')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const listsDivEl = divEl.parentElement;
        listsDivEl.removeChild(divEl);
        setListSetUpComplete(true);
    })
    taskListCounter++;
}
document.getElementById('addList').addEventListener('click', addTaskList);

function shareWithUser()
{
    console.log("Shared with Julie");
   /*
    * Add functionality to be able to send an invite to share a list with
    * another user and give them the ability to accept or decline. If accepted,
    * then the task list will be added to their collection of task lists.
    */
}
document.getElementById('share').addEventListener('click', shareWithUser);

function logout()
{
    sessionStorage.clear();
    window.location.href = 'index.html';
}
document.getElementById('logout').addEventListener('click', logout);