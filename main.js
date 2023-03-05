class User
{
    constructor(firstName, lastName, email, username, password, taskLists)
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
    constructor(pinned, ...tasks)
    {
        this.tasks = tasks;
        this.pinned = pinned;
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