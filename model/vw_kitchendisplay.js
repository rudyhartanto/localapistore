const Sequelize = require('sequelize');
const sequelize = global.sequelize_HBDB;

const HBDB_orderdtl = sequelize.define('vw_kitchendisplay', {
    transid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    prodcode: Sequelize.STRING,
    prodname: Sequelize.STRING,
    qty: Sequelize.STRING,
    layanan: Sequelize.STRING
}, { timestamps: false, freezeTableName: true });

module.exports = HBDB_orderdtl