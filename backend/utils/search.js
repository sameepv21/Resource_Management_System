var mysql = require('mysql');

exports.search = (req,res) => {
    let con = mysql.createConnection({
        host: 'localhost',
        database: 'mydb',
        user: 'root',
        password: 'root',
    })
    // con.connect(function(err) {
    //     if(err) {
    //         res.send({
    //             status: 0,
    //             msg: err.message,
    //             data: {},
    //         });
    //     } else {
    //         let search = req.body.search;
    //         // for tag: starts with #
    //         if(){
    //             let query = "SELECT * FROM posts WHERE tag = '" + search + "';";
    //             con.query(query, function(err, results) {
    //                 if(err) {
    //                     res.send({
    //                         status: 0,
    //                         msg: err.message,
    //                         data: {},
    //                     });
    //                 } else {
    //                     console.log(JSON.stringify(results[0]))
    //                     if(results.length() == 0){
    //                         res.send({
    //                             status: 0,
    //                             msg: "No such tag found",
    //                             data:{},
    //                         })
    //                     }
    //                     res.send({
    //                         status: 1,
    //                         msg: 'Successfully Updated',
    //                         searchType: "tag",
    //                         current: true,
    //                         data: {
    //                             results
    //                         },
    //                     })
    //                 }
    //             });
    //         } 
    //         // for email: contains @
    //         else if(){
    //             let query = "SELECT * FROM user WHERE email = '" + search + "';";
    //             con.query(query, function(err, results) {
    //                 if(err) {
    //                     res.send({
    //                         status: 0,
    //                         msg: err.message,
    //                         data: {},
    //                     });
    //                 } else {
    //                     console.log(JSON.stringify(results[0]))
    //                     if(results.length() == 0){
    //                         res.send({
    //                             status: 0,
    //                             msg: "No such tag found",
    //                             data:{},
    //                         })
    //                     }
    //                     res.send({
    //                         status: 1,
    //                         msg: 'Successfully Updated',
    //                         searchType: "name",
    //                         current: true,
    //                         data: {
    //                             results
    //                         },
    //                     })
    //                 }
    //             });
    //         }
    //     }
    // });
}

