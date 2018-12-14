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
    
    // getItem function is fired
    getItems() 

});


// This gets all the items and displays it in a table
function getItems() {
    
    //Selects all from the table named products
    connection.query("SELECT * FROM products", 
        function (err, results) {
            if (err) throw err;
            
            //logs formatted table
            console.table(results); 
            
            // fires promptUser function
            promptId(results); 

        });
}



/* Asks for the id of the item id of the product desired using inquirer.
Results come from the getItems function*/
function promptId(results) {
    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What's the ID of the product you want?",
            
            /* Validates that the input is actually a number */
            validate: function (value) {
                answerId = value
                if (answerId > 0) {
                    return true;
                }
                else {
                    return "This is not a number. Try again";
                }
            }
        }).then(function (answers) {
            
            // Reassigning answerID (the id chosen) to the answers (answer {item_id: "3"})
            answerId = answers.item_id;
            
            // If less than the result's index and greater than 0, console.log the id
            if (answerId < (results.length + 1) && answerId > 0) { 
                console.log("You've chosen product ID: " + chalk.bold.yellow(answerId));
                console.log("--------------------------------------")
                
                // 
                promptQuantity();
            }
            else {
                console.log("Not a valid id. Try again");
                promptId(results);
                
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
                    // console.log("This is pass " + quantPass)
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
                    // console.log("Quantity in stock: " + results[0].stock_quantity)
                    // console.log("Quantity chosen: " + quantPass)
                    var quantInStock = results[0].stock_quantity
                    if (err) {
                        throw err;
                    }

                    else if (!err && quantPass <= quantInStock) {
                          // Get total cost
                        // Get price of product
                        let price = results[0].price
                        // Multiply by quantPass
                        let totalCost = quantPass * price;
                        // console.log("--------------------------------------");
                        console.log("You want " + chalk.bold.yellow(quantPass) + " of item " + chalk.bold.yellow(answerId));
                        console.log(chalk.bold.green("Your order has been placed."));
                        console.log(chalk.bold.green("Your total cost is: " + "$" + totalCost));
                        console.log("--------------------------------------");
                        updateTable(answerId)
                        
                      
                        // TODO Move this
                        // connection.end();

                    }

                    else if (!err && quantPass > quantInStock) {
                        console.log(chalk.bold.red("Not enough in stock. Choose a lower number."));
                        console.log("--------------------------------------");
                        promptQuantity()
                    };

                    
                });


        });

}

// Make function to connect database, then SELECT BY item_id UPDATE stock_quantity and do the math.

function updateTable(answerId) {
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantPass, answerId], function (err, res) {
        if (err) throw err;
        
        getItems()
    })
};






