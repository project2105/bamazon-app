drop database if exists bamazon;
create database bamazon;
use bamazon;
create table products
(
    item_id integer(10)
    auto_increment primary key,
	product_name varchar
    (30) not null,
	department_name varchar
    (20),
	price decimal
    (10, 2),
	stock_quantity integer
    (20)
);
    insert into products
        (product_name, department_name, price, stock_quantity)
    values
        ('GE refrigerator', 'appliances', 2593.10, 23000),
        ('Toshiba microwave oven', 'appliances', 199.89, 18000),
        ('White Rose Black Forest', 'books', 7.89, 9700),
        ('Edinburgh Twilight', 'books', 5.99, 6500),
        ('fleece pullover hoodie', 'clothing', 13.08, 19800),
        ('unisex cashmere scarf', 'clothing', 10.99, 10400),
        ('Acer Aspire laptop', 'computers', 239.99, 850),
        ('ASUS VivoBook', 'computers', 508.99, 750),
        ('Microsoft Office 365 Home', 'software', 79.25, 1250),
        ('Rosetta Stone Learn Spanish', 'software', 289.00, 350);

    select *
    from products;