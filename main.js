class User
{
    constructor(firstName, lastName, email, username, password)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
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

class Users extends User
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

}

class TaskList
{

}

export {User, Users, Task, TaskList};