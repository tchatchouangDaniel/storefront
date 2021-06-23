CREATE TABLE products (
    id SERIAL,
    name varchar,
    description text,
    category_id integer references categories ON DELETE CASCADE ON UPDATE CASCADE,
    primary key (id),
    foreign key(category_id) references categories (id)
)