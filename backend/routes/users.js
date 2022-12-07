var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const express_session = require("express-session");
const MongoStore = require("connect-mongo");
const nodemailer = require("nodemailer");
const { googleSecret, sessionSecret } = require("../config/secret");
const multer = require("multer");

const websystemPj = new mongoose.Schema({
  userID: String,
  nickname: String,
  password: String,
  profileImage: String,
  grade: String,
  major: String,
  email: String,
  mentor: Boolean,
  code: String,
});

let status;

const connectDB = async function (req, res, next) {
  try {
    await mongoose.connect("mongodb://localhost:27017/websystemPj");
    status = mongoose.connection.readyState;
    next();
  } catch (err) {
    res.status(500).send("DB is unconnected.\n Can not use.");
  }
};

const model = mongoose.model("Users", websystemPj);
router.use(connectDB);
router.use(
  express_session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/websystemPj" }),
    cookie: { maxAge: 3.6e6 * 24 * 14 },
  })
);

/* GET users listing. */
/*
router.get('/auth/check', async function (req,res,next) {
  //console.log(req.session.user);
  if(req.session.user.mentor){
    return res.status(200).send({role: "mentor"})
  }
  else
    return res.status(200).send({role: "mentee"})
})
*/
router.get("/logout", async function (req, res, next) {
  if (req.session.user) {
    req.session.destroy();
    return res.status(200).send(true);
  } else return res.status(400).send(false);
});

router.post("/login", async function (req, res, next) {
  const { userID, password } = req.body;
  let user = await model.find({ userID: userID, password: password });
  //console.log(user)
  if (user.length == 0) return res.status(400).send({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });

  if (!req.session.user) {
    req.session.user = {
      userID: userID,
      password: password,
      nickname: user[0].nickname,
      mentor: user[0].mentor,
      authorized: true,
    };
  } else {
    console.log("exist", req.session.user);
    if (req.session.user.userID === userID) {
      return res.status(400).send({
        mentor: req.session.user.mentor,
        nickname: req.session.user.nickname,
        message: "이미 로그인 된 계정입니다",
      });
    }
    req.session.user = {
      userID: userID,
      password: password,
      nickname: user[0].nickname,
      mentor: user[0].mentor,
      authorized: true,
    };
  }
  return res.status(200).send({
    mentor: user[0].mentor,
    nickname: user[0].nickname,
  });
});

router.post("/email", async function (req, res, next) {
  const { email } = req.body;

  let useremail = await model.find({ email: email });
  if (useremail.length > 0) return res.status(400).send({ result: false, message: "이미 존재하는 회원입니다." });

  try {
    if (!email) return res.status(400).send({ result: false, message: "email 입력해주세요." });

    if ("@ajou.ac.kr" !== email.slice(-11))
      return res.status(400).send({ result: false, message: "이메일 형식이 잘못되었습니다." });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "9659tig@gmail.com",
        pass: googleSecret,
      },
    });

    const code = Math.floor(Math.random() * 1000000);
    const mailOptions = {
      from: "9659tig@gmail.com",
      to: email,
      subject: "이메일 인증 코드",
      text: `인증 코드는 ${code} 입니다.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        transporter.close();
      }
    });

    let user = await model.updateOne(
      { userID: req.session.user.userID, password: req.session.user.password },
      { code: code }
    );
    res.status(200).send({ result: true });
  } catch (err) {
    res.status(500).send({ result: false });
  }
});

router.post("/mentor", async function (req, res, next) {
  const { grade, major, email, code } = req.body;

  let useremail = await model.find({ email: email });
  if (useremail.length > 0) return res.status(400).send({ message: "이미 존재하는 회원입니다." });

  try {
    if (!grade) return res.status(400).send({ mentor: false, message: "grade 입력해주세요." });
    if (!major) return res.status(400).send({ mentor: false, message: "major 입력해주세요." });
    if (!email) return res.status(400).send({ mentor: false, message: "email 입력해주세요." });

    let emailUser = await model.find({ userID: req.session.user.userID, password: req.session.user.password });
    if (code != emailUser[0].code)
      return res.status(400).send({ mentor: false, message: "인증번호가 일치하지 않습니다." });

    let user = await model.updateOne(
      { userID: req.session.user.userID, password: req.session.user.password },
      { mentor: true, grade: grade, major: major, email: email }
    );
    req.session.user.mentor = true;

    res.status(200).send({ mentor: true, nickname: req.session.user.nickname });
  } catch (err) {
    res.status(500).send(false);
  }
});

const DIR = "../frontend/public/";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, DIR);
  }, //file 을 받아와서 DIR 경로에 저장한다.
  filename: (req, file, callback) => {
    // 저장할 파일의 이름을 설정한다.
    //const fileName = file.originalname.toLowerCase().split(' ').join('-');
    //callback(null, uuidv4() + '-' + fileName)
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // 말 그대로 fileFilter
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/", upload.single("ProfileImage"), async function (req, res, next) {
  const { userID, nickname, password } = req.body;

  let isuser = await model.find({ userID: userID, password: password });
  if (isuser.length > 0) return res.status(400).send(/*"이미 존재하는 회원입니다."*/ false);

  let isnickname = await model.find({ nickname: nickname });
  if (isnickname.length > 0) return res.status(400).send(/*"이미 존재하는 닉네임입니다."*/ false);

  try {
    if (!userID) return res.status(400).send(/*"id를 입력해주세요."*/ false);
    if (!nickname) return res.status(400).send(/*"nickname를 입력해주세요."*/ false);
    if (!password) return res.status(400).send(/*"password를 입력해주세요."*/ false);

    const url = req.protocol + "://" + req.get("host");
    let user = await model.create({
      userID: userID,
      nickname: nickname,
      password: password,
      profileImage: "/" + req.file.filename /*(req.body.file.filename)*/,
      mentor: false,
    });
    await user.save();
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(false);
  }
});

module.exports = router;
