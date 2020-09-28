'use strict'

const axios = require('axios');
const querystring = require('querystring');
const {insert, insertMany} = require('../models/video');
const config = require('../config.js');


const searchVideo = async (video_title) => {
    const doc = {};
    doc.video_title = video_title;
    _getMinedVideoData();
    return {video_title};
};

const startVideoMining = () => {

};

const _getLastFetchedRecordTime = () => {

};

const _getMinedVideoData = () => {
    // GET parameters
    const parameters = {
        part: config.youtube.PART,
        key: config.youtube.KEY,
        q: config.youtube.SEARCH_QUERY,
        type: config.youtube.TYPE,
        order: config.youtube.ORDER,
        publishedAfter: config.youtube.PUBLISHED_AFTER,
        maxResults: config.youtube.MAX_RESULTS
    }
    const get_request_args = querystring.stringify(parameters);

    let URL = config.youtube.URL_END_POINT + "?" + get_request_args;

    axios.get(URL)
    .then(function (response) {
        _saveMinedVideoDetails(response, config.youtube.SEARCH_QUERY);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const _saveMinedVideoDetails = (response, video_title) => {
    const docsArray = [];
    response.data.items.forEach(function (element) {
        const obj = {};
        obj.video_title = video_title;
        obj.data = element.snippet;
        delete obj.data.channelTitle;
        delete obj.data.liveBroadcastContent;
        docsArray.push(obj);
    });
    insertMany(docsArray);
}


module.exports = {
    searchVideo,
    startVideoMining
};
