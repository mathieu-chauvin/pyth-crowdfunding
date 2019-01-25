const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const bdd = require("./data");
const Data = bdd.project;
const router = express.Router();
const User = bdd.user;
const config = require("./config");
var Web3 = require('web3')

mongoose.connect(config.dbRoute,
    {useNewUrlParser : true}
        );

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// web3 initialization
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/2b3f64bdc98b4a14a8c65c8bd86b0fb0"));
const stockAddr = config.stockAddr;
const ABI = require('../abis/stockABI'); 
var contract = new web3.eth.Contract(ABI, stockAddr);
//this is our get method
//this method fetches all available data in our database

async function getBasicData (data) {
        let d = data;
   for (let i =0; i < data.length; i++) {
        await contract.methods._totalStakes('0x'+d[i]._id.toString()).call().then((res) => {
            d[i].jackpot = res
            console.log('res:',res);
   //console.log(JSON.stringify(d[i]));
        }); 
       }
   //console.log(JSON.stringify(d));
    return { success: true, data: d };
 
}


async function getFullData (proj) {
        console.log('proj:'+JSON.stringify(proj));
        var projRes = {
            _id : proj._id,
            name: proj.name,
            description: proj.description,
            participants:  proj.participants,
            contributors:  {},
            date: proj.date,
            owner:proj.owner,
            jackpot :0
        };
        console.log('projres:'+JSON.stringify(projRes));

        // get Jackpot
        await contract.methods._totalStakes('0x'+projRes._id).call().then((res) => {
            projRes.jackpot = res
        });

        //get contributors with their contribution
        projRes.contributors = []
            let mapProj = new Map();
           console.log('projres:'+JSON.stringify(projRes));
            for (let i =0; i < proj.contributors.length; i++) {
           console.log('contributor '+i);
           let contributor = proj.contributors[i]._id; 
            await contract.methods._stakes('0x'+projRes._id, contributor).call().then((res) => {
               console.log(JSON.stringify('c:'+res));
                projRes.contributors[i] = {_id:contributor, name: proj.contributors[i].name, pseudo: proj.contributors[i].pseudo, firstName: proj.contributors[i].name, contribution:res};
            });

        }

       return { success: true, data: projRes};
 
}

router.get("/getProjects", (req, res) => {
    //console.log('contract call: ' +JSON.stringify(contract.options.jsonInterface));
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });

        // ask to eth blockchain for jackpot value
        return new Promise((resolve,reject) => {
                getBasicData(data).then((data) => {resolve(res.json(data)) });
        });
    });
});

//this is our get method
//this method fetches all available data in our database
router.get("/getProject", (req, res) => {
    const id = req.query.id;
    Data.findById(id).populate('participants').populate('contributors').exec( (err, data) => {
        if (err || !data) return res.json({ success: false, error: err });
        return new Promise((resolve,reject) => {
                getFullData(data).then((data) => {resolve(res.json(data)) });
        });
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

//this is our update method
//this method overwrites existing data in our database
router.post("/addContributor", (req, res) => {
    const { id, contributor } = req.body;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        doc.contributors.push(contributor)
        doc.save( (err, doc) => {
            if (err || !doc) return res.json({ success: false, error: err });
            return res.json({ success: true,data:JSON.stringify(doc) });
        });
    });
});

router.post("/removeContributor", (req, res) => {
    const { id, contributor } = req.body;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        doc.contributors.pull(contributor)
        doc.save( (err, doc) => {
            if (err || !doc) return res.json({ success: false, error: err });
            return res.json({ success: true,data:JSON.stringify(doc) });
        });
    });
});

//this is our update method
//this method overwrites existing data in our database
router.post("/getContributors", (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    const id = req.query.id;
    Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        console.log('going to populate '+JSON.stringify(doc))
        doc.populate('contributors').exec(  (err, doc) => {
                if (err || !doc) return res.json({ success: false, error: err });
                console.log('populated :'+doc);
            return res.json({ success: true,data:JSON.stringify(doc) });
            });
    });
});
//this is our update method
//this method overwrites existing data in our database
router.post("/addParticipant", (req, res) => {
    const { id, participant } = req.body;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        doc.participants.push(participant)
        doc.save( (err, doc) => {
            if (err || !doc) return res.json({ success: false, error: err });
            return res.json({ success: true,data:JSON.stringify(doc) });
        });
    });
});

router.post("/removeParticipant", (req, res) => {
    const { id, participant } = req.body;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        doc.participants.pull(participant)
        doc.save( (err, doc) => {
            if (err || !doc) return res.json({ success: false, error: err });
            return res.json({ success: true,data:JSON.stringify(doc) });
        });
    });
});

//this is our update method
//this method overwrites existing data in our database
router.post("/getParticipants", (req, res) => {
    console.log('body:'+JSON.stringify(req.body));
    const { id } = req.body;
        //.catch((e) => {console.log(e);  return res.json({ success: false, error: err })});
Data.findById(id, (err,doc) => {
        if (err || !doc) return res.json({ success: false, error: err });
        doc.populate('participants',  (err, doc) => {
                if (err || !doc) return res.json({ success: false, error: err });
                console.log('populated :'+doc);
            return res.json({ success: true,data:JSON.stringify(doc) });
            });
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
