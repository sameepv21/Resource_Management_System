var mysql = require('mysql');
var fs = require('fs');

exports.feedback = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb',
    });

    con.connect(function(err) {
        if(err) {
            res.send({
                status: 0,
                msg: err.message,
                data: {},
            });
        } else {
            console.log("msg=" + req.body.msg);
            let query = "INSERT INTO feedback (email,feedback) VALUES ('" + req.cookies.cookie + "','" + req.body.msg + "');";
            con.query(query, function(err, results) {
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        success:false,
                        data: {},
                    });
                } else {
                    
                    res.send({
                        status: 1,
                        msg: 'Feedback sent successfully :)',
                        data: {},
                        success:true,
                    });
                }
            });
        }
    });
}