const pinIcon = `<i id = "star" onclick = "window.location.href = 'cs260-task-last.html';">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                            0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525
                            0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                </i>`;

const deleteIcon = `<i id = "star" onclick = "window.location.href = 'cs260-task-last.html';">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.3vw" height="2.3vw" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                                0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525
                                0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
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
        this.taskCard = this.createBlankTaskList();
    }

    createBlankTaskList()
    {
        const taskCard = document.createElement('div');
        taskCard.className = "card";
        
        taskCard.innerHTML += pinIcon;
        
        taskCard.innerHTML += taskListForm;
        const input = taskCard.getElementsByTagName('input');
        input[0].addEventListener('keypress', function(e)
        {
            if(e.key === "Enter" && (input[0].textContent !== null || input.textContent !== ''))
            {
                e.preventDefault();
                const taskListTitle = document.createElement('a');
                taskListTitle.setAttribute('href', 'cs260-task-last.html');
                taskListTitle = input[0].textContent;
                taskCard.replaceChild(taskListTitle, input[0].parentElement);
            }
        });

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