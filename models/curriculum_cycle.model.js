'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const curriculumCycleSchema = new Schema({
    curriculum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curriculum"
    },
    cycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cycle"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('CurriculumCycle', curriculumCycleSchema);