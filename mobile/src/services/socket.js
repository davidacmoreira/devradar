import socketio from 'socket.io-client';

import content_config from '../../config.json';


const ip = 'http://' + content_config.LOCAL_IP + ':' + content_config.PORT_BACKEND;

const socket = socketio(ip, {
    autoConnect: false
});

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
};

function connect(latitude, longitude, maxDistance, techs) {
    try {
        socket.io.opts.query = {
            latitude, longitude, maxDistance, techs
        };

        socket.connect();
    }
    catch (err) {
        console.log(err)
    }
};

function disconnect() {
    try {
        if (socket.connected) {
            socket.disconnect();
        }
    }
    catch (err) {
        console.log(err)
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};