var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const userModel = require('../models/users')
const postingModel = require('../models/postings')

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

router.use(connectDB)

router.get('/:userId', async function (req,res,next) {
  let user = await userModel.findOne({userID: req.params.userId})
  let list = user.list
  let newList = []
  for (i in list){
    let listuser = await userModel.findOne({userID: list[i]})
    if(user.mentor){
      newList.push({menteeNickname: listuser.nickname, menteeProfile: listuser.profileImage})
    }
    else{
      let post = await postingModel.findOne({userNickname: listuser.nickname})
      newList.push({postId: post.postId, mentorNickname: listuser.nickname, menteeProfile: listuser.profileImage})
    }
  }

  return res.send({userProfile: user.profileImage, mlist: newList})

})

router.get('/mentor/mypost', async function (req,res,next) {
  const result = await postingModel.find({mentorId : req.session.user.userID});

  if(result) res.status(200).send({contents : result, totalNum: result.length});
  else res.status(404).send(false);
})

module.exports = router;
