const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/auth");

const Progress = require("../models/progress");

// Signup API
router.post("/addProgress", (req, res) => {
  const { userID, roadID } = req.body;
  const newProgress = new Progress({
    userID,
    roadID
  });
  newProgress
    .save()
    .then(() => {
      return res.status(200).json({
        msg: "progress addded sucessfull"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "error"
      });
    });
});

router.get("/getUserProgress/:userID", (req, res) => {
  const userID = req.params.userID;
  Progress.find({ userID: userID })
    .populate("user", "_id name")
    .populate("roads")
    .exec()
    .then(roads => {
      if (roads.length === 0) {
        return res.status(404).json({
          message: "No roads found"
        });
      }
      return res.status(200).json({
        roads: roads
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/getAllProgress", (req, res, next) => {
  Progress.find()
    .exec()
    .then(progress => {
      if (progress) {
        return res.status(200).json({
          progress: progress
        });
      } else {
        return res.status(404).json({
          message: "no entry found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/viewProgress/:complaintID", (req, res, next) => {});

router.get("/acceptProgress/:complaintID", (req, res, next) => {});

router.get("/rejectProgress/:complaintID", (req, res, next) => {});

module.exports = router;
