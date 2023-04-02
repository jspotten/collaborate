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

const apiRouter = express.Router();
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

apiRouter.post(`/auth/login`, async (req, resp) =>
{
    const user = await ((req.body.username == null)
        ? database.getUser(req.body.email) 
        : database.getUser(req.body.username));
    if(user)
    {
        if(await bcrypt.compare(req.body.password, user.password))
        {
            setUserCookie(resp, user.token);
            resp.send({id: user.id});
            return;
        }
    }
    resp.status(401).send({message: 'Access Not Granted'});
});

apiRouter.delete(`/auth/logout`, (_req, resp) =>
{
    resp.clearCookie(cookieName);
    resp.status(204).end();
});

apiRouter.get(`/user/:email`, async (req, resp) =>
{
    const user = await ((req.body.username == null)
    ? database.getUser(req.body.email) 
    : database.getUser(req.body.username));
    if(user)
    {
        const token = req?.cookies.token;
        if(user.email != null)
        {
            resp.send({email: user.email, authenticated: token === user.token});
        }
        else
        {
            resp.send({username: user.username,
                authenticated: token === user.token});
        }
        return;
    }
    resp.send(404).send({message: 'Unknown User'});
});

var secureAPIRouter = express.Router();
apiRouter.use(secureAPIRouter);

secureAPIRouter.use(async (req, resp, next) =>
{
    const authToken = req.cookies[cookieName];
    const user = await database.getUserByToken(authToken);
    if(user)
    {
        next();
    }
    else
    {
        resp.status(401).send({message: 'Access Not Granted'});
    }
});

/*
 * Add some specific endpoints for things only users get access to.
 *
 * 1: Endpoint to receive gather number of users with shared list.
 * 2: Endpoint for list of people invited to join list.
 * 3: Endpoint to submit a new invitation.
 */ 

app.use((err, req, resp, next) => 
{
    resp.status(500).send({type: err.name, message: err.msg});
});

app.use((_req, resp) =>
{
    resp.sendFile('index.html', {root: 'public'});
});

function setUserCookie(resp, authToken)
{
    resp.cookie(cookieName, authToken, 
    {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () =>
{
    console.log(`Listening on port ${portNum}`);
});

new Proxy(httpService);