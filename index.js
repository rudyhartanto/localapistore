const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { response } = require('express');
const connection  =  require('./connection');

var rawBodySaver = function (req, res, buf, encoding) {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || 'utf8');
	}
}

// parse application/json
app.use(bodyParser.json({ limit: '20mb', verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ limit: '20mb', verify: rawBodySaver, type: function () { return true } }));

app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Credentials", true);
	// res.header("Access-Control-Allow-Origin", "http://localhost:6987");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "content-type, api-key");
	next();
})

app.disable('etag');
 
app.get('/api/getAllTransaction/:offset(\\d+)/:limit(\\d+)', function(req, res) {
  const vw_kitchendisplay = require('./model/vw_kitchendisplay');
  vw_kitchendisplay.findAll({
    offset: parseInt(req.params.offset), limit: parseInt(req.params.limit),
    order: [
        ['transid', 'ASC']
    ]
  }).then(function (vw_kitchendisplay) {
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
  
  app.get('/api/update_transaction_detail/:iddata(\\d+)/:statusupdate(\\d+)',(requpdate, resupdate) => {
    var dateFormat = require('dateformat');
    var dateNow=dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");

    const HBDB_orderdtl = require('./model/HBDB_orderdtl');
    HBDB_orderdtl.update(
        { status: requpdate.params.statusupdate,
        finish_date : dateNow }, //what going to be updated
        { where: { id: requpdate.params.iddata }} // where clause
    )
    .then(result => {
      resupdate.send(JSON.stringify({"status": 200, "error": null, "response": requpdate.params.statusupdate +'=='+requpdate.params.iddata}));
    })
    .catch(error => {
      resupdate.send(JSON.stringify({"status": 400, "error": null, "response": error}));
    })
          
  });

  app.get('/api/update_transaction_header/:transid/:headerStatus(\\d+)',(requpdate, resupdate) => {
    var dateFormat = require('dateformat');
    var dateNow=dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");

    const HBDB_orderdtl = require('./model/HBDB_orderhdr');
    var fieldUpdate = new Array();
    if(requpdate.params.headerStatus == 1){
      fieldUpdate = { "status" : requpdate.params.headerStatus, "finish_packingdate" : dateNow };
    }else if(requpdate.params.headerStatus == 2){
      fieldUpdate = { "status" : requpdate.params.headerStatus, "finish_deliverydate" : dateNow };
    }else{
      fieldUpdate = { "status" : requpdate.params.headerStatus, "void_date" : dateNow };
    }
    console.log(fieldUpdate);
    HBDB_orderdtl.update(
        fieldUpdate, //what going to be updated
        { where: { transid: requpdate.params.transid }} // where clause
    )
    .then(result => {
      resupdate.send(JSON.stringify({"status": 200, "error": null, "response": requpdate.params.headerStatus +'=='+requpdate.params.transid}));
    })
    .catch(error => {
      resupdate.send(JSON.stringify({"status": 400, "error": null, "response": error}));
    })
          
  });

  
//Tambahkan data product baru
const senddata = require('./send_data')
app.post('/api/transaction_add', senddata.add_transaction);
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});