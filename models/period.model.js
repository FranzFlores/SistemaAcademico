'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const periodSchema = new Schema({
    name: {type: String, required:true},
    start : { type: Date, required: true },
    end: { type: Date, required: true }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Period', periodSchema);