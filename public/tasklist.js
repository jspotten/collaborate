import {TaskList, LoadedTaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete} from './tasklistcard.js';

let taskListContainer;
let dropDownContainer;
let socket;
const currUser = (localStorage.getItem('username'));
document.getElementById('user-button').innerHTML = currUser;

(async () => 
{ 
    localStorage.setItem('userID', await getUserID());
    await loadTaskLists();
    await loadSharedLists();
    configureSocket();
})();


/*
 * Displays the notifications popup window when clicking user circle.
 */
function showNotifications()
{
    const modalEl = document.getElementById('notificationsModal');
    const notificationsModal = new bootstrap.Modal(modalEl, {});
    notificationsModal.show();
}
document.getElementById('user-button').addEventListener('click', showNotifications);


/*
 * 
 */
async function acceptInvitation()
{
    const selectEl = document.getElementById('tasklist-invite-notifications');
    const listID = await selectEl.value;
    if(listID !== 'blank')
    {   
        const optionText = selectEl.options[selectEl.selectedIndex].text;
        const tasklist = await getTaskList(listID);
        const inviter = optionText.split(" ")[0];
        await addSharedUser(inviter, tasklist.listname);
        loadTasklist(tasklist);
        deleteSelectOption(selectEl);
    }
}
document.getElementById('notify-accept').addEventListener('click', acceptInvitation);

async function getTaskList(listID)
{
    const endpoint = `/collaborate/getlist/${listID}`;
    const response = await fetch(endpoint, {
        method: 'get',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });

    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.tasklist;
    }
}

function declineInvitation()
{
    const selectEl = document.getElementById('tasklist-invite-notifications');
    if(selectEl.value !== 'blank');
    {
        deleteSelectOption(selectEl);
    }
}
document.getElementById('notify-delete').addEventListener('click', declineInvitation);

function deleteSelectOption(selectEl)
{
    selectEl.remove(selectEl.selectedIndex);
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

    newTaskList.taskListCard.getElementsByClassName('trash')[0].addEventListener('click', async (e) => {
        const divEl = e.target.parentElement.parentElement;
        const listsDivEl = divEl.parentElement;
        await listsDivEl.removeChild(divEl);
        if(newTaskList.title !== null) deleteTasklist(newTaskList.title);
        deleteShareListOption(newTaskList.id);
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
    const modalEl = document.getElementById('shareModal');
    const shareModal = new bootstrap.Modal(modalEl, {});
    shareModal.show();
}
document.getElementById('share').addEventListener('click', showShareWindow);


/*
 * 
 */
async function createNewShared(listName)
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
            //await addSharedUser(invitee, optionText, optionVal);
            broadcastToUser(currUser, optionText, optionVal);
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
async function addSharedUser(inviter, listName)
{
    const endpoint = `/collaborate/addShared`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            username: inviter,
            listname: listName,
            invited: currUser,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    //broadcastToUser(currUser, listName, listID);
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
    localStorage.clear();
    window.location.href = 'index.html';
}
document.getElementById('logout').addEventListener('click', logout);


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
    taskListContainer.style.overflowY = 'scroll';
    tasklists.forEach(async (list) => 
    {
        await loadTasklist(list, false)
    });
}


async function getSharedTaskLists()
{
    const endpoint = `/collaborate/getShared/${currUser}`;
    const response = await fetch(endpoint, {
        method: 'get',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.shared;
    }
}


async function loadSharedLists()
{
    const sharedLists = await getSharedTaskLists();
    taskListContainer = document.getElementById('list-container');
    sharedLists.forEach(async (list) => 
    {
        await loadTasklist(list, true)
    });
}


async function loadTasklist(list, shared)
{
    let filledList = new LoadedTaskList(list.listname, list.listID, shared, false);
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
            if(filledList.shared === true)
            {
                removeSharedUser(filledList.title);
            }
            else
            {
                deleteTasklist(filledList.title);
            }
            deleteShareListOption(filledList.id);
            setListSetUpComplete(true);
        })
        addShareListOption(list.listname, list.listID);
}


async function removeSharedUser(listname)
{
    const endpoint = `/collaborate/removeSharedUser/${currUser}/${listname}`;
    const response = await fetch(endpoint, {
        method: 'delete',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    const respBody = await response.json();
}

async function removeShared(listname)
{
    
}

/*
 *
 */
function addShareListOption(listName, listID)
{
    dropDownContainer = document.getElementById('tasklist-invites-drop-down');
    const newOption = document.createElement('option');
    newOption.value = `${listID}`;
    newOption.innerHTML = listName;
    dropDownContainer.appendChild(newOption);
}


/*
 * 
 */
function deleteShareListOption(listID)
{
    const selectEl = document.getElementById('tasklist-invites-drop-down');
    for(var i = 0; i < selectEl.length; i++)
    {
        if(selectEl.options[i].value === listID)
        {
            selectEl.remove(i);
        }
    }
}


/*
 * Transitions to the tasks HTML page and stores a
 * local variable for the listID where that list
 * had its title clicked.
 */
async function loadTasksPage(listID, listName)
{
    localStorage.setItem('listID', listID);
    localStorage.setItem('currTasklist', listName)
    window.location.href = 'task.html';
}

function configureSocket()
{
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => 
    {
        const message = JSON.parse(await event.data.text());
        displayMessage(message.inviter, message.listname, message.listID);
    };
}

function displayMessage(inviter, listname, listID)
{
    //const notifications = document.getElementById('tasklist-invites');
    // notifications.innerHTML +=
    //     `<div class="event">
    //         <span>${inviter} Invited You to Join ${listname}</span>
    //     </div>`;
    dropDownContainer = document.getElementById('tasklist-invite-notifications');
    const newNotification = document.createElement('option');
    newNotification.value = `${listID}`;
    newNotification.innerHTML = `${inviter} Invited You to Join ${listname}`;
    dropDownContainer.appendChild(newNotification);
}

function broadcastToUser(inviter, listname, listId)
{
   const event = {inviter: inviter, listname: listname, listID: listId};
   socket.send(JSON.stringify(event));
}

export {addTaskList, addShareListOption, storeNewList, loadTasksPage, createNewShared};