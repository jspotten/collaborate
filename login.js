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

const user1 = new User('Billy', 'Bob', 'billyBob', 'billyBob@gmail.com', 'Bobbybill');
const user2 = new User('Jackie', 'Chan', 'jackieC', 'jackie.chan@hotmail.com', 'jackieR0cks!');
const user3 = new User('Lizia', 'Stuart', 'lizia99', 'lizia.stuart@outlook.com', '\$myPassw0rd');
const existingUsers = new Users(user1, user2, user3);

function existingUserLogin()
{
    const loginKey = document.getElementById('#userOrEmail');
    const password = document.getElementById('exUserPassword');
    for(const user of existingUsers)
    {
        if(user.username === loginKey || user.email === loginKey)
        {
            if(user.password === password)
            {
                window.location.href = 'index.html';
            }
        }
    }
}

function newUserCreation()
{

}