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
            let email = JSON.parse(req.cookies.cookie);
            var query = "SELECT * FROM temp WHERE email='"+ email.email +"';" ;
            // console.log('Query: ' + obj.email);
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
                    let IURL = 'https://res.cloudinary.com/didf23s1x/image/upload/v1610778072/RMS/defaultProfilePicture_cq1mlw.jpg'
                    if(results[0].imageUrl) {
                        // console.log('Image Found');
                        IURL = results[0].imageUrl;
                    }
                    var content = {
                        firstName: results[0].fname,
                        lastName: results[0].lname,
                        email: results[0].email,
                        roll: results[0].rollNo,
                        imageUrl: IURL,
                    }
                    res.send({
                        status: 1,
                        success: true,
                        msg: "Data provided",
                        data: JSON.stringify(content),
                    });
                }
            });
        }
    });
}