'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    numCredit: { type: String, required: true },
    curriculum_cycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurriculumCycle"
    },
    subject_teacher:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubjectTeacher"
    }],
    subject_period:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubjectPeriod"
    }],
    unites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unity"
    }]
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Subject', subjectSchema);