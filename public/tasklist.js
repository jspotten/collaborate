import {TaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete} from './main.js';

let taskListCounter = 0;
let taskListContainer;
const currUser = (localStorage.getItem('username'));

(async () => 
{ 
    localStorage.setItem('userID', await getUserID());
})();
document.getElementById('user-button').innerHTML = currUser;



/*
 * Displays the notifications popup window when clicking user circle.
 */
function showNotifications()
{
    console.log("In showNotifications");
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
 * 
 */
function acceptInvitation()
{

}


/*
 * Adds New TaskList Object to User and Creates Tasklist HTML
 * when the Add Task button is clicked by the user.
 */
function addTaskList()
{
    
    if(!listSetUpComplete)//taskListContainer.childNodes.length > 1 && 
        //newTaskList.title !== "none" && !newTaskList.listCardComplete) && findTaskList(newTaskList.title))
    {
        return;
    }
    let newTaskList = new TaskList();
    taskListContainer = document.getElementById('list-container');
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

    //storeNewList(newTaskList.title);
    taskListCounter++;
}
document.getElementById('addList').addEventListener('click', addTaskList);


/*
 * Creates a popup box where the user can select a list that they want to invite
 * a specific user to take part in and join.
 */
function showShareWindow()
{
    console.log("In showShareWindow");
    const modalEl = document.getElementById('shareModal');
    //modalEl.querySelector('.modal-header').textContent = `Notifications`;
    /*
     * Update the dropdown box to retrive existing tasklist.
     */
    const shareModal = new bootstrap.Modal(modalEl, {});
    shareModal.show();
}
document.getElementById('share').addEventListener('click', showShareWindow);


/*
 * When share Window share button is clicked, the specified
 * tasklist will be shared with a specific user if both
 * fields exist.
 */
function shareTaskList()
{

}
document.getElementById('share-with-user').addEventListener('click', shareTaskList);


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
    const endpoint = `/collaborate/getlist/${listName}`;
    const response = await fetch(endpoint, {
        method: 'get',
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
    const userID = (localStorage.getItem('userID'));
    const endpoint = `/collaborate/addlist`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            userID: userID,
            listname: listName,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.listID;
    }
}


/*
 * Deletes a tasklist by name from database.
 */
async function deleteTasklist(listName)
{
    const endpoint = `/collaborate/deletelist`;
    await fetch(endpoint, {
        method: 'delete',
        body: JSON.stringify({username: currUser, listname: listName}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
}


/*
 * Retrieves the user's ID number.
 */
async function getUserID()
{
    const endpoint = `/collaborate/getUserID/${currUser}`;
    const response = await fetch(endpoint, {
        method: 'get',
        //body: JSON.stringify({username: currUser}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.userID;
    }
}

async function loadTasksPage(listID)
{

}

export {addTaskList, storeNewList, loadTasksPage};