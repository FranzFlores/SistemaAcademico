'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Account', accountSchema);