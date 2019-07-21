var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err){
    if (err) throw err;
    console.log('Connection successful');
    makeTable(); 
});

var makeTable = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        for(var i = 0; i < res.length; i++){
            console.log(res[i].itemid+"||"+res[i].productname+" ||"+res[i].departmentname+" ||"+res[i].price+" ||"+res[i].stockquantity+"\n");
        }
        promptCustomer(res);
    });
};

var promptCustomer = function(results){
    inquirer.prompt([
        {
        type: "input",
        name: "purchase_item",
        message: "please enter item id of desired purchase? ",
        validate: function(value){
            if (isNaN(parseInt(value))){
                return "Please enter the item id number ";
            } else {
                return true;
            }
        }

    }, 
    {
        type: "input",
        name: "quantity",
        message: "how many would you like to purchase",
        validate: function(value){
            if (isNaN(parseInt(value))){
                return "Please enter the numeric quantity you'd like to purchase";
            } else {
                return true;
            }
        }

    }
]).then(function(answer){
        //var correct = false;
        console.log(answer);
        console.log(results[1].itemid == parseInt(answer.purchase_item));
        console.log(results[1].stockquantity >= parseInt(answer.quantity))
        var choosenItem;
        console.log(results[1].itemid);
        for (var i=0 ; i < results.length; i++){
            //console.log("message " + res[i]);
            if ((results[i].itemid == parseInt(answer.purchase_item)) && (results[i].stock_quantity >= parseInt(answer.quantity))){
                console.log("results[i]: ",results[i]);
                results[i].stock_quantity - answer.quantity;
                console.log(results[i]);
                return console.log("requested amount is in stock! you can proceed to purchase");
            } 
        }
    }).then(function(answer){
        if((res[id].stock_quantity-answer.quant)>0){
            connection.query("UPDATE products SET stock_quantity")
        }
    });
};

// CHECKOUT ICECREAM CRUD TO UPDATE THE SQL DATABSE!!!


var promptCustomer = function(res) {
    inquirer.prompt([{
        type: "input", 
        name: 'choice',
        message: "what do you want to buy? (quit with Q)",
    }]).then(function(answer){
        var correct = false; 
        for (var i = 0; i<res.length;i ++){
            correct=true;
            var product=answer.choice;
            var id = i;
            inquirer.prompt({
                type: 'input',
                name: 'quant',
                message: 'what quantity would you like to purchase?',
                validate: function(value){
                    if(isNaN(value)==false){
                        return true;
                    }   else {
                        return false;
                    }
                }
            }).then(function(answer){
                if((res[id].stock_quantity.answer.quant)>0){
                    connection.query("UPDATE products SET stock_quantity= '"+(res[id].stock_quantity - answer.quant)+" '", function(err,res2){
                        console.log("thank you for your purchase!");
                    })
                }   else {
                    console.log("Not a valid selection");
                    promptCustomer(res);
                }
            });
        }
    });
};
