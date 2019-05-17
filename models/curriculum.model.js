'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const curriculumSchema = new Schema({
    year: { type: Number, required: true },
    image: { type: String, required: true },
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Curriculum', curriculumSchema);