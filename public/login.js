import {User, Users, Task, TaskList} from './main.js';
export {existingUserLogin, newUserCreation};

(async () =>
{
    const identifier = localStorage.getItem('identifier');
    if(identifier)
    {
        const identifierEl = document.getElementById('userOrEmail')
        identifierEl.value = identifier;
        const user = await getUser(identifierEl.value);
    }
});

async function loginUser()
{
    const endpoint = `/collaborate/auth/login`;
    const identifier = document.getElementById('userOrEmail')?.value;
    const password = document.getElementById('exUserPassword')?.value;
    //const usersOnFile = JSON.parse(localStorage.getItem('allUsers'));
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({identifier: identifier, password: password}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const body = await response.json();

    if(response?.status === 200)
    {
        localStorage.setItem('identifier', body.username);
        window.location.href = 'tasklist.html'
    }
    else
    {
        const modalEl = document.getElementById('errorModal');
        modalEl.querySelector('.modal-body').textContent = `Error: ${body.message}`;
        const errorModal = new bootstrap.Modal(modalEl, {});
        errorModal.show();
    }
}
document.getElementById('loginButton').addEventListener('click', loginUser);

function signUpNewUser()
{
    const newUser  = new User
    (
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('username').value,
        document.getElementById('email').value,
        document.getElementById('password').value
    );
    
    let complete = true;
    for(const userVars in newUser)
    {
        if(userVars === '')
        {
            complete = false;
            return;
        }
    }

    if(complete)
    {
        let usersData = (JSON.parse(localStorage.getItem('allUsers')));
        let usersOnFile = new Users(...usersData.users);
        usersOnFile.addUser(newUser);
        localStorage.setItem('allUsers', JSON.stringify(usersOnFile));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'tasklist.html';
    }
}
document.getElementById('signUpButton').addEventListener('click', signUpNewUser);