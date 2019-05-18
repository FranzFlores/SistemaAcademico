'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    enrollment_code: { type: String, required: true },
    Final_note: { type: String, required: true },
    attendance_percentage: { type: String, required: true },
    status: { type: String, required: true },
    status: { type: Boolean, default: true },
   
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Student', studentSchema);