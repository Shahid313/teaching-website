const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
title:{
    type: String,
},
question: {
    type: String,
},
answer:{
    type: String,
},
difficulty:{
    type: Array,
},
image:{
    type:String
},
subject:{
    type: String,
},
created_at:{
    type:String
}

})

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;