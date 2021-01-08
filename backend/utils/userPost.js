var mysql = require('mysql');

exports.userPost = (req, res) => {
    // console.log('Entered userPost');
    var con = mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: "root",
        database: "mydb",
    });

    con.connect(function(err) {
        if(err) {
            res.send({
                status: 0,
                msg: err.message,
                data: {},
            });
        } else {
            let obj = JSON.parse(req.cookies.cookie);
            let query = "SELECT * FROM posts WHERE email='" + obj.email + "';";
            con.query(query, function(err, results) {
                // console.log(results);
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    res.send({
                        status: 1,
                        msg: 'Fetched Data',
                        data: {results: results},
                    });
                }
            });
        }
    });
}