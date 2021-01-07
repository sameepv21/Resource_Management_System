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
            // let query = 'SELECT * from posts LEFT JOIN temp ON posts.email = temp.email WHERE posts.stream="' + req.headers.stream + '" UNION SELECT * FROM posts RIGHT JOIN temp ON posts.email = temp.email WHERE posts.stream="' + req.headers.stream + '";"';
            let query = "SELECT * FROM temp, post WHERE temp.email = post.email, posts.stream ='" + req.headers.stream + "' temp.stream ='" + req.headers.stream + "';";
            // let query = '';
            console.log("get Feed query: "+query);
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