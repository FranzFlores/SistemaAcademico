'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    diploma: { type: String, required: true },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    curriculums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curriculum"
    }]
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Career', careerSchema);