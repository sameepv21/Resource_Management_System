var mysql = require('mysql');

exports.getEditPost = (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root',
    })
    con.connect(function(err) {
        if(err) {
            res.send({
                status: 0,
                msg: err.message,
                data: {},
            });
        } else {
            let query = "SELECT * from posts WHERE idposts=" + req.body.postId; 
            console.log(JSON.stringify(req.body.postId));
            con.query(query, function(err, results) {
                if(err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: {},
                    });
                } else {
                    console.log(JSON.stringify(results[0]))
                    res.send({
                        status: 1,
                        msg: 'Successfully Updated',
                        current: true,
                        data: {
                            title: results[0].title,
                            url: results[0].url,
                            description: results[0].description,
                        },
                    })
                }
            });
        }
    });
}
