import {pinIcon, pinnedIcon, uncheckedIcon, deleteIcon, checkedIcon, taskForm, dateForm} from './main.js';
export {Task, addTask};

let taskCounter = 0;
let taskContainer;
let taskSetUpComplete = true;


class Task
{
    constructor(title)
    {
        this.title = title;
        this.pinned = false;
        this.completed = false;
        this.taskCard = this.createTaskCard();

        taskSetUpComplete = false;
        const input = this.taskCard.getElementsByTagName('input');
        input[0].addEventListener('keypress', (event) =>
        {
            if(event.key === "Enter" && (input[0].textContent !== null || input.textContent !== ''))
            {
                event.preventDefault();
                const taskTitle = document.createElement('span');
                taskTitle.textContent = input[0].value;
                this.taskCard.replaceChild(taskTitle, input[0].parentElement);
            }
        });

        input[1].addEventListener('keypress', (event) =>
        {
            if(event.key === "Enter" && (input[1].textContent !== null || input.textContent !== ''))
            {
                event.preventDefault();
                const taskDate = document.createElement('time');
                taskDate.textContent = input[1].value;
                this.taskCard.replaceChild(taskDate, input[1].parentElement);
            }
        });
    }

    createTaskCard()
    {
        const taskCard = document.createElement('div');
        taskCard.className = "card";
        
        const incompleteIcon = document.createElement('i');
        incompleteIcon.className = "unchecked";
        incompleteIcon.innerHTML += uncheckedIcon;
        taskCard.appendChild(incompleteIcon);

        const starIcon = document.createElement('i');
        starIcon.className = "star";
        starIcon.innerHTML += pinIcon;
        taskCard.appendChild(starIcon);

        taskCard.innerHTML += taskForm;

        taskCard.innerHTML += dateForm;
        
        const trashIcon = document.createElement('i');
        trashIcon.className = "trash";
        trashIcon.innerHTML += deleteIcon
        taskCard.appendChild(trashIcon);
        
        return taskCard;
    }

    setTaskSetUpComplete(value)
    {
        taskSetUpComplete = value;
    }
}


function addTask()
{
    if(!taskSetUpComplete) return;

    taskContainer = document.getElementById('in-progress');
    let newTask = new Task("Startup");
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
        //setTaskSetUpComplete(true);
    })
    taskCounter++;
}
document.getElementById('addTask').addEventListener('click', addTask());


function deleteList()
{

}
document.getElementById('deleteList').addEventListener('click', deleteList);


document.getElementById('toHomePage').addEventListener('click', () => {
    onclick = window.location.href = 'tasklist.html';});