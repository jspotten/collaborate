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
const taskListCollection = client.db('collaborate').collection('tasklists');
const taskCollection = client.db('collaborate').collection('tasks');

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
        tasklists: []
    };
    await userCollection.insertOne(user);
    return user;
}

function addTaskList(tasklist)
{
    taskListCollection.insertOne(tasklist)
}

function deleteTaskList(tasklist)
{
    taskCollection.deleteMany({associatedList: task.title});
    taskListCollection.deleteOne(tasklist);
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
    addTaskList,
    deleteTaskList,
    addTask,
    deleteTask,
};