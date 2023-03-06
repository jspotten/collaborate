import {User, Users, Task, TaskList} from './main.js';
export {existingUserLogin, newUserCreation};

const taskList = new TaskList("CS 260 HW", false, new Task("Startup JS", new Date('March 10, 2023 11:59:59')))
const user1 = new User('Billy', 'Bob', 'billyBob', 'billyBob@gmail.com', 'Bobbybill', [taskList]);
const user2 = new User('Jackie', 'Chan', 'jackieC', 'jackie.chan@hotmail.com', 'jackieR0cks!', [taskList]);
const user3 = new User('Lizia', 'Stuart', 'lizia99', 'lizia.stuart@outlook.com', '\$myPassw0rd', [taskList]);
//const existingUsers = new Users(user1, user2, user3);
localStorage.setItem("allUsers", new Users(user1, user2, user3));
const existingUsers = localStorage.getItem("allUsers").entries();

function existingUserLogin()
{
    const loginKey = document.getElementById('userOrEmail').value;
    const password = document.getElementById('exUserPassword').value;
    for(const user of existingUsers.users)
    {
        if(user.username === loginKey || user.email === loginKey)
        {
            if(user.password === password)
            {
                localStorage.setItem("currentUser", user);
                window.location.href = 'index.html';
                break;
            }
        }
    }
}
document.getElementById('loginButton').addEventListener('click', existingUserLogin);

function newUserCreation()
{
    const newUser  = new User
    (
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('email').value,
        document.getElementById('username').value,
        document.getElementById('password').value
    );
    
    let complete = true;
    for(const userVars in newUser)
    {
        if(userVars === '')
        {
            complete = false;
            break;
        }
    }

    if(complete)
    {
        existingUsers.addUser(newUser);
        console.log(existingUsers);
        localStorage.setItem("currentUser", newUser);
        //window.location.href = 'index.html';
    }
}
document.getElementById('signUpButton').addEventListener('click', newUserCreation);