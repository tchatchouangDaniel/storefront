CREATE TABLE order_products (
    id SERIAL, 
    product_id integer references products ON DELETE CASCADE ON UPDATE CASCADE,
    order_id integer references orders ON DELETE CASCADE ON UPDATE CASCADE, 
    quantity integer, 
    primary key(id), 
    foreign key(product_id) references products (id), 
    foreign key(order_id) references orders (id)
)