var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const commentModel = require('../models/comments')
const postingModel = require('../models/postings')

const express_session = require('express-session');
const MongoStore = require('connect-mongo');
const {sessionSecret} = require('../config/secret');

let status;

const connectDB = async function(req,res,next){
  try{
    await mongoose.connect("mongodb://localhost:27017/websystemPj")
    status = mongoose.connection.readyState
    next()
  } catch(err){
    res.status(500).send("DB is unconnected.\n Can not use.")
  }
}

router.use(connectDB);
router.use(express_session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:"mongodb://localhost:27017/websystemPj"}),
  cookie:{maxAge:(3.6e+6)*24*14}
}))


/* POST /comment */
router.post('/', async function(req, res, next) {
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
  }, async function(err) {
    if(err) res.status(500).send({result : false});

    let posting = await postingModel.findOne({postId : req.body.postId});
  
    let starList = posting.star;
    starList.push(req.body.star);
    let starsum = starList.reduce((a, b) => Number(a) + Number(b), 0);
    let stars = starsum / starList.length; 
    
    postingModel.updateOne({postId : req.body.postId}, {
      star : starList,
      staravg : stars.toString()
    }, function(err) {
      if(err) res.status(500).send(false);
      else {
        res.status(200).send({result : true, commentId : randomId});
      }
    });
  });
});


/* GET /comment/:postid */
router.get('/:postid', async function(req, res, next) {
  const result = await commentModel.find({postId : req.params.postid});

  if(result) res.status(200).send({contents: result, totalNum: result.length});
  else res.status(404).send(false);
});


/* DELETE /comment/:commentId */
router.delete('/:commentId', async function(req, res, next) {
  const check = await commentModel.findOne({commentId : req.params.commentId});
  if(!check) {
    res.status(404).send(false);
    return;
  }

  commentModel.deleteOne({commentId : req.params.commentId}, function(err) {
    if(err) res.status(500).send(false);
    else res.status(200).send(true);
  })
});


/* GET /comment */
router.get('/', async function(req, res, next) {
  const result = await commentModel.find({userId : req.session.user.userID, postId: req.params.postId});
  
  if(result) res.status(200).send(result);
  else res.status(404).send(false);
});


module.exports = router;
