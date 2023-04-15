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

        // async function getSharedLists(username)
        // {
        //     const endpoint = `/collaborate/getShared/${username}`;
        //     const response = await fetch(endpoint, {
        //         method: 'get',
        //         headers: {'Content-type': 'application/json; charset=UTF-8'},
        //     })
        //     const respBody = await response.json();
        //     if(response?.status === 200)
        //     {
        //         return respBody.shared;
        //     }
        //     else
        //     {   
        //         return null;
        //     }
        // }

        let connections = [];

        wss.on('connection', (ws) =>
        {
            //add username to connection
            const connection = {id: uuid.v4(), alive: true, ws: ws};
            connections.push(connection);
        
            ws.on('message', function message(data) {
                connections.forEach((c) => {
                  if (c.id !== connection.id) {
                    c.ws.send(data);
                  }
                });
            });

            //How to send message to singular connection;
            //For time, may just send invite to everyone.
            // ws.on('message', function privateInvite(data) 
            // {
                
            // });

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
        }, 10000);
    }   
}

module.exports = {Proxy};