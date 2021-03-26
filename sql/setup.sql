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
    ON DELETE SET NULL
);

