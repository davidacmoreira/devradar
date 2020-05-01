const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    try {
        io = socketio(server);

        io.on('connection', socket => {
            const { latitude, longitude, maxDistance, techs } = socket.handshake.query;

            connections.push({
                id: socket.id,
                coordinates: {
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                },
                maxDistance: Number(maxDistance),
                techs: parseStringAsArray(techs)
            });
        });
    }
    catch (err) {
        console.log(err);
    }
};

exports.findConnections = (coordinates, techs) => {
    try {
        return connections.filter(connection => {
            return calculateDistance(coordinates, connection.coordinates) < connection.maxDistance
                && connection.techs.some(item => techs.includes(item))
        });
    }
    catch (err) {
        console.log(err);
    }
};

exports.sendMessage = (to, message, data) => {
    try {
        to.forEach(connection => {
            io.to(connection.id).emit(message, data);
        });
    }
    catch (err) {
        console.log(err);
    }
};