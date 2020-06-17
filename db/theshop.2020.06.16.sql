


DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;

INSERT INTO `department` (`id`, `name`)
VALUES
	(1,'Sales'),
	(2,'Legal'),
	(3,'Bookkeeping'),
	(4,'Stocker'),
	(5,'Tech Support');

/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `role_id` int(11) NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `employees` WRITE;


INSERT INTO `employees` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`)
VALUES
	(1,'Richard','Hendricks',8,5),
	(2,'Nelson','Bighetti',8,5),
	(3,'Bertram','Gilfoyle',7,1),
	(4,'Dinesh','Chugtai',7,1),
	(5,'Monica','Hall',6,0),
	(6,'Jared','Dunn',5,1),
	(7,'Gavin','Belson',4,0),
	(8,'Jjan','Yang',3,0),
	(9,'Laurie','Bream',1,0),
	(10,'Erlich','Bachman',2,1),
	(11,'Russ','Hanneman',4,0);


UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,2) unsigned DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `roles` WRITE;


INSERT INTO `roles` (`id`, `title`, `salary`, `department_id`)
VALUES
	(1,'Sales Mgr',100000.00,1),
	(2,'Sales',60000.00,1),
	(3,'Lawyer',100000.00,2),
	(4,'Bookkeeper',80000.00,3),
	(5,'Stocker',50000.00,4),
	(6,'Stock Mgr',60000.00,4),
	(7,'Tech',100000.00,5),
	(8,'Tech Mgr',150000.00,5);


UNLOCK TABLES;

