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
    console.log(requpdate.params);
    const HBDB_orderdtl = require('./model/HBDB_orderdtl');
    HBDB_orderdtl.update(
        { status: requpdate.params.status }, //what going to be updated
        { where: { id: requpdate.params.id }} // where clause
    )
    .then(result => {
      resupdate.send(JSON.stringify({"status": 200, "error": null, "response": requpdate.params.status +'=='+requpdate.params.id}));
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