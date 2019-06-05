'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cycleSchema = new Schema({
    number: { type: Number, required: true},
    name: {type: String, required:true}
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Cycle', cycleSchema);