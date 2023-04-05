const {WebSocketServer} = require('ws');
const uuid = require('uuid');

class Proxy
{
    constructor(httpServer)
    {
        const wss = new WebSocketServer({noServer: true});

        httpServer.on('upgrade', (request, socket, head) =>
        {
            wss.handleUpgrade(request, socket, head, function done(ws)
            {
                wss.emit('connection', ws, request);
            });
        });

        let connections = [];

        wss.on('connection', (ws) =>
        {
            const connection = {id: uuid.v4(), alive: true, ws: ws, username: };
            connections.push(connection);
        
            //How to send message to singular connection;
            //For time, may just send invite to everyone.

            ws.on('close', () =>
            {
                connections.findIndex((o, i) =>
                {
                    if(o.id === connection.id)
                    {
                        connections.splice(i, 1);
                        return true;
                    }
                });
            });
        
            ws.on('pong', () =>
            {
                connection.alive = true;
            });
        });

        setInterval(() => 
        {
            connections.forEach((connect) =>
            {
                if(!connect.alive)
                {
                    connect.ws.terminate();
                }
                else
                {
                    connect.alive = false;
                    connect.ws.ping();
                }
            });
        });
    }   
}

module.exports = {Proxy};