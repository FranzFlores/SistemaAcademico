'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    note: { type: String, required: true },
    start_unit: { type: String, required: true },
    end_unit: { type: String, required: true },
    status: { type: Boolean, default: true },
   
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Student', studentSchema);