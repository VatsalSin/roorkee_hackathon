const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const app = express();

const db = config.get("mongoURI");

const userRoutes = require("./api/routes/user");
const roadRoutes = require("./api/routes/road");
const complaintRoutes = require("./api/routes/complaint");
const progressRoutes = require("./api/routes/progress");

// Connecting to database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));
//set mongoose's Promise equal to global Promise since mongoose's Promise version is depricated
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// Routes to handle requests
app.use("/user", userRoutes);
app.use("/road", roadRoutes);
app.use("/progress", progressRoutes);
app.use("/complaint", complaintRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//error handling middleware
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

module.exports = app;
