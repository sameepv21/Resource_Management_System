var mysql = require('mysql');
var fs = require('fs');

exports.deletePost = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb',
    });

    con.connect(function (err) {
        if (err) {
            res.send({
                status: 0,
                msg: err.message,
                data: {},
            });
        } else {
            let query = "DELETE FROM posts WHERE idposts = " + req.body.id + ";";
            con.query(query, function (err, results) {
                if (err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    if (req.body.fileName !== '') {
                        fs.unlink('../backend/uploads/'+JSON.parse(req.cookies.cookie).email + '/' + req.body.fileName, function (err) {
                            if (err) {
                                res.send({
                                    status: 0,
                                    msg: err.message,
                                    data: null,
                                });
                            }
                        });
                    }
                    res.send({
                        status: 1,
                        msg: 'Deleted Successfully!',
                        data: {},
                    });
                }
            });
        }
    });
}