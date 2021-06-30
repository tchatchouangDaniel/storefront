CREATE TABLE users (
    id SERIAL,
    username varchar(100), 
    firstname varchar(100), 
    lastname varchar(100), 
    password varchar, 
    primary key (id)
);