const mongoose = require('mongoose');

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
    list: [String]
  })

module.exports = mongoose.model('Users', userSchema);
