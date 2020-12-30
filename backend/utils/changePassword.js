var mysql = require('mysql');

exports.changePassword = (req,res) =>{

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    })
    con.connect(function(err){
        if(err){
            res.send({
               status: 0,
               msg: 'Something is wrong with the server. Please try again later',
               data: {}, 
            });
        } else {
            let insertQuery = "UPDATE temp SET password = REPLACE(password," + req.body.oldPassword + "," + req.body.newPassword + ") WHERE email= '" + req.cookies.cookie + "';";
            // console.log('inserted here');
            con.query(insertQuery, function(err, result){
                if(err){
                    // console.log('error is: '+err.message);
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    res.send({
                        success: true,
                        status: 1,
                        msg: "Password changed successfully",
                        data: {},
                    });
                }
            });
        }
    });
}
