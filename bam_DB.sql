DROP DATABASE IF EXISTS bam_DB;
CREATE DATABASE bam_DB;
USE bam_DB;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(64) NOT NULL,
  dept_name VARCHAR(32) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, dept_name, price, quantity)
VALUES ("red apples", "bodega one", 2.25, 25),
("bananas", "bodega two", 3.10, 30),
("pineapples", "bodega three", 2.98, 14),
("pears", "bodega four", 3.05, 12),
("peaches", "bodega five", 4.10, 18),
("strawberries", "bodega one", 3.20, 45),
("blueberries", "bodega two", 2.01, 32),
("green apples", "bodega three", 3.55, 22),
("blackberries", "bodega four", 3.80, 16),
("tomatoes", "bodega five", 4.10, 37);