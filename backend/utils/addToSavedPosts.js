var mysql = require("mysql");

exports.addToSavedPosts = (req,res) => {

    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root'
    })

    con.connect(function(err){
        if(err){
            res.send({
                status: 0,
                data: {},
                msg: err.message,
            })
        } else{
            let obj = JSON.parse(req.cookies.cookie);
            let check = "SELECT * FROM saved where email= '" + obj.email + "' AND postId = " + req.body.id + ";" ;
            con.query(check,function(err,results){
                // console.log(results);
                if(results.length == 0){
                    let query = "INSERT INTO saved (email,postId) VALUES ('" + obj.email + "','" + req.body.id + "');";
                    con.query(query, function(err, results) {
                        if(err){
                            res.send({
                                status: 0,
                                msg: err.message,
                                data: {}
                            })
                        } else{
                            res.send({
                                status: 1,
                                msg: "Post saved successfully",
                                data: {}
                            })
                        }
                    })
                } else {
                    res.send({
                        status: 1,
                        msg: 'Already Saved!',
                        data: {},
                    })
                }
            }) 
        }
    })

}