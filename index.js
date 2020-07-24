const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { response } = require('express');
const connection  =  require('./connection');
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/api/getAllTransaction', function(req, res) {
  const vw_kitchendisplay = require('./model/vw_kitchendisplay');
  vw_kitchendisplay.findAll().then(function(vw_kitchendisplay) {
    res.send(JSON.stringify({"status": 200, "error": null, "response": vw_kitchendisplay}));
  })
  
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
const senddata = require('./send_data')
app.post('/api/transaction_add', senddata.add_transaction);
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});