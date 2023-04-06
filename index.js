const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
const database = require('./database.js');
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
        resp.send({username: user.username, id: user.id,})
    }
});


apiRouter.post(`/auth/login`, async (req, resp) =>
{
    const user = await database.getUser(req.body.identifier);
    if(user)
    {
        if(await bcrypt.compare(req.body.password, user.password))
        {
            setUserCookie(resp, user.token);
            resp.send({username: user.username, id: user._id});
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

secureAPIRouter.post(`/createShared`, async (req, resp) =>
{
    await database.createShared(
        req.body.username,
        req.body.listname
    );
    resp.status(200).send({message: "Success"});
});

secureAPIRouter.post(`/addShared`, async (req, resp) =>
{
    await database.addShared(
        req.body.username,
        req.body.listname,
        req.body.invited
    );
    resp.status(200).send({message: "Success"});
});

secureAPIRouter.get(`/getShared/:username`, async (req, resp) =>
{
    const shared = await database.getShared(req.params.username);
    if(shared)
    {
        resp.status(200).send({shared: shared});
    }
    else
    {
        resp.status(404).send({message: 'No lists shared with that user.'});
    }
});

secureAPIRouter.get(`/findUser/:username`, async (req, resp) =>
{
    const user = await database.getUser(req.params.username);
    if(user)
    {
        resp.status(200).send({found: true});
    }
    else
    {
        resp.status(404).send({message: ""})
    }
});

secureAPIRouter.get(`/getUserID/:username`, async (req, resp) =>
{
    const user = await database.getUser(req.params.username);
    if(user)
    {
        resp.status(200).send({userID: user.userID});
    }
    else
    {
        resp.status(404).send({message: 'Unknown User'});
    }
});


secureAPIRouter.post(`/addlist`, async (req, resp) =>
{
    const listID = await database.addTaskList(req.body.userID, req.body.listname);
    if(listID != 0)
    {
        resp.status(200).send({listID: listID});
    }
    else
    {
        resp.status(409).send({message: "Error While Adding List!"});
    }    
});

secureAPIRouter.delete(`/deletelist/:userID/:listname`, async (req, resp) =>
{
    const deleted = await database.deleteTaskList(req.params.userID, req.params.listname);
    if(deleted)
    {
        resp.status(200).send({message: "Tasklist Successfully Deleted"})
    }
    else
    {
        resp.status(409).send({message: "Tasklist Unsuccessfully Deleted"})
    }
});

secureAPIRouter.get(`/getlist/:list`, async (req, resp) =>
{
    const list = await database.getTaskList(req.params.list);
    if(tasklist)
    {
        resp.status(200).send({tasklist: list});
    }
    else
    {
        resp.status(404).send({ message: 'Tasklist Not Found'});
    }
});

secureAPIRouter.get(`/getlists/:userID`, async (req, resp) =>
{
    //Not recognizing my function that is clearly written in database.js
    const lists = await database.getTaskLists(req.params.userID);
    if(lists)
    {
        resp.status(200).send({tasklists: lists});
    }
    else
    {
        resp.status(404).send({message: "No Tasklists Associated with that User ID."});
    }
});


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


const httpService = app.listen(portNum, () =>
{
    console.log(`Listening on port ${portNum}`);
});


new Proxy(httpService);