var mysql = require('mysql');

exports.savedPosts = (req, res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root',
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
            let query = "SELECT posts.* FROM saved RIGHT JOIN posts ON saved.postId = posts.idposts WHERE saved.email ='" + obj.email + "';";
            // console.log("query "+ query);
            con.query(query, function(err, results) {
                // console.log("saved=" + results);
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    // console.log(results);
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