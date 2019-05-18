'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    start : { type: String, required: true },
    end: { type: String, required: true },
    status: { type: Boolean, default: true },
   
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Student', studentSchema);