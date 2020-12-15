var mysql = require('mysql');

exports.verifyChangePassword = (req,res) => {

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"root",
        database: "mydb"
    })

    con.connect(function(err){
        if(err){
            res.send({
                msg: err.message,
                data:[],
                status: 0,
            })
        } else{
            console.log(req.cookies.cookie);
            var query = "SELECT password FROM temp WHERE email= '" + req.cookies.cookie + "';";
            con.query(query, function(err,results){
                if(err){
                    console.log(err.message);
                    res.send({
                        msg: err.message,
                        data:[],
                        status: 0,
                    })
                } else{
                    console.log(results[0].password);
                    if(req.body.currentPassword === results[0].password){
                        res.send({
                            msg: "authenticated",
                            success: true,
                            data: [],
                            status: 1
                        })
                    } else{
                        res.send({
                            msg: "authentication failed",
                            success: false,
                            data: [],
                            status: 1
                        })
                    }
                }
            })
        }
    })
}