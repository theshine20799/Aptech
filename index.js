const http=require('http');
const express = require("express");
const bodyParser=require('body-parser');
const morgan= require('morgan');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app=express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
//const ExPHP= require ('php-express');
app.use(express.static('./public'));
//app.use(morgan('short'));
app.listen(3000,'0.0.0.0',() => console.log("Server running on port 3000"));
//cau hinh View Engine PHP
var path = require('path');
//var router = express.Router();
//var phpExpress = require('php-express')({
//    binPath: 'php'
//});
// app.set('views', path.join(__dirname, '/View'));
// app.engine('php', phpExpress.engine);
// app.set('view engine', 'php');
// app.all(/.+\.php$/, phpExpress.router);
//cau hinh ejs
app.set("view engine","ejs");
//cau hinh file chua ejs (khi su dung ejs thi dung res.render() thay vi res.send)
app.set("views","./View");
// database
const mysql=require('mysql');
var {conn,SQL}= require('./connectDB');

// -------------------PAge Main---------------------
app.get("/", function(req,res){
    res.send("<h1 style='color:green'>Welcome to System Aptech</h1>");
});
// load 1 trang html bang ejs
app.get("/home", function(req,res){
	res.render("home");
});
// Render Connect.php with View Engine
app.get("/phpExcel", function(req,res){
	res.render("formInsert");
});
//--------------------------DiemDanh----------------------
//Hien thi ds sinh vien theo ID_LOP tu bang DIEMDANH
app.get('/StudentOfClass/:IdClass', async function(req,res){
    var pool = await conn;
    let ID_Class = req.params.IdClass;
    var sqlString = `SELECT RollNumber,PortalID,HoTen FROM APTECH_DMDIEMDANH WHERE LOP_ID=${ID_Class}`;
    return await pool.request().query(sqlString, function(err,data){
        if(err)
            console.log(err);
        res.json(data);
    });
});
//Hien thi Table DIEMDANH
app.get('/TableDIEMDANH', async function(req,res){
    var pool = await conn;
    var sqlString='SELECT * FROM APTECH_DMDIEMDANH';
    return await pool.request().query(sqlString, function(err,data){
        if(err)
            console.log(err);
        res.json(data);
    });
});

//--------------------------MonHoc----------------------
//hiển thị table MonHoc with JSON
app.get('/TableMonHocJS',async function(req,res){
    var pool = await conn;
    var sqlString='SELECT * FROM APTECH_DMMONHOC';

    return await pool.request().query(sqlString, function(err,data){
        if(err)
            console.log(err);
        res.json(data);
    });
});
//--------------------------LopHoc----------------------
//Hien thi lop theo ten gv
app.get('/GiaoVienOfClass/:name', async function(req,res){
    var pool = await conn;
    String : nameTeacher = req.params.name;
    //var sqlString='SELECT * FROM APTECH_DMLOP WHERE LH_UserName= ${nameStudent}';
    var sqlString = `SELECT * FROM APTECH_DMLOP WHERE LH_UserName=${nameTeacher}`;
    return await pool.request().query(sqlString, function(err,data){
        if(err)
            console.log(err);
        res.json(data);
    });
});
//Hien thi lop theo ID lop 
app.get('/IdOfClass/:IdClass', async function(req,res){
    var pool = await conn;
    String : ID = req.params.IdClass;
    
    var sqlString = `SELECT * FROM APTECH_DMLOP WHERE LOP_ID=${ID}`;
    return await pool.request().query(sqlString, function(err,data){
        if(err)
            console.log(err);
        res.json(data);
    });
});
//kiem tra user va pass  khi dang nhap
// app.get('/loginConfirm/:IdClass', async function(req,res){
//     var pool = await conn;
//     String : ID = req.params.IdClass;
    
//     var sqlString = `SELECT * FROM APTECH_DMLOP WHERE KHOA_ID=${ID}`;
//     return await pool.request().query(sqlString, function(err,data){
//         if(err)
//             console.log(err);
//         res.json(data);
//     });
// });

//kiem tra user va pass  khi dang nhap
app.get('/login/:id/:pass',async function(req,res){
    console.log("dtd");
    var pool = await conn;
    String: Id=req.params.id;
    String: Pass=req.params.pass;

    var sqlString= `SELECT id FROM APTECH_USER_CTDT WHERE username= ${Id} AND password=${Pass}`;
    return await pool.request().query(sqlString, function(err,data){
        console.log(data);
        if(err)
            console.log(err);
        if(data.recordset!= ''){
            res.json('1');
        }else{
            res.json('0');
        }
    });
});