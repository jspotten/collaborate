const { MongoClient } = require('mongodb');

const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!username) 
{
    throw Error("Database not configured. Set environment variables");
}