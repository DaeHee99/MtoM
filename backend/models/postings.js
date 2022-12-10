const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
    postId : String,
    mentorId : String,
    title : String,
    content : String,
    userNickname : String,
    userProfile : String,
    grade : String,
    star : String,
    mentormajor : String,
    date : Date,
  })

module.exports = mongoose.model('postings', postingSchema);