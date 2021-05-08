var mysql = require('mysql');

exports.getFeed = (req, res) => {
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
                msg: err.message,
                data: null,
            });
        } else {
            let query = 'select t.*, p.* from temp t right join posts p on t.email = p.email where p.stream = "' + req.headers.stream + '" order by p.date_time desc;';
            con.query(query, function (err, results) {
                if (err) {
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