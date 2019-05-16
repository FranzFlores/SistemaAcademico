'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({
    university_degree: { type: String, required: true },
    fourth_level_degree: { type: String, required: true },
    timetable: { type: String, required: true },
    status: { type: Boolean, default: true },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Teacher', teacherSchema);