var MySQL = require("MySQL");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = MySQL.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kbs120285",
  database: "bamazon"
})
// connect to the mysql server and sql database
connection.connect(function(err) {
  if(err) throw err;
  console.log("connection successful");
  makeTable();
})
var makeTable =function(){
  connection.query("SELECT * FROM products", function(err,res){
    for(var i=0; i<res.length; i++){
      console.log(res[i].itemid+" || "+res[i].productname+" || "+
      res[i].departmentname+" || "+res[i].price+" || "+res[i],
      stockquantity+"\n");
    }
    promptCustomer(res);
    })
  }

var promptCustomer = function(res){
  inquirer.prompt([{
    type:'input',
    name:'choice',
    message:"What would you like to buy? [Quit with Q]"
  }]).then(function(answer){
    var correct = false;
    if(answer.choice.toUpperCase()=="Q"){
      process.exit()
    }
    for(var i=0;i<res.length;i++){
      if(res[i].productname==answer.choice){
        correct=true;
        var product=answer.choice;
        var id=i;
        inquirer.prompt({
          type:"input",
          name:"quant",
          message:"How many would you like?",
          validate: function(value){
            if(isNaN(value)==false){
              return true;
            } else {
              return false;
            }
            }
          }).then(function(answer){
            if((res[id].stockquantity-answer.quant)>0){
              connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantity-
                answer.quant)+"' WHERE productname= '"+product
                +"'", function(err,res2){
                console.log("Purchase successful!");
                makeTable();
              })
            } else {
              console.log("something went wrong!");
              promptCustomer(res);

            }
              })
            }
          }
          if(i==res.length && correct==false){
            console.log("Not a valid choice");
            promptCustomer(res);
          }
        })
      }
            
            