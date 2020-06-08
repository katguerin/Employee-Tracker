PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE department (
id INTEGER PRIMARY KEY,
name VARCHAR(30) NOT NULL
);
INSERT INTO department VALUES(1,'Sales');
INSERT INTO department VALUES(2,'Legal');
INSERT INTO department VALUES(3,'Bookkeeping');
INSERT INTO department VALUES(4,'Stocker');
INSERT INTO department VALUES(5,'Tech Support');
CREATE TABLE employees (
id INTEGER PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT
);
INSERT INTO employees VALUES(1,'Richard','Hendricks',8,5);
INSERT INTO employees VALUES(2,'Nelson','Bighetti',8,5);
INSERT INTO employees VALUES(3,'Bertram','Gilfoyle',7,1);
INSERT INTO employees VALUES(4,'Dinesh','Chugtai',7,1);
INSERT INTO employees VALUES(5,'Monica','Hall',6,0);
INSERT INTO employees VALUES(6,'Jared','Dunn',5,1);
INSERT INTO employees VALUES(7,'Gavin','Belson',4,0);
INSERT INTO employees VALUES(8,'Jjan','Yang',3,0);
INSERT INTO employees VALUES(9,'Laurie','Bream',1,0);
INSERT INTO employees VALUES(10,'Erlich','Bachman',2,1);
INSERT INTO employees VALUES(11,'Russ','Hanneman',4,0);
CREATE TABLE roles (
id INTEGER PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,5) NOT NULL,
department_id INT
);
INSERT INTO roles VALUES(1,'Sales Mgr',100000,1);
INSERT INTO roles VALUES(2,'Sales',60000,1);
INSERT INTO roles VALUES(3,'Lawyer',100000,2);
INSERT INTO roles VALUES(4,'Bookkeeper',80000,3);
INSERT INTO roles VALUES(5,'Stocker',50000,4);
INSERT INTO roles VALUES(6,'Stock Mgr',60000,4);
INSERT INTO roles VALUES(7,'Tech',100000,5);
INSERT INTO roles VALUES(8,'Tech Mgr',150000,5);
COMMIT;
