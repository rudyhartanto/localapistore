const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { response } = require('express');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tahu1',
  database: 'HBDB_StoreIntServer'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//tampilkan semua data product
app.get('/api/transaction',(req, res) => {
  let sql = "SELECT * FROM HBDB_orderhdr";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
//tampilkan data header berdasarkan id
app.get('/api/transaction_header/:id',(req, res) => {
    let sql = "SELECT * FROM HBDB_orderhdr WHERE transid='"+req.params.id+"'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
//tampilkan data header berdasarkan id
app.get('/api/transaction_detail/:id',(req, res) => {
    let sql = "SELECT * FROM HBDB_orderdtl WHERE transid='"+req.params.id+"'";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//Tambahkan data product baru
app.post('/api/transaction_add',(req, res) => {
    var responseinsert;
    var dateFormat = require('dateformat');
    var dateNow=dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");
    let dataheader = {
        transid: req.body.transid, 
        transdate: req.body.transdate,
        storeid: req.body.storeid,
        entryuser: req.body.entuser,
        posid: req.body.posid,
        device: req.body.device,
        status: 0,
        entrydate:dateNow
    };  

    let sql = "INSERT INTO HBDB_orderhdr SET ?";
    let query = conn.query(sql, dataheader,(err, results) => {
      if(err) throw err;
     // res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    //insert detail
    var objectvar   =  req.body.order_detail;
    var datadetail = "";
    for(var attributename in objectvar){
        /*console.log(req.body.transid);
        console.log(attributename+": "+objectvar[attributename]);*/
      
        var detailprod  = objectvar[attributename];
        var pcsdetail   = detailprod.split("|");
        let datadetail = {
            transid: req.body.transid, 
            prodcode: attributename,
            prodname: pcsdetail[3],
            qty: pcsdetail[1],
            price: pcsdetail[2],
            type: pcsdetail[0]
        };  
        let sqldetail = "INSERT INTO HBDB_orderdtl SET ?";
        let querydetail = conn.query(sqldetail, datadetail,(err, resultsdetail) => {
           if(err) throw err;
           responseinsert = resultsdetail;
          //console.log(resultsdetail);
        });
        
    }

    res.send(JSON.stringify({"status": 200, "error": null, "response": responseinsert}));
  });
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});