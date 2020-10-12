exports.logout = (req, res) => {
    res.clearCookie('cookie');
    res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.');
    req.session.destroy(function(){
        console.log("Successfully destroyed session.");
    });
    res.send({
        status: 1,
        msg: "Logout Successfull",
        data: {},
    });
}