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
const userCollection = client.db('collaborate').collection('user');
const taskListCollection = client.db('collaborate').collection('tasklist');
const taskCollection = client.db('collaborate').collection('task');
const sharedCollection = client.db('collaborate').collection('shared');
const notificationCollection = client.db('collaborate').collection('notification');

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
    };
    await userCollection.insertOne(user);
    return user;
}


async function addTaskList(userId, listName)
{
    const taskListID = uuid.v4();
    taskListCollection.insertOne
    ({
        userID: userId,
        listname: listName,
        listID: taskListID,
    })
    return taskListID;
}

async function deleteTaskList(userId, listName)
{
    const result = await taskListCollection.deleteOne({userID: userId, listname: listName});
    return (result.ok === 1) ? true : false;
}

async function getTaskList(listName)
{
    const taskList = taskListCollection.findOne({listname: listName});
    return taskList;
}

async function getTaskLists(userId)
{
    const cursor = taskListCollection.find({userID: userId});
    return cursor.toArray();
}

async function createShared(username, listName)
{
    sharedCollection.insertOne
    ({
        owner: username,
        listname: listName,
        shared: [],
    });
}

async function addShared(username, listName, invited)
{
    await sharedCollection.updateOne(
        {$and: [{owner: username}, {listname: listName}]},
        {$push: {shared: invited}},
    );
}

async function findShared(username)
{
    const sharedLists = await sharedCollection.find(
        {shared: [username]}//, {$elemMatch: username}
    );
}


// async function addTask(task)
// {
//     await taskCollection.insertOne(task);
//     return task;
// }

// async function deleteTask(task)
// {
//     const result = await taskCollection.deleteOne(task);
//     return (result.ok === 1) ? true : false;
// }

// async function getTask(_task)
// {
//     const task = await taskCollection.findOne(_task)
//     return task;
// }

module.exports = 
{
    getUser,
    getUserByToken,
    createNewUser,
    addTaskList,
    deleteTaskList,
    getTaskList,
    getTaskLists,
    createShared,
    addShared,
    // addTask,
    // deleteTask,
    // getTask
};