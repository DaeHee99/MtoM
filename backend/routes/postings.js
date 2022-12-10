var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const express_session = require('express-session');
const MongoStore = require('connect-mongo');
const {sessionSecret,mongoserver} = require('../config/secret');
const userModel = require('../models/users')
const postingModel = require('../models/postings')
const commentModel = require('../models/comments')

let status;

const connectDB = async function(req,res,next){
  try{
    await mongoose.connect(mongoserver)
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
  store: MongoStore.create({mongoUrl:mongoserver}),
  cookie:{maxAge:(3.6e+6)*24*14}
}))

/* POST /postings */
router.post('/', async function(req, res, next) {
  const check = await postingModel.findOne({mentorId : req.session.user.userID});
  if(check) { // 이미 post 등록했음
    res.status(400).send({result : false, message: "이미 등록했습니다."});
    return;
  }
  if(!req.session.user.mentor) {
    res.status(400).send({result : false, message: "멘티는 등록 불가능."});
    return;
  }

  let randomId;
  while(true) {
      randomId = (Math.floor(Math.random() * 10000)).toString();
      let check = await postingModel.findOne({postId : randomId});
      if(!check) break;
  }

  const user = await userModel.findOne({userID : req.session.user.userID});

  postingModel.create({
      postId : randomId,
      mentorId : req.session.user.userID,
      title : req.body.title,
      content : req.body.content,
      userNickname : req.session.user.nickname,
      userProfile : user.profileImage,
      grade : user.grade,
      mentormajor : user.major,
      star : [],
      staravg : "0",
      date: new Date()
  }, function(err) {
      if(err) res.status(500).send(false);
      else res.status(200).send(randomId);
  });
});


/* PUT /postings/:postid */
router.put('/:postid', async function(req, res, next) {
  const check = await postingModel.findOne({postId : req.params.postid});
  if(!check) { // 새로운 id
    res.status(404).send(false);
  }
  else { // 기존 post 수정
      postingModel.updateOne({postId : req.params.postid}, {
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
});


/* GET /postings */
router.get('/', async function(req, res, next) {
  let targetCategory = req.body.category;
  let sortTarget = req.body.sort;
  let page = req.body.page;
  if(page === undefined) page = 0;

  let result;

  if (sortTarget === "별점순") {
      result = await postingModel.find({mentormajor : targetCategory}).sort({ "star": -1 });
  } else { // 최신순
      result = await postingModel.find({mentormajor : targetCategory}).sort({ "date": -1 });
  }

  if(result) res.send({contents: result.slice(12*page, (12*page + 12)), totalNum: result.length});
  else res.status(404).send(false);
});


/* GET /postings/:postid */
router.get('/:postid', async function(req, res, next) {
  const result = await postingModel.findOne({postId : req.params.postid});

  if(result) res.status(200).send(result);
  else res.status(404).send(false);
});


/* DELETE /postings/:postid */
router.delete('/:postid', async function(req, res, next) {
  const check = await postingModel.findOne({postId : req.params.postid});
  if(!check) {
    res.status(404).send(false);
    return;
  }

  postingModel.deleteOne({postId : req.params.postid}, function(err) {
    if(err) res.status(500).send(false);

    commentModel.deleteMany({postId : req.params.postid}, function(err) {
      if(err) res.status(500).send(false);
      else res.status(200).send(true);
    })
  })
});


/* POST /postings/apply */
router.post('/apply', async function(req, res, next) {
  const {postid} = req.body

  let post = await postingModel.find({postId: postid})
  let mentee = await userModel.find({userID: req.session.user.userID, password: req.session.user.password})
  let mentor = await userModel.find({nickname: post[0].userNickname, profileImage: post[0].userProfile, major:post[0].mentormajor})

  if (mentee[0].list.indexOf(mentor[0].userID) >= 0)
    return res.status(400).send({result:false, message:"이미 신청한 멘토입니다."})

  let mentorList = mentee[0].list
  mentorList.push(mentor[0].userID)
  //console.log(mentorList);
  let updateMentee = await userModel.updateOne({userID: req.session.user.userID, password: req.session.user.password},{list:mentorList})

  let menteeList = mentor[0].list
  menteeList.push(mentee[0].userID)
  //console.log(menteeList);
  let updateMentor = await userModel.updateOne({nickname: post[0].userNickname, profileImage: post[0].userProfile, major:post[0].mentormajor},{list:menteeList})

  return res.send({result: true, mentorList: updateMentee.list, menteeLIst: updateMentor.list})
});

module.exports = router;
