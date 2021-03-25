-- drop schema public cascade;
-- create schema public;

DROP TABLE IF EXISTS coffee_orders;
DROP TABLE IF EXISTS customers;

-- INT or INTEGER or SERIAL -> 32bit number
-- BIGINT or BIGINTEGER or BIGSERIAL -> 64bit number

CREATE TABLE customers (
  customer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_address VARCHAR(255) NOT NULL
);


CREATE TABLE coffee_orders (
  order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  coffee_type TEXT CHECK (LENGTH(coffee_type) < 30),
  quantity INTEGER CHECK (quantity > 0),
  order_date DATE DEFAULT CURRENT_DATE ,
  subscription INTEGER CHECK (subscription < 13),
  linked_customer_id INT,
  
  CONSTRAINT customer_fk
    FOREIGN KEY (linked_customer_id)
    REFERENCES customers(customer_id)
);



INSERT INTO customers(customer_name, customer_address)
    VALUES
        ('John Smith', '123 Wallaby Way'),
        ('Purple Cow', '499 Go Home Street'),
        ('Dwayne Johnson', '100 You Are Wrong Drive'),
        ('April Jones', '552 Maybe Not Lane');


INSERT INTO coffee_orders(coffee_type, quantity, order_date, subscription, linked_customer_id) VALUES
    ('Ethopian', 5, DEFAULT, 2, 1),
    ('Honduras', 10, DEFAULT, 3, 1),
    ('Brazil', 15, DEFAULT, 4, 2),
    ('Colombian', 20, DEFAULT, 2, 2),
    ('Vietnam', 25, DEFAULT, 5, 2),
    ('Indonesia', 30, DEFAULT, 9, 3),
    ('Mexico', 35, DEFAULT, 7, 3),
    ('Peru', 40, DEFAULT, 6, 4),
    ('Haitian', 45, DEFAULT, 12, 4);