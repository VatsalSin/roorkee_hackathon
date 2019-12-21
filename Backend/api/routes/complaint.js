const express = require("express");
const router = express.Router();

// const ipfsAPI = require("ipfs-api");
// const fs = require("fs");

// //Connceting to the ipfs network via infura gateway
// const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

// //Reading file from computer
// let testFile = fs.readFileSync("PATH_OF_FILE");
// //Creating buffer for ipfs function to add file to the system
// let testBuffer = new Buffer(testFile);

//Addfile router for adding file a local file to the IPFS network without any local node
// app.get("/addfile", function(req, res) {
//   ipfs.files.add(testBuffer, function(err, file) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(file);
//   });
// });
// //Getting the uploaded file via hash code.
// app.get("/getfile", function(req, res) {
//   //This hash is returned hash of addFile router.
//   const validCID = "HASH_CODE";

//   ipfs.files.get(validCID, function(err, files) {
//     files.forEach(file => {
//       console.log(file.path);
//       console.log(file.content.toString("utf8"));
//     });
//   });
// });

const checkAuth = require("../middleware/auth");

const Complaint = require("../models/complaint");

// Signup API
router.post("/addComplaint", (req, res) => {
  const { userID, roadID } = req.body;
  const newComplaint = new Complaint({
    userID,
    roadID
  });
  newComplaint
    .save()
    .then(complaint => {
      return res.status(200).json({
        id: complaint.id,
        msg: "complaint addded sucessfull"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        msg: "error"
      });
    });
});

router.get("/getUserComplaint/:userID", (req, res) => {
  const userID = req.params.userID;
  Complaint.find({ userID: userID })
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

router.get("/getAllComplaint", (req, res, next) => {
  Complaint.find()
    .exec()
    .then(complaints => {
      if (complaints) {
        return res.status(200).json({
          complaints: complaints
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

router.get("/viewComplaint/:complaintID", (req, res, next) => {
  const complaintID = req.params.complaintID;
  Complaint.find({ _id: complaintID })
    .exec()
    .then(complaint => {
      return res.status(200).json({
        complaint: complaint
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/acceptComplaint/:complaintID", (req, res, next) => {
  const complaintID = req.params.complaintID;
  Complaint.find({ _id: complaintID })
    .exec()
    .then(complaint => {
      return res.status(200).json({
        complaint: complaint
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/rejectComplaint/:complaintID", (req, res, next) => {});

module.exports = router;
