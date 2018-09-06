var mysql = require("mysql");
var inquirer = require("inquirer");
var currentPrice = '';
var currentProduct = '';

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();


    function afterConnection() {

        inquirer.prompt([
            {
                type: "list",
                name: "task",
                message: "Manager Options: Choose a Task.",
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
            },
        ]).then(function (answer) {
            console.log(answer);
            var task = answer.task;

            if (task === 'View Products for Sale') {
                viewProducts();
            } else if (task === 'View Low Inventory') {
                viewInventory();
            } else if (task === 'Add to Inventory') {
                addInventory();
            } else if (task === 'Add New Product') {
                addProduct();
            }

            function viewProducts() {
                console.log('  ID  Product  Department  Price  Quantity in Stock');
                connection.query("select * from products", function (err, res) {
                    if (err) { throw err };
                    var choices = res.map(function (item) {
                        return `${item.item_id}  ${item.product_name}  ${item.department_name}  $${item.price}  ${item.stock_quantity}`
                        console.log(choices);
                    })

                }),
            }

            function viewInventory() {
                console.log('  ID  Product  Department  Price');
                connection.query("select * from products where stock_quantity < 5", function (err, res) {
                    var choices = res.map(function (item) {
                        return `${item.item_id}  ${item.product_name}  ${item.department_name}  $${item.price}  ${item.stock_quantity}`
                    })
                    if (err) throw err;
                    console.log(choices);
                }),

            }

            function queryProductName() {
                var searchProduct = "select product_name from products where item_id=" + orderId;
                connection.query(searchProduct, function (err, orderProduct) {
                    if (err) throw err;
                    console.log('res2 ', orderProduct[0].product_name);
                    currentProduct = orderProduct[0].product_name;
                });
            }

            queryProductName();

            function queryPrice() {
                var searchPrice = "select price from products where item_id=" + orderId;
                connection.query(searchPrice, function (err, orderPrice) {
                    if (err) throw err;
                    console.log('price ', orderPrice[0].price);
                    currentPrice = orderPrice[0].product_price;
                });
            }
            queryPrice();

            function queryStock() {
                var searchStock = "select stock_quantity from products where item_id=" + orderId;
                connection.query(searchStock, function (err, currentStock) {
                    if (err) throw err;
                    console.log('stock ', currentStock[0].stock_quantity);
                    currentStock = currentStock[0].stock_quantity;
                    if (currentStock < orderAmount) {
                        console.log('Insufficient quantity!')
                    } else {
                        newStock = currentStock - orderAmount;
                        console.log(newStock);
                        updateStock(newStock)
                    }
                });
                function updateStock(newStock) {
                    console.log(newStock)
                    var updateStock = "update products SET stock_quantity =" + newStock + " WHERE item_id=" + orderId;
                    connection.query(updateStock, function (err, res3) {
                        if (err) throw err;
                        console.log(res3);
                    });
                }
            }
            queryStock();

        });




    })
    }
})
