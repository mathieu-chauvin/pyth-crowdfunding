const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data").project;
const router = express.Router();

const dbRoute = "mongodb://127.0.0.1:27017/user";

mongoose.connect(dbRoute,
        {useNewUrlParser : true}
        );

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//this is our get method
//this method fetches all available data in our database
router.get("/getProjects", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

//this is our get method
//this method fetches all available data in our database
router.get("/getProject", (req, res) => {
    const id = req.query.id;
    Data.findById(id, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});


//this is our update method
//this method overwrites existing data in our database
router.post("/updateProject", (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    const { id, update} = req.body;
    let updateObj=update;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
    console.log('Update : '+JSON.stringify(updateObj));
Data.findOneAndUpdate({_id:id}, updateObj, {new:true}, (err,doc) => {
        if (err) return res.json({ success: false, error: err });
        if (!doc) {
            let newObj = updateObj;
            Data.create(updateObj)
              .then((doc) => {return res.json({ success: true, mode:'created', data:JSON.stringify(doc)  });}); 
        }
        else {
            return res.json({ success: true, mode:'updated',data:JSON.stringify(doc) });
        }
    });
});

//this is our create methid
//this method adds new data in our database
router.post("/registerProject", (req, res) => {
    let data = new Data();
    console.log(JSON.stringify(req.body));
    const { name, description, owner } = req.body;
    /*if ((!id && id !== 0)) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }*/
    data.description = description;
    data.owner = owner;
    data.name = name;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, dataOut: data });
    });
});

module.exports = router;
