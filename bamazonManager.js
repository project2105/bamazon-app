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
                    })
                    console.log(choices);
                }),


                    function viewInventory() {
                        console.log('  ID  Product  Department  Price');
                        connection.query("select * from products where stock_quantity < 5", function (err, res2) {
                            if (err) { throw err } else {
                                var choices2 = res2.map(function (item) {
                                    return `${item.item_id}  ${item.product_name}  ${item.department_name}  $${item.price}  ${item.stock_quantity}`
                                })
                                console.log(choices2);
                            }
                        }),


                            addInventory() {
                            inquirer.prompt([
                                {
                                    type: "input",
                                    name: "id",
                                    message: "What product do you want to increase the inventory?"
                                },
                                {
                                    type: "input",
                                    name: "quantity",
                                    message: "How many more do you want to add to inventory?"
                                },
                            ]).then(function (answer2) { },
                            ])
                        }

                    };
                addProduct() {
                    addInventory() {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "product_name",
                                message: "What product do you want to add?"
                            },
                            {
                                type: "input",
                                name: "department_name",
                                message: "In what department does the product belong?"
                            },
                            {
                                type: "input",
                                name: "price",
                                message: "What is the price per unit?"
                            },
                            {
                                type: "input",
                                name: "stock_quantity",
                                message: "What is the initial amount of stock?"
                            },
                        ]).then(function (answer3) {
                            var product_name = answer3.product_name;
                            var department_name = answer3.department_name;
                            var price = answer3.price;
                            var stock_quantity = answer3.stock_quantity;
                            var productInsert = "insert into products (product_name, department_name, price, stock_quantity) values (" + product_name + "," + department_name + "," + price + "," + stock_quantity + "),";
                            connection.query(productInsert);
                        ])

                    };


                }
            }
        })
    }
})
