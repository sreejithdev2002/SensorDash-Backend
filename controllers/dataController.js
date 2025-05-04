const DataPoint = require('../models/DataPoint');

let interval;

const startSimulator = (io) => {
    if(interval) return;

    interval = setInterval(async () => {
        const value = Math.floor(Math.random() * 100);
        const data = new DataPoint({ value }); 
        await data.save();
        io.emit('new-data', {
            timestamp: data.timestamp,
            value: data.value
        });
    }, 2000);
};

const stopSimulator = () => {
    if(interval) {
        clearInterval(interval);
        interval = null;
    }
};


const Start = (req, res) => {
    startSimulator(req.app.get('io'));
    res.status(200).json({
        message: 'Simulator started'
    });
};


const Stop = (req, res) => {
    stopSimulator();
    res.status(200).json({
        message: 'Simulator Stopped'
    });
};

const History = async (req, res) => {
    const data = await DataPoint.find().sort({ timestamp: -1}).limit(20);
    res.json(data.reverse());
};

module.exports = { Start, Stop, History };