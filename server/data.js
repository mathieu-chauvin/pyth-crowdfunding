// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
        {
            id: Number,
            pseudo: String,
            name: String,
            firstname: String
        }
        );

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", UserSchema);

