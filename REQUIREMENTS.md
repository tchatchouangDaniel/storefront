# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index /products [GET]
- Show /products/:id [GET]
- Create [token required] /products [POST]
- [OPTIONAL] Top 5 most popular products /products/top_five_popular [GET]
- [OPTIONAL] Products by category (args: product category) /products/:category [GET]

#### Users

- Index [token required] /users [GET]
- Show [token required] /users/:id [GET]
- Create N[token required] /users [POST]

#### Orders

- Current Order by user (args: user id)[token required] /orders/:userId [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] /orders/completed/:userId [GET]

## Data Shapes

#### Product

- id
- name : string
- price : number
- [OPTIONAL] category : number [id]

#### User

- id : number
- firstName : string
- lastName : string
- password : string [hashed]

#### Orders

- id : number
- id of each product in the order : number
- quantity of each product in the order : number
- user_id : number
- status of order (active or complete) : "active" | "complete"

#### [ADDED] Category

- id : number
- name : string

## Database tables

1- Users (id integer unsigned not null AUTO_INCREMENT, firstname varchar(100), lastname varchar(100), password varchar, primary key (id))
3- Products (id integer unsigned not null AUTO_INCREMENT, name varchar, description text, category_id integer, primary key (id), foreign key(category_id) references categories.id)
4- Orders (id integer unsigned not null AUTO_INCREMENT, user_id integer, status varchar(10), primary key(id), foreign key(user_id) references users.id)
2- Categories (id integer unsigned not null AUTO_INCREMENT, name varchar(100), primary key(id))
5- order_products (id integer unsigned not null AUTO_INCREMENT, product_id integer, order_id integer, quantity integer, primary key(id), foreign key(product_id) references products.id, foreign key(order_id) references orders.id)
