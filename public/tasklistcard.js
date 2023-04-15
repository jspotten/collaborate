import {storeNewList, loadTasksPage, createNewShared, addShareListOption} from './tasklist.js'
export {TaskList, LoadedTaskList, pinnedIcon, listSetUpComplete, setListSetUpComplete};


const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                        0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525
                        0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>`;

const pinnedIcon =  `<svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>`;

const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58
                            0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59
                            0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>`;

const taskListForm =`<form class = "d-flex tempTextBox" id = "taskListForm">
                        <input id = "taskListTitle" class="form-control me-2 cursor-center 
                        form-input" type="text" placeholder="Enter Task List Name Here"
                        aria-label="" aria-describedby="basic-addon1">
                    </form>`;

let listSetUpComplete = true;

function setListSetUpComplete(value)
{
    listSetUpComplete = value;
}

class TaskList
{
    constructor()
    {
        this.title = null;
        this.id = "";
        this.shared = false;
        this.pinned = false;
        this.listCardComplete = false;
        
        this.taskListCard = this.createTaskListCard();
        listSetUpComplete = false;
        const input = this.taskListCard.getElementsByTagName('input');
        input[0].addEventListener('keypress', (event) =>
        {
            if(event.key === "Enter" && (input[0].textContent !== null || input.textContent !== ''))
            {
                event.preventDefault();
                const taskListTitle = document.createElement('a');
                taskListTitle.addEventListener('click', () => loadTasksPage(this.id, input[0].value));
                taskListTitle.setAttribute('href', 'task.html');
                taskListTitle.textContent = input[0].value;
                this.title = input[0].value;
                this.taskListCard.replaceChild(taskListTitle, input[0].parentElement);
                this.listCardComplete = true;
                listSetUpComplete = true;
                this.id = storeNewList(this.title);
                createNewShared(this.title);
                addShareListOption(this.title, this.id);
            }
        });
    }

    createTaskListCard()
    {
        const taskListCard = document.createElement('div');
        taskListCard.className = "card";
        
        const starIcon = document.createElement('i');
        starIcon.className = "star";
        starIcon.innerHTML += pinIcon;
        taskListCard.appendChild(starIcon);

        taskListCard.innerHTML += taskListForm;
        
        const trashIcon = document.createElement('i');
        trashIcon.className = "trash";
        trashIcon.innerHTML += deleteIcon
        taskListCard.appendChild(trashIcon);
        
        return taskListCard;
    }

    setID(taskListID)
    {
        this.id = taskListID;
    }
}

class LoadedTaskList
{
    constructor(title, id, shared, pinned)
    {
        this.title = title;
        this.id = id;
        this.shared = shared;
        this.pinned = pinned;
        this.taskListCard = this.generateTaskListCard();
    }

    generateTaskListCard()
    {
        const taskListCard = document.createElement('div');
        taskListCard.className = "card";
        
        const starIcon = document.createElement('i');
        starIcon.className = "star";
        starIcon.innerHTML += pinIcon;
        taskListCard.appendChild(starIcon);

        const taskListTitle = document.createElement('a');
        taskListTitle.addEventListener('click', () => loadTasksPage(this.id, this.title));
        taskListTitle.textContent = this.title;
        taskListCard.appendChild(taskListTitle);
        
        const trashIcon = document.createElement('i');
        trashIcon.className = "trash";
        trashIcon.innerHTML += deleteIcon
        taskListCard.appendChild(trashIcon);
        
        return taskListCard;
    }
}