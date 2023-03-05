import {User, Users, Task, TaskList} from './main.js';
export {existingUserLogin, newUserCreation};

const user1 = new User('Billy', 'Bob', 'billyBob', 'billyBob@gmail.com', 'Bobbybill');
const user2 = new User('Jackie', 'Chan', 'jackieC', 'jackie.chan@hotmail.com', 'jackieR0cks!');
const user3 = new User('Lizia', 'Stuart', 'lizia99', 'lizia.stuart@outlook.com', '\$myPassw0rd');
const existingUsers = new Users(user1, user2, user3);

function existingUserLogin()
{
    console.log("hi");
    const loginKey = document.getElementById('#userOrEmail');
    const password = document.getElementById('#exUserPassword');
    for(const user of existingUsers)
    {
        if(user.username === loginKey.textContent || user.email === loginKey.textContent)
        {
            if(user.password === password)
            {
                localStorage.setItem("currentUser", user);
                window.location.href = 'index.html';
            }
        }
    }
}
document.getElementById('loginButton').addEventListener('click', existingUserLogin);

function newUserCreation()
{

}

document.getElementById('signupButton').addEventListener('click', newUserCreation);

