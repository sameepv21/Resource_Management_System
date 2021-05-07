var mysql = require('mysql');
var fs = require('fs');
var bcrypt = require('bcrypt');
const saltRounds = 15;

exports.signUp = (req, res) => {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let roll = req.body.roll;
    let email = req.body.emai;
    let password = req.body.password;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    });

    con.connect(function (err) {
        if (err) {
            res.send({
                status: 0,
                msg: 'Something is wrong with the server. Please try again later',
                data: {},
            });
        } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                let insertQuery = "INSERT INTO temp (fname, lname, rollNo, email, imageUrl, role, password) VALUES  ('" + firstName + "','" + lastName + "','" + roll + "','" + email + "', 'https://res.cloudinary.com/didf23s1x/image/upload/v1610778072/RMS/defaultProfilePicture_cq1mlw.jpg', 'U',"+ hash + ");";
                console.log(insertQuery);
                con.query(insertQuery, function (err, result) {
                    if (err) {
                        console.log('error is: ' + err.message);
                        res.send({
                            status: 0,
                            msg: err.message,
                            data: {},
                        });
                    } else {
                        fs.mkdir("./uploads/" + email, { recursive: true }, function (err) {
                            if (err) {
                                // console.log(err);
                                res.send({
                                    status: 0,
                                    msg: err.message,
                                    data: {},
                                });
                            } else {
                                // console.log("New folder created.");
                            }
                        });

                        res.cookie('cookie', email, { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                        req.session.user = email;
                        // console.log("New User session created.");

                        res.send({
                            status: 1,
                            success: true,
                            msg: "You have successfully registered.",
                            data: { email },
                        });
                    }
                });
            })
        }
    });
}