import {TaskList, LoadedTaskList, pinnedIcon, listSetUpComplete,
    setListSetUpComplete} from './main.js';

let taskListContainer;
let dropDownContainer;
let socket;
const currUser = (localStorage.getItem('username'));
document.getElementById('user-button').innerHTML = currUser;

(async () => 
{ 
    localStorage.setItem('userID', await getUserID());
    await loadTaskLists();
    configureSocket();
})();


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
 * 
 */
async function createdNewShared(listName)
{
    const endpoint = `/collaborate/createShared`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({
           username: currUser,
           listname: listName,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
}


/*
 * When share Window share button is clicked, the specified
 * tasklist will be shared with a specific user if both
 * fields exist.
 */
async function shareTaskList()
{
    const selectEl = document.getElementById('tasklist-invites-drop-down');
    const optionVal = selectEl.value;
    const optionText = selectEl.options[selectEl.selectedIndex].text;
    
    const inputEl = document.getElementById('username-to-invite');
    const invitee = inputEl?.value;

    if(invitee !== undefined)
    {
        const endpoint = `/collaborate/findUser/${invitee}`;
        const response = await fetch(endpoint, {
            method: 'get',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        });
        if(response?.status === 200)
        {
            await addSharedUser(invitee, optionText);
        }
        else
        {
            console.log('No user found with that username.');
        }
    }
    else
    {
        console.log('Input Box is Blank');
    }
    
}
document.getElementById('share-with-user').addEventListener('click', shareTaskList);


/*
 * Adds user to the specific shared object who's listname matches the
 * the one owned and shared by the current user.
 */
async function addSharedUser(invitee, listName)
{
    const endpoint = `/collaborate/addShared`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            username: currUser,
            listname: listName,
            invited: invitee,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    broadcastToUser(currUser, listName);
    if(response?.status !== 200)
    {
        console.log('Error adding user to shared list object.');
    }
}


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
    const userID = (localStorage.getItem('userID'));
    const endpoint = `/collaborate/deletelist/${userID}/${listName}`;
    await fetch(endpoint, {
        method: 'delete',
        //body: JSON.stringify({username: currUser, listname: listName}),
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
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.userID;
    }
}


/*
 *  Retrieves the user's ID number.
 */
async function getUserTaskLists()
{
    const userID = (localStorage.getItem('userID'));
    const endpoint = `/collaborate/getlists/${userID}`;
    const response = await fetch(endpoint, {
        method: 'get',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.tasklists;
    }
}


/*
 *  Retrieves the user's ID number.
 */
async function loadTaskLists()
{
    const tasklists = await getUserTaskLists();
    taskListContainer = document.getElementById('list-container');
    tasklists.forEach((list) => 
    {
        let filledList = new LoadedTaskList(list.listname, list.listID, false);
        taskListContainer.appendChild(filledList.taskListCard);

        filledList.taskListCard.getElementsByClassName('star')[0].addEventListener('click', (e) => 
        {
            const divEl = e.target.parentElement.parentElement;
            const starIcon = e.target.parentElement;
            const filledStarIcon = document.createElement('i');
            filledStarIcon.className = "star";
            filledStarIcon.innerHTML += pinnedIcon;
            filledStarIcon.addEventListener('click', () => {
            divEl.replaceChild(starIcon, filledStarIcon);
            filledList.pinned = false;
        });
            divEl.replaceChild(filledStarIcon, starIcon);
            filledList.pinned = true;
        });

        filledList.taskListCard.getElementsByClassName('trash')[0].addEventListener('click', (e) => 
        {
            const divEl = e.target.parentElement.parentElement;
            const listsDivEl = divEl.parentElement;
            listsDivEl.removeChild(divEl);
            deleteTasklist(filledList.title);
            setListSetUpComplete(true);
        })
        addShareListOption(list.listname, list.listID);
    });
}


/*
 *
 */
function addShareListOption(listName, listID)
{
    dropDownContainer = document.getElementById('tasklist-invites-drop-down');
    const newOption = document.createElement('option');
    newOption.value = `${listID}`;//setAttribute('value', `${listID}`);
    newOption.innerHTML = listName;
    dropDownContainer.appendChild(newOption);
}


/*
 * Transitions to the tasks HTML page and stores a
 * local variable for the listID where that list
 * had its title clicked.
 */
async function loadTasksPage(listID)
{
    localStorage.setItem('listID', listID);
    window.location.href = 'task.html';
}

function configureSocket()
{
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => 
    {
        const message = JSON.parse(await event.data.text());
        displayMessage(message.inviter, message.lisname);
    };
}

function displayMessage(inviter, listname)
{
    const notifications = document.getElementById('tasklist-invites');
    notifications.innerHTML +=
        `<div class="event">
            <span>${inviter} Invited You to Join ${listname}</span>
        </div>`;
}

function broadcastToUser(inviter, listname)
{
   const event = {inviter: inviter, listname: listname};
   socket.send(JSON.stringify(event));
}

export {addTaskList, addShareListOption, storeNewList, loadTasksPage, createdNewShared};