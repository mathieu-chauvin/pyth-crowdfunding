const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data").project;
const router = express.Router();
var Web3 = require('web3')
const dbRoute = "mongodb://127.0.0.1:27017/user";

mongoose.connect(dbRoute,
        {useNewUrlParser : true}
        );

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// web3 initialization
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/2b3f64bdc98b4a14a8c65c8bd86b0fb0"));
const stockAddr = "0x044788B6B14928a3355bCC1dc8e77C2A16D846E0";
const ABI = require('./stockABI'); 
console.log(web3);
var contract = new web3.eth.Contract(ABI, stockAddr);
//this is our get method
//this method fetches all available data in our database
router.get("/getProjects", (req, res) => {
    console.log('contract call: ' +JSON.stringify(contract.options.jsonInterface));
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });

        // ask to eth blockchain for jackpot value
        for (d in data) {
            contract.methods._totalStakes(d._id).call().then(console.log);
        }
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
