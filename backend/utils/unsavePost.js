var mysql = require("mysql");

exports.unsavePost = (req, res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root'
    })

    con.connect(function (err) {
        if (err) {
            res.send({
                status: 0,
                data: {},
                msg: err.message,
            })
        } else {
            let query = "delete from saved where idsaved = " + req.body.idsaved + ";";
            con.query(query, function (err, result) {
                if (err) {
                    res.send({
                        status: 0,
                        msg: err.message,
                        data: null,
                    });
                } else {
                    res.send({
                        status: 1,
                        msg: 'Deleted',
                        data: null,
                        success: true,
                    });
                }
            });
        }
    });

}