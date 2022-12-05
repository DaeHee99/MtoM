var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId : String,
    commentId : String,
    postingIdx : Number,
    userIdx : Number,
    content : String,
    star : Number
})

const commentModel = mongoose.model('comment', commentSchema);


/* POST /comment */
router.post('/', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        let randomId;
        while(true) {
            randomId = (Math.floor(Math.random() * 10000)).toString();
            let check = await postingModel.findOne({postId : randomId});
            if(!check) break;
        }
        
        commentModel.create({
            userId : req.session.user.userID,
            commentId : randomId,
            postingIdx : req.body.postingIdx,
            userIdx : req.body.userIdx,
            content : req.body.content,
            star : req.body.star
        }, function(err) {
            if(err) res.status(500).send(false);
            else res.status(200).send(true);
        });
        
      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* GET /comment/:post_id */
router.get('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
        async () => {
        const result = await commentModel.find({postingIdx : req.params.post_id});
  
        if(result) res.status(200).send(result);
        else res.status(404).send(false);
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* DELETE /comments/:commentIdx */
router.delete('/:commentIdx', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        const check = await commentModel.findOne({commentId : req.params.commentIdx});
        if(!check) {
          res.status(404).send(false);
          return;
        }
  
        commentModel.deleteOne({commentId : req.params.commentIdx}, function(err) {
          if(err) res.status(500).send(false);
          else res.status(200).send(true);
        })
      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* GET /comment */
router.get('/', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
        async () => {
        const result = await commentModel.find({userId : req.session.user.userId});
  
        if(result) res.status(200).send(result);
        else res.status(404).send(false);
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


module.exports = router;
