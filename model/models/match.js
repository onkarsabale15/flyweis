const mongoose = require("mongoose");
const objId = mongoose.Types.ObjectId;
const matchSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    matchName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    teams:{
        team1:{
            type:String,
            required: true
        },
        team2:{
            type: String,
            required: true
        }
    }
})
const Match = mongoose.model("Match", matchSchema);
module.exports = Match;