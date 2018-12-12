DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT (30) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("Tony Hawk Skateboard", "Sporting Goods", 100.00, 100), 
("Diamond Ring", "Jewelry", 1000.00, 20),
("Ferrari", "Automotive", 100000.00, 3),
("20 x 16 Landscapre Fabric", "Home and Garden", 20.00, 50),
("Cindy Crawford Couch", "Home Goods", 500.00, 20),
("Copa Soccer Ball", "Sporting Goods", 30.00, 20),
("Fiscars Tree Prunner", "Home and Garden", 40.00, 25),
("Tag Hauer Carrera Watch", "Jewelry", 1500.00, 30),
("Franklin Basball Glove", "Sporting Goods", 50.00, 200),
("David Yurman Bracelet", "Jewelry", 250.00, 36),
("12 X 12 Concrete Paver", "Home and Garden", 5.00, 100),
("Ethan Allen Side Table", "Home Goods", 300.00, 24)

