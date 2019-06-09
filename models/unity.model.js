'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitySchema = new Schema({
    name: { type: String, required: true },
    start_unity: { type: Date, required: true },
    end_unity: { type: Date, required: true },
    subjectTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubjectTeacher" 
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }]
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Unity', unitySchema);