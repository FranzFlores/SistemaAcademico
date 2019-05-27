'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    topic: { type: String, required: true },
    date: { type: Date, required: true },
    parallel: { type: String, required: true },
    status: { type: Boolean, default: true },
   
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Class', classSchema);