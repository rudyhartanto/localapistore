const Sequelize = require('sequelize');
const sequelize = global.sequelize_HBDB;

const HBDB_orderdtl = sequelize.define('HBDB_orderdtl', {
    transid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    transid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    prodcode: Sequelize.STRING,
    prodname: Sequelize.STRING,
    qty: Sequelize.INTEGER,
    price: Sequelize.DECIMAL,
    type: Sequelize.STRING,
    status: Sequelize.STRING,
    finish_date : Sequelize.DATE
}, { timestamps: false, freezeTableName: true });

module.exports = HBDB_orderdtl