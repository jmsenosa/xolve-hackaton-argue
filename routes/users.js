var express = require('express');
var router = express.Router();


var mysql =  require('mysql');
var crypto = require('crypto');

var session = require('cookie-session');

var fs = require('fs');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');

var app = express()
app.use(cookieParser());


var pool  =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: ''
});
 

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});


router.post('/login',function(req, res){

    var username = req.body.username,
        password = crypto.createHash('md5').update(req.body.password).digest('hex');    

        pool.getConnection(function(err, connection){
         
        connection.query("use argument");
        connection.query("select * from account where acc_username = '" + username + "' and acc_password = '" + password +"'",  function(err, rows){
            if(err) {
                throw err;
            }else{  
                var app = express();
                
                app.use(cookieParser())
                app.use(session({
                    secret: username
                  , proxy: true // if you do SSL outside of node.
                  , cookie: { secure: true }
                }))
                res.redirect("/argument");
            }
        });
      
      connection.release();
    });
    
});

router.get('/create_argument',function(req, res, next){
     // 
     console.log(req)
     res.send(req);
});

module.exports = router;
 