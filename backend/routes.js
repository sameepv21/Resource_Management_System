var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var multer = require('multer');
var checkLogin = require('./utils/checkLogin');
var signUp = require('./utils/signUp');
var logout = require('./utils/logout');
var editProfile = require('./utils/editProfile');
var profile = require('./utils/profile');
var verify = require('./utils/verify');
var feedback = require('./utils/feedback');
var userPost = require('./utils/userPost');
var addToSavedPosts = require('./utils/addToSavedPosts');
var deletePost = require('./utils/deletePost');
var editPost = require('./utils/editPost');
var savedPosts = require('./utils/savedPosts');
var getFeed = require('./utils/getFeed');
var getEditPost = require('./utils/getEditPost');
// const { query } = require('express');
var fileName = '';
const size = 40 * 1024 * 1024;

var storage  = multer.diskStorage({
  destination: (req, file, cb) => {
    let obj = JSON.parse(req.cookies.cookie);
    cb(null, './uploads/'+obj.email)
  },
  filename: function(req, file, cb) {
    fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  }
});

var upload = multer({storage: storage, limits: {fileSize: size}});

router.get('/getFeed', getFeed.getFeed);

router.post('/login', checkLogin.checkLogin);

router.get('/savedPosts', savedPosts.savedPosts);

router.post('/signUp', signUp.signUp);

router.post('/editPost', editPost.editPost);

router.post('/verify', verify.verify);

router.post('/feedback', feedback.feedback);

router.post('/editProfile', editProfile.editProfile);

router.post('/addToSavedPosts', addToSavedPosts.addToSavedPosts);

router.post('/deletePost', deletePost.deletePost);

router.post('/getEditPost', getEditPost.getEditPost);

let fileUpload = upload.single('file');
router.post('/uploadPost',  function(req, res, next){
  // console.log("File uploaded successfully!");
  fileUpload(req, res, function(err) {
    if(err) {
      res.send({
        status: 0,
        msg: err.message,
        data: null,
      });
    } else {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
      });
    
      con.connect(function(err) {
        if(err) {
          res.send({
            status: 1,
            msg: 'User already logged in',
            success: true,
            data: {},
          });
        } else {
          let d = new Date();
          let obj = JSON.parse(req.cookies.cookie);
          let postInsertQuery = "INSERT INTO posts (email,title,url,description,file_name,school,stream,date_time) VALUES ('" + obj.email +"','" + req.body.title +"','" + req.body.url +"','"+ req.body.description +"','"+ fileName + "','" + req.body.school+ "','"  + req.body.stream + "','" + new Date(d + 'UTC').toISOString().replace(/T/, ' ').replace(/\..+/, '') + "');";
          // console.log("post inster query "+postInsertQuery);
    
          con.query(postInsertQuery, function(err, results) {
            if(err) {
              // console.log(err.message);
              res.send({
                status: 0,
                msg: err.message,
                data: {},
              });
            } else {
              // console.log('Successfull');
              res.send({
                status: 1,
                msg: 'Upload Successfull',
                uploadSuccess: true,
                data: {},
              });
            }
          })
    
        }
      });
    }
  });
});


router.get('/logout', logout.logout);


router.get('/profile', profile.profile);

router.get('/userPost', userPost.userPost);

router.get('/', (req, res) => {
  res.send('React is connected to express backend');
});

module.exports = router;