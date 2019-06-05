'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    numCredit: { type: String, required: true },
    curriculum_cycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurriculumCycle"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Subject', subjectSchema);