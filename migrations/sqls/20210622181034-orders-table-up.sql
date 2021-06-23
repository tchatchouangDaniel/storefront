CREATE TABLE orders (
    id SERIAL, 
    user_id integer references users ON DELETE CASCADE ON UPDATE CASCADE, 
    status varchar(10), 
    primary key(id), 
    foreign key(user_id) references users (id)
)