const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!username) 
{
    throw Error("Database not configured. Set environment variables");
}

const url = `mongodb+srv://${username}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('collaborate').collection('users');

function getUser(key)
{
    if(key.includes('@'))
    {
        return userCollection.findOne({email: key});
    }
    return userCollection.findOne({username: key});
}

function getUserByToken(token)
{
    return userCollection.findOne({token: token});
}

async function createNewUser(firstName, lastName, email, username, password)
{
    const passwordHash = await bcrypt.hash(password, 10);
    const user = 
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        userID: uuid.v4(),
        tasklists: [],
        notifications: [],
    };
    await userCollection.insertOne(user);
    return user;
}

async function getTaskList(username, listName)
{
    let tasklist = await database.find(
        {tasklists:{$elemMatch:{username : username}}}
    );
    return (tasklist != null) ? tasklist : null;
}

async function addTaskList(associatedUsername, tasklist)
{
    await userCollection.updateOne
    (   
        {username: associatedUsername},
        {$push: {tasklists: tasklist}},
    );
}

async function deleteTaskList(username, listName)
{
    //How to Get Specific Tasklist from tasklists
    //if(!getTaskList(username, listName))
    await userCollection.updateOne
    (
        {listname: username},
        {$pull: {tasklists: listName}},
    );
    return (getTaskList(username, listName)); // ? "fail" : "success";
}


function addTask(task)
{
    taskCollection.insertOne(task);
}

function deleteTask(task)
{
    taskCollection.deleteOne(task);
}

module.exports = 
{
    getUser,
    getUserByToken,
    createNewUser,
    getTaskList,
    addTaskList,
    deleteTaskList,
    addTask,
    deleteTask,
};