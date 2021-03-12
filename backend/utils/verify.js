var nodemailer = require('nodemailer');
var mysql = require('mysql');

exports.verify = (req, res) => {
    // console.log('Entered verify');

    let email = req.body.email;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    });

    con.connect(function(err){
        if(err){
            // console.log('error connecting the database ' + err.message);
            res.send({
               status: 0,
               msg: 'Something is wrong with the server. Please try again later',
               data: {}, 
            });
        } else {
            let checkQuery = "SELECT email from temp where email='" + email + "';";
            con.query(checkQuery, function(err, result) {
                if(err) {
                    // console.log('error in running query ' + err.message);
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    if(result.length === 0) {
                        // console.log('unique email/mail sent');
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'sameep.v@ahduni.edu.in',
                                pass: 'Sameep211001!',
                            },
                        });
    
                        let otp = Math.floor(100000 + Math. random() * 900000);
    
                        let mailOptions = {
                            from: 'sameep.v@ahduni.edu.in',
                            to: 'aneri.d@ahduni.edu.in',
                            subject: 'OTP for verification (RMS)',
                            text: 'OTP for verification is: ' + otp + '. It will last for 5 minutes',
                        }
                        
    
                        transporter.sendMail(mailOptions, function(err, info){
                            if(err) {
                                res.send({
                                    status: 0,
                                    msg: err.message,
                                    data: {},
                                });
                            } else {
                                res.send({
                                    status: 1,
                                    msg: 'Successfull Verification',
                                    data: {},
                                });
                            }
                        });

                        console.log('OTP Sent Succsessfully')
                        res.send({
                            status: 1,
                            msg: 'Mail Sent',
                            success: true,
                            data: {otp: otp},
                        });
                    } else {
                        res.send({
                            status: 1,
                            msg: 'Email is not unique',
                            success: false,
                            data: {},
                        });
                    }
                }
            });
        }
    });
}