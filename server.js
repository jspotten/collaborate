const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
const database = require('./database');
const { Proxy } = require('./proxy');
const cookieName = 'authToken';
const portNum = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router;
app.use(`/collaborate`, apiRouter);

apiRouter.post(`/auth/generate`, async (req, resp) =>
{
    if(await (database.getUser(req.body.email) || database.getUser(req.body.username)))
    {
        resp.status(409).send({message: 'User Already Exists'});
    }
    else
    {
        const user = await database.createNewUser
        (
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.username,
            req.body.password   
        );
        setUserCookie(resp, user.token);
        resp.send({id: user.id,})
    }
});

