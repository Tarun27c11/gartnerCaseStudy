CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Seeding sample user
INSERT INTO users (username, password) VALUES
('tarun', 'password123'),
('vibhu', 'securepass'),
('shyna', 'Shyna123');

-- Seed products
INSERT INTO products (name, price) VALUES
('T-shirt', 3419.99),
('Jeans', 1249.99),
('Sneakers',13389.99),
('Backpack', 34534.99),
('Sunglasses', 424.99),
('Hat', 215.99);