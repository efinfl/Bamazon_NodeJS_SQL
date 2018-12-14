// Reference GreatBay Week 07, Day 01,
// console.log(chalk.blue('Hello world!'))

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var connection = mysql.createConnection({
    hose: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB",
});

var answerId;
var quantPass;

// Connects to the database using connection variable above
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connect as id: " + connection.threadId);
    getItems() // getItem function is fired

});


// This gets all the items and displays it in a table
function getItems() {
    connection.query("SELECT * FROM products", //Selects all from the table named products
        function (err, results) {
            if (err) throw err;
            console.table(results); //logs formatted table
            promptId(results); // fires promptUser function
            // connection.end() // closes connection

        });
}



// Displays question and receives answer
function promptId(results) {
    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What's the ID of the product you want?",
            validate: function (value) {
                quantPass = value
                if (quantPass > 0) {
                    return true;
                }
                else {
                    return "This is not a number. Try again";
                }
            }
        }).then(function (answers) {
            answerId = answers.item_id; // Takes answer and keeps it as variable
            if (answerId < results.length && answerId > 0) { // If less than the result's index and greater than 0, console.log the id

                // connection.query("SELECT * FROM `products` WHERE `id` = ?", ['answerID'], function (err, results, fields) {
                //     if (err) throw err;
                // });
                // chosenProduct = answer.product_name

                // console.log(answer.product_name);

                console.log("--------------------------------------")
                console.log("You've chosen product ID: " + chalk.bold.yellow(answerId));
                console.log("--------------------------------------")

                promptQuantity();
            }
            else {
                console.log("Not a valid id. Try again")
            }

        });
}

function promptQuantity() {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many would you like",
            validate: function (value) {
                quantPass = value; // validates that the answer is a number
                if (quantPass > 0) {
                    console.log("This is pass " + quantPass)
                    return true;
                }
                else {
                    return "This is not a number. Try again";
                }
            }
        }).then(function (answer) {
            quantPass = parseInt(quantPass);
            connection.query("SELECT * FROM products WHERE item_id = " + answerId,
                function (err, results) {
                    // console.log(results[0].stock_quantity)
                    var quantInStock = results[0].stock_quantity
                    if (err) {
                        throw err;
                    }

                    else if (!err && quantPass < quantInStock) {
                        console.log("Your order has been placed.")
                    };
                    connection.end()
                });


            console.log("--------------------------------------");
            console.log("You want " + chalk.bold.yellow(quantPass) + " of item " + chalk.bold.yellow(answerId));
            console.log("--------------------------------------");


        });

}

// Make function to connect database, then SELECT BY item_id UPDATE stock_quantity and do the math.







