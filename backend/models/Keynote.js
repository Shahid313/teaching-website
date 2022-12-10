const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const KeynoteSchema = new Schema({
title:{
    type: String,
},
content: {
    type: String,
},
videoUrl:{
    type: String,
},
keynote_image:{
    type: String,
},
subject:{
    type: String,
},
quiz_id:{
    type: String,
},


})

const Keynote = mongoose.model('Keynote', KeynoteSchema);

module.exports = Keynote;