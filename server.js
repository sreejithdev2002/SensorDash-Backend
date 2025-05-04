require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const { init } = require('./socket');

const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const flowchartRoutes = require("./routes/flow");

const app = express();
const server = http.createServer(app);
const io = init(server);
app.set('io', io);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/flow", flowchartRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
