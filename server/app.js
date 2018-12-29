const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://127.0.0.1:27017/user";

mongoose.connect(dbRoute,
        {useNewUrlParser : true}
        );

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//(optional) only made for logging and
//bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

//this is our get method
//this method fetches all available data in our database
router.get("/getProfiles", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

//this is our get method
//this method fetches all available data in our database
router.get("/getProfile", (req, res) => {
    const id = req.query.id;
    Data.findById(id, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});


//this is our update method
//this method overwrites existing data in our database
router.post("/updateProfile", (req, res) => {
    const { id, update} = req.body;
    let updateObj=JSON.parse(update);
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
    console.log('Update : '+JSON.stringify(updateObj));
Data.findOneAndUpdate({_id:id}, updateObj, {new:true}, (err,doc) => {
        if (err) return res.json({ success: false, error: err });
        if (!doc) {
            let newObj = updateObj;
            newObj._id=id;
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
router.post("/registerProfile", (req, res) => {
    let data = new Data();
    console.log(JSON.stringify(req.body));
    const { id, pseudo,ethAccount, firstname, name } = req.body;
    /*if ((!id && id !== 0)) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }*/
    data.pseudo = pseudo;
    data._id = ethAccount;
    data.name = name;
    data.firstname = firstname;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//append /api for our http requests
app.use("/api", router);

//launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

