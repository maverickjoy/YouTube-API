'use strict';

const db = require('../db/mongo').vault;
const mongoose = require('../db/mongo').mongoose;

const videoSchema = mongoose.Schema({
    video_title: {
        type: String,
        required: true
    },
    createdAt: { type: Date, required: true, default: Date.now }
}, {strict: false});


let Videos = db.model('videos', videoSchema);

const insert = (doc) => {
    return Videos.create(doc);
}

module.exports = {
    insert
};
