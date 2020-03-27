const socketio = require('socket.io');
import Utils from './utils/Utils';

const connections = [];

exports.setupWebsocket = (server) => {
    const io = socketio(server);
    
    io.on('connection', socket =>{
        const { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: Utils.parseStringAsArray(techs),
        });
    });
};


exports.findConnections = (coordinates, techs) => {
        return connections.filter(connection => {
          return (
            Utils.calculateDistance(coordinates, connection.coordinates) < 10 &&
            connection.techs.some(tech => techs.includes(tech))
          );
        });
      }