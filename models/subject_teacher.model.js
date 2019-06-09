'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subject_teacherSchema = new Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher"
    },
    unities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unity"
    }]
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('SubjectTeacher', subject_teacherSchema);