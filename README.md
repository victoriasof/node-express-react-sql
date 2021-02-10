# node-express-react-sql

#### Create the database

CREATE DATABASE node_api;

CREATE TABLE users (

    -> id INT AUTO_INCREMENT PRIMARY KEY,
    
    -> name VARCHAR(255) NOT NULL,
    
    -> email VARCHAR(255) NOT NULL,
    
    -> password VARCHAR(255) NOT NULL
    
-> );
