'use strict'

const {insert} = require('../models/video');

const searchVideo = async (video_title) => {
    const doc = {};
    doc.video_title = video_title;
    await insert(doc);
    return {video_title};
};


module.exports = {
    searchVideo,
};
