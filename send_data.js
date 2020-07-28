const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash')
const app = express();
const { response } = require('express'); 
const async = require('async');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const HBDB_orderhdr = require('./model/HBDB_orderhdr');
const HBDB_orderdtl = require('./model/HBDB_orderdtl')

// parse application/jsonoooooooo
app.use(bodyParser.json()); 

    exports.add_transaction = async function(req, res) {
        async.waterfall([
            function insert(next) {
                var query = HBDB_orderdtl;
                var queryHDR = HBDB_orderhdr;

                var dateFormat = require('dateformat');
                var dateNow=dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");

                //deleteData
                query.destroy({
                    where: {
                        transid: req.body.transid //this will be your id that you want to delete
                    }
                 }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                   if(rowDeleted === 1){
                      console.log('Deleted successfully');
                    }
                 }, function(err){
                     console.log(err); 
                 });

                 queryHDR.destroy({
                    where: {
                        transid: req.body.transid //this will be your id that you want to delete
                    }
                 }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                   if(rowDeleted === 1){
                      console.log('Deleted successfully');
                    }
                 }, function(err){
                     console.log(err); 
                 });

                query.sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED }, (t) => { 
                    return queryHDR.create({
                        transid: req.body.transid, 
                        transdate: req.body.transdate,
                        storeid: req.body.storeid,
                        entryuser: req.body.entuser,
                        posid: req.body.posid,
                        device: req.body.device,
                        status: 0,
                        entrydate:dateNow
                    }, { transaction: t }).then(inserted => {
                        
                        var objectvar   =  req.body.order_detail;
                        var datadetail = "";
                        var arrayDetail = [];
                        for(var attributename in objectvar){
                                                   
                            var detailprod  = objectvar[attributename];
                            var pcsdetail   = detailprod.split("|");

                            var inviteObj   = {
                                transid: req.body.transid, 
                                prodcode: attributename,
                                prodname: pcsdetail[3],
                                qty: pcsdetail[1],
                                price: pcsdetail[2],
                                type: pcsdetail[0]
                            } 
                            arrayDetail.push(inviteObj);
        
                        }

                       //console.log(arrayDetail);
                        return query.bulkCreate(
                            arrayDetail
                        ,{transaction:t})
                    })
                })
                .then(result => {
                    next(null, "masuk nih")
                }).catch(err => {
                    console.log("insert Table failed:", err)
                    next(fatal_error)
                })
            }
         ], (error, result) => {
            let response
            if(error){
                response = { ec: error.code, message: error.message, data: result }
            } else{
                response = { ec: 200, message: 'success', data: result }
            }
            res.send(response)
         }
    )}