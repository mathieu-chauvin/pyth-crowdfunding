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

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", UserSchema);

