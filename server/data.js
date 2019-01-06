// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
        {
            _id: String,
            pseudo: String,
            name: String,
            firstName: String
        }
        );
const ProjectSchema = new Schema(
        {
            name: String,
            description: String,
            participants:  [{ type: String, ref: 'UserSchema' }],
            date: {type: Date, default:Date.now },
            owner: String
        }
        );


// export the new Schema so we could modify it using Node.js
module.exports.user = mongoose.model("Data", UserSchema);
module.exports.project = mongoose.model("Project", ProjectSchema);
