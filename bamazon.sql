DROP DATABASE IF EXISTS bammy_DB;
CREATE DATABASE bammy_DB;

USE bammy_DB;

CREATE TABLE products (
	itemid INT AUTO_INCREMENT NOT NULL,
	productname varchar(50) NOT NULL,
	departmentname varchar(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stockquantity int(20) NOT NULL,
	PRIMARY KEY (itemid)
);

INSERT INTO products (productname, departmentname, price, stockquantity)
VALUES 
("red apples","bodegaOne",2.25,25),
("bannanas","bodegaTwo",3.10,30),
("pinnapples","bodegaThree",2.98,14),
("pears","bodegaFour",3.05,12),
("peaches","bodegaFive",4.10,18),
("strawberries","bodegaOne",3.20, 45),
("blueberries","bodegaTwo",2.01,32),
("green apples","bodegaThree",3.55,22),
("blackberries","bodegaFour",3.80,16),
("tomatoes","bodegaFive",4.10,37);
