'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    topic: { type: String, required: true },
    date: { type: Date, required: true },
    parallel: { type: String, required: true },
    unity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unity" 
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Class', classSchema);