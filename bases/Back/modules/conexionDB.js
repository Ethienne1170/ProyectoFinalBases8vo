const mysql=require('mysql2');

const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'elalmanaque'
})

connection.connect((error)=>{
    if (error) {
        console.error(error);
    } else {
        console.log("firus firus uber allen")
    }
})


module.exports=connection;