var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
    postId : String,
    title : String,
    content : String,
    category: String,
    userNickname : String,
    userProfile : String,
    grade : String,
    star : Number,
    date : Date
})

const postingModel = mongoose.model('postings', postingSchema);

/* PUT /postings/:post_id */
router.put('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        const check = await postingModel.findOne({postId : req.params.post_id});
        if(!check) { // 새로운 id : 새로운 post 추가
            let randomId;
            while(true) {
                randomId = (Math.floor(Math.random() * 10000)).toString();
                let check = await postingModel.findOne({postId : randomId});
                if(!check) break;
            }

            postingModel.create({
                postId : randomId,
                title : req.body.title,
                content : req.body.content,
                category: req.body.category,
                // userNickname : req.body.,
                // userProfile : req.body.,
                // grade : req.body.,
                // star : req.body.,
                date: new Date()
            }, function(err) {
                if(err) res.status(500).send(false);
                else res.status(200).send(true);
            });
        }
        else { // 기존 post 수정
            postingModel.updateOne({postId : req.params.post_id}, {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                date: new Date()
            }, function(err) {
                if(err) res.status(500).send(false);
                else {
                    res.status(200).send(true);
                }
            });
        } 
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* GET /postings */
router.get('/', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        let targetCategory = req.body.category;
        let sortTarget = req.body.sort;
        // let page = req.body.page;
        
        let result;

        if (sortTarget === "별점순") {
            result = await postingModel.find({category : targetCategory}).sort({ "star": -1 });
        } else { // 최신순
            result = await postingModel.find({category : targetCategory}).sort({ "date": -1 });
        }

        if(result) res.send({content: result, totalNum: result.length});
        else res.status(404).send(false);
      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* GET /postings/:post_id */
router.get('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
        async () => {
        const result = await postingModel.findOne({postId : req.params.post_id});
  
        if(result) res.status(200).send(result);
        else res.status(404).send(false);
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* DELETE /postings/:post_id */
router.delete('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        const check = await postingModel.findOne({postId : req.params.post_id});
        if(!check) {
          res.status(404).send(false);
          return;
        }
  
        postingModel.deleteOne({postId : req.params.post_id}, function(err) {
          if(err) res.status(500).send(false);
          else res.status(200).send(true);
        })
      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* POST /postings/:post_id */
router.post('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        



      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


module.exports = router;
