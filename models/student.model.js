'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    school: { type: String, required: true },
    graduation_grade: { type: Number, required: true },
    status: { type: Boolean, default: true },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Student', studentSchema);