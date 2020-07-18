const Sequelize = require('sequelize');
const sequelize = global.sequelize_HBDB;

const drive_sales_hdr = sequelize.define('HBDB_orderhdr', {
    transid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    transdate: Sequelize.DATE,
    storeid: Sequelize.STRING,    
    entryuser: Sequelize.STRING,
    posid: Sequelize.STRING,
    device: Sequelize.STRING,
    status: Sequelize.INTEGER,
    entrydate: Sequelize.DATE    
}, { timestamps: false, freezeTableName: true });

module.exports = drive_sales_hdr