'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {type:Boolean,required:true, default: true}
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Faculty', facultySchema);