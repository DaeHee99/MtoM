var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const express_session = require('express-session');
const MongoStore = require('connect-mongo');
const {sessionSecret} = require('../config/secret');

router.use(express_session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:"mongodb://localhost:27017/websystemPj"}),
  cookie:{maxAge:(3.6e+6)*24*14}
}))

const commentSchema = new mongoose.Schema({
    userId : String,
    commentId : String,
    postId : String,
    content : String,
	  userNickName : String,
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
            postId : req.body.postId,
            content : req.body.content,
            userNickName : req.session.user.nickname,
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
        const result = await commentModel.find({postId : req.params.post_id});
  
        if(result) res.status(200).send({contents: result, totalNum: result.length});
        else res.status(404).send(false);
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


/* DELETE /comment/:commentId */
router.delete('/:commentId', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        const check = await commentModel.findOne({commentId : req.params.commentId});
        if(!check) {
          res.status(404).send(false);
          return;
        }
  
        commentModel.deleteOne({commentId : req.params.commentId}, function(err) {
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
        const result = await commentModel.find({userId : req.params.userId, postId: req.params.postId});
        
        if(result) res.status(200).send(result);
        else res.status(404).send(false);
    },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


module.exports = router;
