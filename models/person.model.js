'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    dni_person: { type: String, required: true},
    name: { type: String, required: true },
    birthday: { type: Date,required:true },
    institutional_mail:{ type: String, required: true },
    personal_mail: { type: String, required: true },
    address:{ type: String, required: true },
    phone: { type: String, required: true },
    image: {type: String,required:true},
    status: { type: Boolean, default: true },
    role: { type: String, default: true },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
}, { timestamps: { createdAt: 'created_at', updateAt: 'update_at' } });

module.exports = mongoose.model('Person', personSchema);