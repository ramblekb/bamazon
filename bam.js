var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kbs120285",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected");
  start();
});
  function start() {
    connection.query("SELECT * FROM products", function(err, results){
      if (err) throw err;
    inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].productname);
              }
              return choiceArray;
            },
            message: "Which fruit would you like to buy?"
        },
        {
          name: "bid",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].productname === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (error) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stockquantity: answer.stockquantity
              },
              {
                itemid: chosenItem.itemid
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order success!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}