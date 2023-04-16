import {Task, pinnedIcon, checkedIcon, taskSetUpComplete, setTaskSetUpComplete} from './taskcard.js';

let taskContainer;
const currUser = (localStorage.getItem('username'));
document.getElementById('user-button').innerHTML = currUser;
const currTasklist = (localStorage.getItem('currTasklist'));
document.getElementById('nav-bar').innerHTML += currTasklist;
const currListID = (localStorage.getItem('listID'));

(async () =>
{
    await loadTasks();
})();

function addTask()
{
    if(!taskSetUpComplete) 
    {
        return;
    }

    let newTask = new Task();
    taskContainer = document.getElementById('task-container');
    taskContainer.appendChild(newTask.taskCard);
    newTask.taskCard.getElementsByClassName('unchecked')[0].addEventListener('click', (e) => {
        const divEl = e.target.parentElement.parentElement;
        const uncheckedIcon = e.target.parentElement;
        const checkIcon = document.createElement('i');
        checkIcon.className = "unchecked";
        checkIcon.innerHTML += checkedIcon;
        checkIcon.addEventListener('click', () => {
            divEl.replaceChild(uncheckedIcon, checkIcon);
            newTask.checked = false;
        });
        divEl.replaceChild(checkIcon, uncheckedIcon);
        newTask.checked = true;
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
        //deleteTask() and check for title
        setTaskSetUpComplete(true);
    })
}
document.getElementById('addTask').addEventListener('click', addTask);


/*
 * 
 */
async function storeNewTask(taskName)
{
    const endpoint = `/collaborate/addtask`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            listID: currListID,
            taskname: taskName,
            date: " "
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
    if(response?.status === 200)
    {
        return respBody.taskID;
    }
}

async function updateTaskDate(taskId, task_date)
{
    const endpoint = `/collaborate/updateDate`;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify(
        {
            taskID: taskId,
            date: task_date
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const respBody = await response.json();
}

function deleteList()
{

}
document.getElementById('deleteList').addEventListener('click', deleteList);

document.getElementById('toHomePage').addEventListener('click', () => {
    onclick = window.location.href = 'tasklist.html';});


/*
 * 
 */
async function getListTasks()
{

}


/*
 * 
 */
async function loadTasks()
{
    const tasks = await getListTasks();
    taskContainer = document.getElementById('task-container');
    taskContainer.style.overflowY = 'scroll';
}

//async function loadTask()



export {storeNewTask, updateTaskDate};