const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId : String,
    commentId : String,
    postId : String,
    content : String,
	userNickName : String,
    star : Number
})

module.exports = mongoose.model('comment', commentSchema);