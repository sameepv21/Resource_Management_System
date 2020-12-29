var mysql = require('mysql');

exports.checkLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password; 
    let google = req.body.google;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    });

    if(req.session.user) {
        res.send({
            status: 1,
            msg: 'User already logged in',
            success: true,
            data: {},
        });
    } else {
        con.connect(function(err){
            if(err){
                res.send({
                   status: 0,
                   msg: 'Something is wrong with the server. Please try again later',
                   data: {}, 
                });
            } else {
                let sqlQuery = "SELECT * FROM temp WHERE email='" + email + "'";
                con.query(sqlQuery, function(err, results){
                    if(err) {
                        res.send({
                            status: 0,
                            msg: err.message,
                            data: {},
                        });
                    }
                    else if(results.length === 0) {
                        res.send({
                            status: 1,
                            msg: "User does not exist.",
                            data: {},
                        });
                    } else if(google){
                        res.cookie('cookie', email, { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                        req.session.user = email;
                        console.log(req.session.user);

                        res.send({
                            status: 1,
                            msg: 'Welcome, you have successfully logged in.',
                            success: true,
                            data: {email},
                        });
                    }
                    else if(!google && results[0].password === password){

                        res.cookie('cookie', email, { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                        req.session.user = email;
                        console.log(req.session.user);

                        res.send({
                            status: 1,
                            msg: 'Welcome, you have successfully logged in.',
                            success: true,
                            data: {email},
                        });
                    } else if(!google){
                        res.send({
                            status: 1,
                            msg: 'Invalid email or Password.',
                            data: {},
                        });
                    }
                });
            }
        });
    }
}