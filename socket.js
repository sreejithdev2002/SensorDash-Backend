let ioInstance;

module.exports = {
    init: (server) => {
        const { Server } = require('socket.io');
        ioInstance = new Server(server, {
            cors: { origin: "*"},
        });
        return ioInstance;
    },
    getIO: () => {
        if(!ioInstance) throw new Error("Socket.io not initialized!");
        return ioInstance;
    }
};