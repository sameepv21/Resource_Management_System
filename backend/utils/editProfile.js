var mysql = require('mysql');

exports.editProfile = (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let roll = req.body.roll;
    let email = JSON.parse(req.cookies.cookie).email;

    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root',
    });
    
    con.connect(function(err){
        if(err){
            console.log(err.message);
            res.send({
                status: 0,
                msg: err.message,
                success: false,
                data: {},
            });
        } else {
            let updateQuery = "UPDATE temp SET fname='" + firstName + "', lname='" + lastName + "', rollNo=" + roll + " WHERE email='" + email + "';";
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