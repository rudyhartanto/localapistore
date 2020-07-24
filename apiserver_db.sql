-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.6.47 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for HBDB_StoreIntServer
CREATE DATABASE IF NOT EXISTS `HBDB_StoreIntServer` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `HBDB_StoreIntServer`;

-- Dumping structure for table HBDB_StoreIntServer.HBDB_config
CREATE TABLE IF NOT EXISTS `HBDB_config` (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `value` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table HBDB_StoreIntServer.HBDB_config: ~9 rows (approximately)
/*!40000 ALTER TABLE `HBDB_config` DISABLE KEYS */;
REPLACE INTO `HBDB_config` (`id`, `key`, `value`) VALUES
	(1, 'base_url', 'http://localhost/new_onlinesystem/'),
	(2, 'database', 'HBDB_StoreIntServer'),
	(3, 'user', 'root'),
	(4, 'password', 'tahu1'),
	(5, 'storeid', '402'),
	(6, 'screen', '1'),
	(7, 'versioning', '1.0'),
	(8, 'apiserver', 'http://localhost/local_apiserver/'),
	(9, 'ip_database', 'localhost');
/*!40000 ALTER TABLE `HBDB_config` ENABLE KEYS */;

-- Dumping structure for table HBDB_StoreIntServer.HBDB_orderdtl
CREATE TABLE IF NOT EXISTS `HBDB_orderdtl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transid` varchar(50) DEFAULT NULL,
  `prodcode` varchar(50) DEFAULT NULL,
  `prodname` varchar(50) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL COMMENT 'DI,TA DLL',
  PRIMARY KEY (`id`),
  KEY `FK_HBDB_orderdtl_HBDB_orderhdr` (`transid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table HBDB_StoreIntServer.HBDB_orderdtl: ~0 rows (approximately)
/*!40000 ALTER TABLE `HBDB_orderdtl` DISABLE KEYS */;
/*!40000 ALTER TABLE `HBDB_orderdtl` ENABLE KEYS */;

-- Dumping structure for table HBDB_StoreIntServer.HBDB_orderhdr
CREATE TABLE IF NOT EXISTS `HBDB_orderhdr` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transid` varchar(45) DEFAULT NULL,
  `storeid` varchar(45) DEFAULT NULL,
  `transdate` datetime DEFAULT NULL,
  `finish_packingdate` datetime DEFAULT '0000-00-00 00:00:00',
  `finish_deleverydate` datetime DEFAULT '0000-00-00 00:00:00',
  `status` int(10) unsigned DEFAULT NULL COMMENT '0= new,1= onpacking, 2= ondelivery, 3= finish',
  `entrydate` datetime DEFAULT '0000-00-00 00:00:00',
  `entryuser` varchar(45) DEFAULT NULL,
  `device` varchar(45) DEFAULT NULL COMMENT 'pos,app, web dll',
  `posid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transid` (`transid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table HBDB_StoreIntServer.HBDB_orderhdr: ~0 rows (approximately)
/*!40000 ALTER TABLE `HBDB_orderhdr` DISABLE KEYS */;
/*!40000 ALTER TABLE `HBDB_orderhdr` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
