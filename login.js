import {User, Users, Task, TaskList} from './main.js';
export {existingUserLogin, newUserCreation};

const taskList = new TaskList("CS 260 HW", false, new Task("Startup JS", new Date('March 10, 2023 11:59:59')))
const user1 = new User('Billy', 'Bob', 'billyBob', 'billyBob@gmail.com', 'Bobbybill', [taskList]);
const user2 = new User('Jackie', 'Chan', 'jackieC', 'jackie.chan@hotmail.com', 'jackieR0cks!', [taskList]);
const user3 = new User('Lizia', 'Stuart', 'lizia99', 'lizia.stuart@outlook.com', '\$myPassw0rd', [taskList]);
const existingUsers = new Users(user1, user2, user3);

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

}
document.getElementById('signupButton').addEventListener('click', newUserCreation);