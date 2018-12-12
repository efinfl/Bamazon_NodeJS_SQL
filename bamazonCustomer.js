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

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connect as id: " + connection.threadId);
    getItems()
    
});

function getItems() {
    connection.query("SELECT * FROM products", 
    function (err, results) {
      if (err) throw err;
    //   console.log(results);
    });
    
    
}


inquirer
.prompt([{
    name: "item",
    type: "input",
    message: "What's the ID of the product you want?",
    validate: function (value) {
        return !isNaN(value);
    }.then(function(value) {
        // check if item id matches 
    })





}]);
connection.end()