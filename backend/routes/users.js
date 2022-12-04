
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const express_session = require('express-session')
const sessionSecret = require('../config/development')
const MongoStore = require('connect-mongo')

const websystemPj = new mongoose.Schema({
  userID: String,
  nickname: String,
  password: String,
  profileImage: String,
  grade: String,
  major: String,
  email: String,
  mentor: Boolean,
})

let status
const connectDB = async function(req,res,next){
  try{
    await mongoose.connect("mongodb://localhost:27017/websystemPj")
    status = mongoose.connection.readyState
    next()
  }catch(err){
    res.status(500).send("DB is unconnected.\n Can not use.")
  }
}

const model = mongoose.model("Users",websystemPj)
router.use(connectDB)
router.use(express_session({
  secret: "thisissessionSecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:"mongodb://localhost:27017/websystemPj"}),
  cookie:{maxAge:(3.6e+6)*24*14}
}))

/* GET users listing. */
router.get('/logout', async function (req,res,next) {
  if(req.session.user){
    req.session.destroy()
    return res.status(200).send(true)
  }
  else
    return res.status(400).send(false)
})

router.post('/login', async function(req, res, next) {
  const {userID, password} = req.body
  console.log(userID)
  let user = await model.find({userID: userID, password: password})
  console.log(user)
  if (user.length == 0) return res.status(400).send(/*"아이디 또는 비밀번호가 일치하지 않습니다."*/false)

  if (!req.session.user){
    req.session.user = {
      userID: userID,
      password: password,
      nickname: user.nickname,
      mentor: user.mentor,
      authorized: true,
    };
  }
  console.log(req.session)


  return res.status(200).send(true)
});

router.post('/mentor', async function(req, res, next) {
  const {grade, major, email} = req.body

  let useremail = await model.find({email: email})
  if (useremail.length >0) return res.status(400).send(/*"이미 존재하는 회원입니다."*/false)

  try{
    if(!grade) return res.status(400).send(/*"grade 입력해주세요."*/false)
    if(!major) return res.status(400).send(/*"major 입력해주세요."*/false)
    if(!email) return res.status(400).send(/*"email 입력해주세요."*/false)

    let user = await model.find({userID: req.session.user.userID, password: req.session.user.password})
    user.mentor = true
    req.session.user.mentor = true

    res.status(200).send(true)
  }catch(err){
    res.status(500).send(false)
  }

});

router.post('/', async function(req, res, next) {
  const {userID, nickname, password, profileImage} = req.body

  let isuser = await model.find({userID: userID, password: password})
  if (isuser.length >0) return res.status(400).send(/*"이미 존재하는 회원입니다."*/false)

  let isnickname = await model.find({nickname: nickname})
  if (isnickname.length >0) return res.status(400).send(/*"이미 존재하는 닉네임입니다."*/false)

  try{
    if(!userID) return res.status(400).send(/*"id를 입력해주세요."*/false)
    if(!nickname) return res.status(400).send(/*"nickname를 입력해주세요."*/false)
    if(!password) return res.status(400).send(/*"password를 입력해주세요."*/false)

    let user = await model.create({userID: userID, nickname: nickname, password: password, profileImage:profileImage, mentor:false})
    await user.save()
    res.status(200).send(true)
  }catch(err){
    res.status(500).send(false)
  }

});



module.exports = router;
