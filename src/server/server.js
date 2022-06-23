const express = require('express');
const middleWare = require('../config/middleware.js');
const routes = require('../config/router.js');

const port = '3000';
const app = express();

middleWare.init(app);

routes.init(app);

app.on('error', (error) => {
    console.error('error :>> ', error);
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

setInterval(() => server.getConnections(
    (err, connections) => console.log(`${connections} connections currently open`)
), 1000);

let connections = [];

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

server.on('connection', connection => {
    console.log('Connected to mongoDB');
    connections.push(connection);
    connection.on('close', () => {
        connections = connections.filter(curr => curr !== connection)
    });

});

