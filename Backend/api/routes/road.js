const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/auth");

const Road = require("../models/road");

// Signup API
router.post("/addRoad", (req, res) => {
  const { name, latitude, longitude, roadType } = req.body;
  console.log(req.body);
  const newRoad = new Road({
    name,
    latitude,
    longitude,
    roadType
  });
  Road.findOne({ name })
    .then(road => {
      if (road) return res.status(400).json({ msg: "Road Already exists" });
      //return res.status(200).json({ msg: "fhgfc Road Already exists" });
    })
    .catch(err => {
      console.log(err);
    });
  newRoad
    .save()
    .then(() => {
      return res.status(200).json({
        msg: "road addded sucessfull"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/getAllRoads", (req, res) => {
  Road.find()
    .exec()
    .then(roads => {
      if (roads) {
        res.status(200).json({
          roads: roads
        });
      } else {
        res.status(404).json({
          message: "no entry found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
