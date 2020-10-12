var mysql = require('mysql');
var fs = require('fs');

exports.signUp = (req, res) => {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let roll = req.body.roll;
    let email = req.body.email;
    let password = req.body.password;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    });

    con.connect(function(err){
        if(err){
            res.send({
               status: 0,
               msg: 'Something is wrong with the server. Please try again later',
               data: {}, 
            });
        } else {
            let insertQuery = "INSERT INTO temp (fname, lname, rollNo, email, password) VALUES  ('" + firstName + "','" + lastName + "','" + roll + "','" + email + "','" + password + "')";
            console.log('inserted here');
            con.query(insertQuery, function(err, result){
                if(err){
                    console.log('error is: '+err.message);
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    fs.mkdir("./uploads/AU"+roll, {recursive: true}, function(err){
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("New folder created.");
                        }
                    });

                    res.cookie('cookie', email, { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                    req.session.user = email;
                    console.log("New User session created.");
                    
                    res.send({
                        status: 1,
                        success: true,
                        msg: "You have successfully registered.",
                        data: {email},
                    });
                }
            });
        }
    });
}