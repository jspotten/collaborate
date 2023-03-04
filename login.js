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

const existingUsers =
[
    {firstName: 'Billy', lastName: username: 'billyBob', email: 'billyBob@gmail.com', password: 'Bobbybill'},
    {}
];

const user1 = new User('Billy', 'Bob', 'billyBob', )
const users = new Users();

function existingUser()
{
    
}

function newUser()
{

}