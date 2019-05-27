'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subject_periodSchema = new Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    period: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Period"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('SubjectPeriod', subjectSchema);