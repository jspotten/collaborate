import e from 'express';
import {TaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete} from './main.js';

let taskListCounter = 0;
let taskListContainer;
const currUser = (localStorage.getItem('username'));
document.getElementById('user-button').innerHTML = currUser;


/*
 * Displays the notifications popup window when clicking user circle.
 */
function showNotifications()
{
    const modalEl = document.getElementById('notificationsModal');
    //modalEl.querySelector('.modal-header').textContent = `Notifications`;
    /*
     * Update the dropdown box to retrive existing tasklist.
     */
    const notificationsModal = new bootstrap.Modal(modalEl, {});
    notificationsModal.show();
}
document.getElementById('user-button').addEventListener('click', showNotifications);


/*
 * Adds a notification to user's stored notifications.
 */
function addNotification()
{

}


/*
 * Adds New TaskList Object to User and Creates Tasklist HTML
 * when the Add Task button is clicked by the user.
 */
function addTaskList()
{
    if(!listSetUpComplete || findTaskList()) 
    {
        //Add Error Modal Creation
        return;
    }

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
        deleteTasklist(newTaskList.title);
        setListSetUpComplete(true);
    })

    storeNewList(newTaskList.title);
    taskListCounter++;
}
document.getElementById('addList').addEventListener('click', addTaskList);


/*
 * Creates a popup box where the user can select a list that they want to invite
 * a specific user to take part in and join.
 */
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


/*
 * Logs the user out and returns them to the login page.
 */
function logout()
{
    sessionStorage.clear();
    window.location.href = 'index.html';
}
document.getElementById('logout').addEventListener('click', logout);


/*
 * Searches for a specific tasklist and returns true if
 * found and false if it isn't.
 */
async function findTaskList(listName)
{
    const endpoint = `/collaborate/getlist`;
    const response = await fetch(endpoint, {
        method: 'get',
        body: JSON.stringify(
        {
            username: currUser,
            listname: listName,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });

    const tasklist = await response.json();
    if(response?.status === 200)
    {
        return true;
    }
    else
    {
        return false;    
    }
}


/*
 * Takes a newly created tasklist and adds it to the user's
 * tasklists field. It includes, the creator's username, an
 * array for those it is shared with, and an array to store
 * the tasks linked with it.
 */
async function storeNewList(listName)
{
    const endpoint = `/collaborate/addlist`;
    await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            username: currUser,
            tasklist: {username: currUser, shared: [], tasks: []},
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
}

async function deleteTasklist(listName)
{
    const endpoint = `/collaborate/deletelist`;
    await fetch(endpoint, {
        method: 'delete',
        body: JSON.stringify({username: currUser, listname: listName}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
}


export {addTaskList};