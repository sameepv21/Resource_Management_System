exports.logout = (req, res) => {
    req.session.destroy(function(){
        console.log("Successfully destroyed session.");
    });
    res.send({
        status: 1,
        msg: "Logout Successfull",
        data: {},
    });
}