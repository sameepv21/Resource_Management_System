var express = require('express');
var router = express.Router();
var multer = require('multer');
var checkLogin = require('./utils/checkLogin');
var signUp = require('./utils/signUp');
var uploadPostRouter = require('./utils/uploadPost');
var path = require('path');
var logout = require('./utils/logout');
var editProfile = require('./utils/editProfile');
var profile = require('./utils/profile');
var verify = require('./utils/verify');
var uploadPost = require('./utils/uploadPost');

var storage  = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/AU1940049')
  },
  filename: function(req, file, cb) {
    let temp = file.originalname;
    cb(null, temp);
  }
});

var upload = multer({storage: storage});

router.post('/login', checkLogin.checkLogin);


router.post('/signUp', signUp.signUp);


router.post('/verify', verify.verify);


router.post('/editProfile', editProfile.editProfile);


router.post('/uploadPost', upload.single('file'), function(req, res, next){
  console.log("File uploaded successfully!");
  res.send({
    status: 1,
    msg: "File uploaded succesffuly!",
    data: {},
  });
});


router.get('/logout', logout.logout);


router.get('/profile', profile.profile);

router.get('/', (req, res) => {
  res.send('React is connected to express backend');
});

module.exports = router;