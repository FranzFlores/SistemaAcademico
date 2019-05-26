'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    diploma: { type: String, required: true },
    status : {type: Boolean, required:true, default:true},
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Career', careerSchema);