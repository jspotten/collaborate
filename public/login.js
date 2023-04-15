async function loginUser()
{
    const endpoint = `/collaborate/auth/login`;
    const identifier = document.getElementById('userOrEmail')?.value;
    const password = document.getElementById('exUserPassword')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({identifier: identifier, password: password}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const body = await response.json();

    if(response?.status === 200)
    {
        localStorage.setItem('username', body.username);
        window.location.href = 'tasklist.html'
    }
    else
    {
        showErrorModal(body.message);
    }
}
document.getElementById('loginButton').addEventListener('click', loginUser);


async function signUpNewUser()
{
    const endpoint = `/collaborate/auth/generate`;
    const newUser  = 
    {    
        "firstName": document.getElementById('firstName').value,
        "lastName": document.getElementById('lastName').value,
        "email": document.getElementById('email').value,
        "username": document.getElementById('username').value,
        "password": document.getElementById('password').value
    };
    let validInfo = await validateInfo(newUser);
    if(validInfo)
    {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify(
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
            }),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        });
        const body = await response.json();
    
        if(response?.status === 200)
        {
            localStorage.setItem('username', body.username);
            window.location.href = 'tasklist.html'
        }
        else
        {
            showErrorModal(body.message)
        }
    }
    else
    {
        showErrorModal('Error: Invalid Information');
    }
}
document.getElementById('signUpButton').addEventListener('click', signUpNewUser);

function showErrorModal(message)
{
    const modalEl = document.getElementById('errorModal');
    modalEl.querySelector('.modal-body').textContent = `Error: ${message}`;
    const errorModal = new bootstrap.Modal(modalEl, {});
    errorModal.show();
}

async function validateInfo(newUser)
{
    if(newUser.firstName.length === 0 || newUser.firstName === ' ')
    {
        return false;
    }
    else if(newUser.lastName.length === 0 || newUser.lastName === ' ')
    {
        return false;
    }
    else if(newUser.email.length === 0 || !newUser.email.includes('@'))
    {
        return false;
    }
    else if(newUser.username.length === 0 || newUser.username === ' ')
    {
        return false;
    }
    else if(newUser.password.length < 7 || newUser.password === ' ')
    {
        return false;
    }
    return true;
}