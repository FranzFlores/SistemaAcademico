'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitySchema = new Schema({
    name: { type: String, required: true },
    start_unit: { type: String, required: true },
    end_unit: { type: String, required: true },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject" 
    },
    status: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Unity', unitySchema);