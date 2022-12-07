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

const postingSchema = new mongoose.Schema({
  postId : String,
  title : String,
  content : String,
  userNickname : String, //
  userProfile : String, //
  grade : String, //
  star : String,
  mentormajor : String,
  date : Date,
})

const userSchema = new mongoose.Schema({
  userID: String,
  nickname: String,
  password: String,
  profileImage: String,
  grade: String,
  major: String,
  email: String,
  mentor: Boolean,
  code: String,
})

const userModel = mongoose.model("users",userSchema);

const postingModel = mongoose.model('postings', postingSchema);

/* POST /postings */
router.post('/', function(req, res, next) {
  mongoose.connect("mongodb://localhost:27017/websystemPj").then(
    async () => {
      let randomId;
      while(true) {
          randomId = (Math.floor(Math.random() * 10000)).toString();
          let check = await postingModel.findOne({postId : randomId});
          if(!check) break;
      }
      
      const user = await userModel.findOne({userID : req.session.user.userID});

      postingModel.create({
          postId : randomId,
          title : req.body.title,
          content : req.body.content,
          userNickname : req.session.user.nickname,
          userProfile : user.profileImage,
          grade : user.grade,
          mentormajor : user.major,
          star : "0",
          date: new Date()
      }, function(err) {
          if(err) res.status(500).send(false);
          else res.status(200).send(randomId);
      });
  },
    err => { res.status(500).send("error : DB is not connected."); }
  )
});


/* PUT /postings/:post_id */
router.put('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        const check = await postingModel.findOne({postId : req.params.post_id});
        if(!check) { // 새로운 id
          res.status(404).send(false);
        }
        else { // 기존 post 수정
            postingModel.updateOne({postId : req.params.post_id}, {
                title: req.body.title,
                content: req.body.content,
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

        if(result) res.send({contents: result, totalNum: result.length});
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


// 멘토링 신청하기..?
/* POST /postings/:post_id */
router.post('/:post_id', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/websystemPj").then(
      async () => {
        



      },
      err => { res.status(500).send("error : DB is not connected."); }
    )
});


module.exports = router;
