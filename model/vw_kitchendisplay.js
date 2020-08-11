const Sequelize = require('sequelize');
const sequelize = global.sequelize_HBDB;

const vw_kitchendisplay = sequelize.define('vw_kitchendisplay', {
    transid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    prodcode: Sequelize.STRING,
    prodname: Sequelize.STRING,
    qty: Sequelize.STRING,
    layanan: Sequelize.STRING,
    status: Sequelize.INTEGER,
    entrydate: Sequelize.DATE
}, { timestamps: false, freezeTableName: true });

module.exports = vw_kitchendisplay