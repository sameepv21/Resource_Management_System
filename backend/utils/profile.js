var mysql = require('mysql');

exports.profile = (req, res) =>{
    // console.log("Entered profile backend");
    var con = mysql.createConnection ({
        host: "localhost",
        user:"root",
        password:"root",
        database: "mydb",
    });

    con.connect(function(err){
        if(err){
            res.send({
                status: 0,
                msg: "There is an error with server, please try later",
            });
        }
        else{
            var query = "SELECT * FROM temp WHERE email='"+ req.cookies.cookie +"';" ;
            // console.log("query: "+ query);
            con.query(query, function(err,results){
                // console.log("results: "+ JSON.stringify(results));
                if(err){
                    res.send({
                        status: 0,
                        msg: "Error found",
                        data: {},
                    });
                }
                else{
                    var content = {
                        firstName: results[0].fname,
                        lastName: results[0].lname,
                        email: results[0].email,
                        roll: results[0].rollNo,
                        imageUrl: results[0].imageUrl,
                    }
                    res.send({
                        status: 1,
                        msg: "data provided : )",
                        data: JSON.stringify(content),
                    });
                }
            });
        }
    });
}