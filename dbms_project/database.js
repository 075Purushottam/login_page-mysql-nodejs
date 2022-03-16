const express = require("express");
const { append } = require('express/lib/response');
const path = require("path");
const hbs = require("hbs");
var mysql = require('mysql');
const bodyParser = require('body-parser');
const { send } = require("process");
var router = express.Router();
let http = require('http');
const app =express();
var fs = require('fs');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
const template_path = path.join(__dirname, "../templates/views");
app.use(bodyParser.urlencoded({entended: false}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");
app.set("views",template_path);

app.get("/", function (req,res) {
    res.sendFile("homepage.html",{root:__dirname});
});


var conn =  mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '01#Cyber', 
    database: 'scholarship'
    });
    app.listen(port, ()=>
{
    console.log(`server is running at port no ${port}`);
});
     conn.connect(function(err){
        if(err)
         throw err;
    //      conn.query("select * from login_detail",function(error,result,fields){
    //          if(error){
    //             console.log('error in query');
    //          }
            console.log('connected');
    
     });
     app.post("/login", async (req,res)=> {
    
         psw=req.body.psw;
         roll_no=req.body.roll_no;
         
         conn.query("select roll_no from login_detail",function(error,result,fields){
            
               if(error){
                         console.log('error in query');
                     }
                     else{
                      Object.keys(result).forEach(function(key){
                        
                            var user=result[key];
                            if(user.roll_no==roll_no && user.password==psw){
                              console.log('login successfully');
                              res.sendFile(__dirname + "/student_page.html"); 
                        }   
                        })
                     
                     }
                     
                        
            });
        });
         
  app.post("/homepage", async (req,res)=> {
    
        cpsw=req.body.cpsw;
         psw=req.body.psw;
         roll_no=req.body.roll_no;
       
       if(psw == cpsw){
       var sql = "insert into login_detail values('" + roll_no + "','"+ psw +"')";
       conn.query(sql, (err, rows, fields) => {
      
          if(!err) 
            res.send("User successfully added");
          else 
            console.log(err);
        });
    
      
       }
       else{
           res.send("Password Not MAtched");
       }
       
 });
    
//  app.get('/rows', function (req, res) {
//     conn.connect();  
//     conn.query('SELECT roll_no FROM login_detail', function(err, rows, fields) {  
//         conn.end();
//         if (err) throw err;  
//         res.json(rows); 
//     });
// });
app.get("/", function (req,res) {
    res.sendFile("student_page.html",{root:__dirname});
});

 app.post("/student", async (req,res)=> {
    
      fname=req.body.fname;
     enroll=req.body.enroll;
     Fname=req.body.Fname;
     address=req.body.address;
     category=req.body.cat;
     gender=req.body.gender;
     
     lname=req.body.lname;
     adhaar=req.body.adhaar;
     mname=req.body.mname;
     mob=req.body.phone;
     dob=req.body.dob;


     console.log(adhaar);
     console.log(dob);
     var sql = "insert into student_detail values('" + enroll + "','"+ fname +"','" + lname + "','"+ category +"','" + dob + "','"+ gender +"','" + mname + "','"+ Fname +"','" + mob + "','"+ address +"','" + adhaar + "')";
        conn.query(sql, (err, rows, fields) => {
      
           if(!err) 
             res.send("student data added");
           else 
             console.log(err);
         });
     });