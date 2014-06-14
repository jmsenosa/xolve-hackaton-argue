var express = require('express');
var router = express.Router(); 
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var session = require('express-session');
var mysql =  require('mysql'); 
var model = require("../model/model");

var pool  =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: ''
});

/* GET home page. */
router.get('/', function(req, res) {
    var sess = req
    console.log(sess);
    res.render('index', { title: session.secret });
});

router.get('/view_session',function(req, res){
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;  
     
    pool.getConnection(function(err, connection){

        connection.query("use argument");
        connection.query("select * from arguments where arg_id = '" + query.id + "'",  function(err, rows){
            
            if(err) {
                 res.send('bawal');
            }else{
                var argument = rows[0];        
                args_comment = model(query.id,function(err, data){
                    argument.comments = data;
                    argument.account_id = query.account;
                    res.render('view', argument);
                });        
            }
        });
        connection.release();
    });
});

router.post('/comment',function(req, res){
    var comment = req.body; 
    console.log(comment);
    comment.arc_comment.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    pool.getConnection(function(err, connection){
        connection.query("use argument");
        connection.query('INSERT INTO arguments_comment (acc_id, arg_id, arc_comment) VALUES ("'+comment.acc_id+'","'+comment.arg_id+'","'+comment.arc_comment+'")',function(err, rows){
            if (err) {
                res.redirect('back');
            }else
            {
                res.redirect('back');
            }
        });
    })
});
module.exports = router;
