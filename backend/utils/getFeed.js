var mysql = require('mysql');

exports.getFeed = (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
    });

    con.connect(function(err) {
        if(err) {
            res.send({
                status: 0,
                msg: err.message,
                data: null,
            });
        } else {
            // console.log(req.headers.stream);
            let query = 'SELECT * FROM posts WHERE stream="' + req.headers.stream + '";';
            // console.log(query);
            con.query(query, function(err, results) {
                console.log(results);
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: null,
                    });
                } else {
                    res.send({
                        status: 1,
                        msg: 'Fetched Posts',
                        data: results,
                    });
                }
            });
        }
    })

}