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
            let query = "SELECT temp.*, posts.* FROM temp RIGHT JOIN posts ON posts.email = temp.email WHERE temp.email ='" + obj.email + "' order by posts.date_time desc;";
            con.query(query, function(err, results) {
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
                        success: true,
                        data: {results: results},
                    });
                }
            });
        }
    });
}