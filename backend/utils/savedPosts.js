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
            let query = "SELECT temp.*, posts.*, saved.* FROM saved RIGHT JOIN posts ON saved.postId = posts.idposts RIGHT JOIN temp ON temp.email = posts.email WHERE saved.email ='" + obj.email + "' order by posts.date_time desc;";
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