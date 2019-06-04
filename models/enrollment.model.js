'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
    final_note: { type: Number, required: true,default:0.00 },
    attendance_percentage: { type: Number, required: true,default:0.00},
    status: { type: String, required:true,default:"En Curso" },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Enrollment', enrollmentSchema);