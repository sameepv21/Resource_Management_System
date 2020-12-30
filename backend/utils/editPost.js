var mysql = require('mysql');

exports.editPost = (req, res) => {
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
            let query = "UPDATE posts SET title='" + req.body.title + "', url='" + req.body.url + "', description='" + req.body.description + "' WHERE email='" + req.cookies.cookie + "';"; 
            // console.log(query);
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
                        msg: 'Successfully Updated',
                        updated: true,
                        data: {},
                    })
                }
            });
        }
    });
}