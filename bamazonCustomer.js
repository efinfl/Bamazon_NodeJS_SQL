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
            promptId(results); // fires promptUser funcion
            connection.end() // closes connection
        });
}
// Displays question and recieves answer
function promptId(results) {
    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What's the ID of the product you want?",
            validate: function (value) {
                var pass = value.match(/\d/); // validates that the answer is a number
                if (pass) {
                    return true;
                }
                else {
                    return "This is not a number. Try again";
                }
            }
        }).then(function (answers) {
            answerId = answers.item_id; // Takes answer and keeps it as variable
            if (answerId < results.length && answerId > 0) { // If less than the results index and greater than 0 console.log the id
                console.log(answerId);
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
                var pass = value.match(/\d/); // validates that the answer is a number
                if (pass) {
                    return true;
                }
                else {
                    return "This is not a number. Try again";
                }
            } 
        });

}







