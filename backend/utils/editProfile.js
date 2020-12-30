var mysql = require('mysql');

exports.editProfile = (req, res) => {
    // console.log('Entered the function.');

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.session.user;

    let con = mysql.createConnection({
        host: 'localhost',
        user: ' root',
        password: 'root',
        database: 'mydb',
    });
    
    con.connect(function(err){
        if(err){
            // console.log('this is the error: ' + err.message);
            res.send({
                status: 0,
                msg: err.message,
                success: false,
                data: {},
            });
        } else {
            let updateQuery = "UPDATE temp SET fname='" + firstName + "' lname='" + lastName + "' WHERE email='" + email + "';";
            // console.log("updateQuery is: "+updateQuery);
            con.query(updateQuery,function(err, results) {
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        success: false,
                        data: {},
                    });
                } else {
                    res.send({
                        status: 1,
                        msg: 'Updated Succefully',
                        success: true,
                        data: {},
                    });
                }
            })
        }
    });
}