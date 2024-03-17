const mongoose = require('mongoose');
const objId = mongoose.Types.ObjectId
const walletSchema = new mongoose.Schema({
    ofUser: {
        type: objId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    deposit: {
        type: Number,
        required: true,
        default: 0
    },
    winning: {
        type: Number,
        required: true,
        default: 0
    },
    bonus: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [{
        to: {
            type: objId,
            ref: "User"
        },
        from: {
            type: objId,
            ref: "User"
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        status: [{
            status: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true,
                default: Date.now()
            },
        }]
    }]
}, { timestamps: true });
const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;