const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
const upload = require('express-fileupload')
app.use(upload())
const mongoose = require('mongoose');

let connect_db = require('./connect_db');
connect_db();

let Quiz = require('./models/Quiz');
let Keynote = require('./models/Keynote');

app.post('/add_quiz', (req, res) => {
    const title = req.body.title;
    const question = req.body.question;
    const answer = req.body.answer;
    const difficulty = req.body.difficulty.split(',');
    const subject = req.body.subject;
    const file = req.files.quiz_image;
    const filename = file.name;

    file.mv('public/uploads/quiz_images/'+filename, function(err){
            if(err){
                console.log(err);
                }
            });

    const newQuiz = new Quiz({
        "title":title,
        "question":question,
        "answer":answer,
        "difficulty":difficulty,
        "image":filename,
        "subject":subject,
        "created_at":new Date().toISOString()
    })

    newQuiz.save();

    res.send({
        "msg":"Quizz added successfully"
    });


});

app.post('/add_keynote', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const videoUrl = req.body.videoUrl;
    const subject = req.body.subject;
    const quizzId = req.body.quizzId;
    const file = req.files.key_image;
    const filename = file.name

    file.mv('public/uploads/keynote_images/'+filename, function(err){
            if(err){
                console.log(err);
                }
            });

    const newkeynote = new Keynote({
        "title":title,
        "content":content,
        "videoUrl":videoUrl,
        "keynote_image":filename,
        "subject":subject,
        "quiz_id":quizzId
    })

    newkeynote.save();

    res.send({
        "msg":"Keynote added successfully"
    });


});

app.get('/get_all_quizzes', (req, res) => {
    Quiz.find().then((quizzes) => {
        res.send({   
            "quizzes":quizzes
         });
    });

});

app.post('/delete_quizz', (req, res) => {
    const quizzId = req.query.quizzId;
    Quiz.findOneAndDelete({"_id":quizzId}).then(() => {
        res.send({   
            "msg":"Quiz Deleted Successfully"
         });
    });

});

app.get('/get_quizz_by_id', (req, res) => {
    const quizzId = req.query.quizzId;
    Quiz.findOne({"_id":mongoose.Types.ObjectId(quizzId)}).then((quizz) => {
        res.send({
            "quizz":quizz
        })
    })
});

app.get('/get_all_keynotes', (req, res) => {
    Keynote.find().then((keynotes) => {
        res.send({   
            "keynotes":keynotes
         });
    });

});

app.post('/delete_keynote', (req, res) => {
    const keynoteId = req.query.keynoteId;
    Keynote.findOneAndDelete({"_id":keynoteId}).then(() => {
        res.send({   
            "msg":"Keynote Deleted Successfully"
         });
    });

});

app.get('/get_keynote_by_id', (req, res) => {
    const keynoteId = req.query.keynoteId;
    Keynote.findOne({"_id":mongoose.Types.ObjectId(keynoteId)}).then((keynote) => {
        res.send({
            "keynote":keynote
        })
    })
});

app.post('/update_quiz', (req, res) => {
    const title = req.body.title;
    const question = req.body.question;
    const answer = req.body.answer;
    const difficulty = req.body.difficulty.split(',');
    const subject = req.body.subject;
    const quizzId = req.body.quizzId;
    const file = req.files.quiz_image;
    const filename = file.name
    console.log(file);

    file.mv('public/uploads/quiz_images/'+filename, function(err){
            if(err){
                console.log(err);
                }
            });

    Quiz.findById(quizzId).then(async (quizz) => { 
        if(quizz){
            let filter = { _id: quizzId };
            let updateDoc = {
            $set: {
                "title":title,
                "question":question,
                "answer":answer,
                "difficulty":difficulty,
                "image":filename,
                "subject":subject
        
                }
        
            }
        
            await Quiz.updateMany(filter,updateDoc)
        }
        
                res.send({
                    "msg":"Quizz updated succesfully"
                })
            });

});


app.post('/update_keynote', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const videoUrl = req.body.videoUrl;
    const subject = req.body.subject;
    const quizzId = req.body.quizzId;
    const keynoteId = req.body.keynoteId;
    const file = req.files.key_image;
    const filename = file.name

    file.mv('public/uploads/keynote_images/'+filename, function(err){
            if(err){
                console.log(err);
                }
            });

    Keynote.findById(keynoteId).then(async (keynote) => { 
        if(keynote){
            let filter = { _id: keynoteId };
            let updateDoc = {
            $set: {
                "title":title,
                "content":content,
                "videoUrl":videoUrl,
                "keynote_image":filename,
                "subject":subject,
                "quiz_id":quizzId
        
                }
        
            }
        
            await Keynote.updateMany(filter,updateDoc)
        }
        
                res.send({
                    "msg":"Keynote updated succesfully"
                })
            });

});

app.get('/get_keynote_by_quizzId', (req, res) => {
    const quizzId = req.query.quizzId;
    Keynote.findOne({'quiz_id':quizzId}).then((keynote) => {
        res.send({
            "keynote":keynote
        })
    })
});


app.listen(5000, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("The server is running at port 5000");
    }
});