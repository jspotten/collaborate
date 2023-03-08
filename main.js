const pinIcon = `<i id = "star" onclick = "window.location.href = 'cs260-task-last.html';">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                            0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525
                            0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                </i>`;

const deleteIcon = `<i class="bi bi-star" id = "trash">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58
                                0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59
                                0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </i>`;

const taskListForm =`<form class = "d-flex" id = "tempTextBox">
                        <input id = "taskListTitle" class="form-control me-2 cursor-center 
                        form-input" type="search" placeholder="Enter Task List Name Here"
                        aria-label="" aria-describedby="basic-addon1">
                    </form>`;

class User
{
    constructor(firstName, lastName, email, username, password, taskLists = [])
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.taskLists = taskLists;
    }

    getJSON()
    {
        return JSON.parse(this);
    }

    decodeJSON(userJSON)
    {
        return JSON.stringify(userJSON);
    }
}

class Users
{
    constructor(...users)
    {
        this.users = users;
    }

    addUser(newUser)
    {
        this.users.push(newUser);
    }
}

class Task
{
    constructor(title, date, pinned)
    {
        this.title = title;
        this.date = date;
        this.pinned = pinned;
    }

    pinList()
    {
        this.pinned = true;
    }

    unpinList()
    {
        this.pinned = false;
    }
}

class TaskList
{
    constructor(title, id, ...tasks)
    {
        this.title = title;
        this.tasks = tasks;
        this.id = id;
        if(tasks === [])
        {
            this.numTasks = 0;
        }
        else
        {
            this.numTasks = tasks.length;    
        }
        this.taskListCard = this.createBlankTaskList();

        const input = this.taskListCard.getElementsByTagName('input');
        input[0].addEventListener('keypress', (event) =>
        {
            if(event.key === "Enter" && (input[0].textContent !== null || input.textContent !== ''))
            {
                event.preventDefault();
                const taskListTitle = document.createElement('a');
                taskListTitle.setAttribute('href', 'cs260-task-last.html');
                taskListTitle.textContent = input[0].value;
                this.taskListCard.replaceChild(taskListTitle, input[0].parentElement);
            }
        });
    }

    createBlankTaskList()
    {
        const taskCard = document.createElement('div');
        taskCard.className = "card";
        
        taskCard.innerHTML += pinIcon;
        
        taskCard.innerHTML += taskListForm;
        
        taskCard.innerHTML += deleteIcon;
        return taskCard;
    }

    addTask(newTask)
    {
        this.tasks.push(newTask);
    }

    removeTask(title)
    {
        for(const [i,task] of tasks)
        {
            if(task.title == title)
            {
                this.tasks.splice(i, task)
                break;
            }
        }
    }

    pinList()
    {
        this.pinned = true;
    }

    unpinList()
    {
        this.pinned = false;
    }


}

export {User, Users, Task, TaskList};