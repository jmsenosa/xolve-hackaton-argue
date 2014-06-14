var mysql = require('mysql');
var pool  =  mysql.createPool({
    host : 'localhost',
    user : 'root',
    password: ''
});

module.exports = function(arg_id, callback){
    pool.getConnection(function(err, connection) { 
        var mysql_query = 'SELECT * FROM arguments_comment JOIN account ON arguments_comment.acc_id = account.acc_id WHERE arguments_comment.arg_id = '+arg_id+' ORDER BY arc_datetime';
        connection.query("use argument");
        connection.query(mysql_query, function(err, rows) {  
            if (err) {
                callback(err,null);
            }else
            {
                callback(null,rows);
            }
            connection.release();    
        });
    });
}


