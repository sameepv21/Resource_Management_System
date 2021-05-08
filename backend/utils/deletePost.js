var mysql = require('mysql');
var fs = require('fs');

exports.deletePost = (req, res) => {
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
            let query = "DELETE FROM posts WHERE idposts = " + req.body.id + ";";
            // console.log(query);
            con.query(query, function(err, results) {
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    fs.unlink('../backend/uploads/AU1940049/' + req.body.fileName, function(err) {
                        if(err){
                            res.send({
                                status: 0,
                                msg: err.message,
                                data: null,
                            });
                        }
                    });

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