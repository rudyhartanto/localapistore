const config = require('./config.json')
const Sequelize = require('sequelize');

const sequelize_HBDB = new Sequelize(config.database.database, config.database.user, config.database.password, {
	host: config.database.host,
	dialect: 'mysql',
	port: config.database.port ? config.database.port : 3306,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	timezone: "+07:00",
	logging: config.database.logging,
	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
	operatorsAliases: false
});

sequelize_HBDB.authenticate()
.then(() => {
  	console.log('Connection has been established successfully from HBDB.');
})
.catch(err => {
    console.error('Unable to connect to the database from HBDB:', err);
});

global.sequelize_HBDB = sequelize_HBDB;