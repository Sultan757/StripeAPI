const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const server = require("http").createServer(app);

app.use(cors());

const PORT = process.env.PORT || 5001;

app.use(bodyParser.json()); // //support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
app.use("/api", require("./routes/paymentRoutes"));

app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.send("server running");
});
app.use("*", (req, res) => {
  res.send("Route not found");
});

server.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});
