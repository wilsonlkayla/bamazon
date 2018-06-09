var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon2DB"
})

 connection.connect(function(err){
     if(err) throw(err);
     console.log("Made Connection");
     maketable();
 })

 var maketable = function(){
     connection.query("SELECT * FROM bamazon2DB.products", function(err,res){
         for(var i=0; i<res.length; i++){
             console.log(res[i].itemid+ "||" + res[i].productname+ "||" + res[i].departmentname+"||"+res[i].price+"||"+res[i].stockquantity+"\n");
         }
         promptCustomer(res);
     })
 }


 //Earlier code I created.....there's an error somewhere
//  var promptCustomer = function(res){
//   inquirer.prompt([{
//       type: 'input',
//       name: 'choice',
//       message: 'How can I help you?'
//   }]).then(function(answer){
//       var correct = false;
//       if(res[i].productname==answer.choice){
//           correct = true;
//           var products=answer.choice;
//           var id=i;
//           inquirer.prompt({
//               type: "input",
//               name: "quantity",
//               message: "How many?",
//           })

//           .then(function(answer) {
//             const query = "SELECT product_name, stock_quantity FROM products WHERE?";
//             connection.query(query, { product_name: answer.item }, function(err, res) {
//                 if (err) throw err;
//                 if (res[0].stock_quantity > answer.quantity) {
//                     console.log("Item is in stock!");
//                     currentQuantity = (res[0].stock_quantity) - (answer.quantity);
//                     selectedProduct = answer.item;
//                     const query = connection.query("UPDATE products SET ? WHERE?", [{
//                             stock_quantity: currentQuantity
//                         },
//                         {
//                             product_name: selectedProduct
//                         }
//                     ])
//                 } else {
//                     console.log("Sorry, there aren't enough items in stock");
//                 }
//                 promptOptions();
//             });
//         })
// }


// connection.connect(function(err) {
//     if (err) throw err;
//     displayItems();

function promptOptions() {
    inquirer.prompt({
            name: "task",
            type: "list",
            message: "How can we help you?",
            choices: [
                "Shop for Products",
                "Leave Store"
            ]
        })
        .then(function(answer) {
            switch (answer.task) {
                case "Shop for Products":
                    displayItems();
                    break;
                case "Leave Store":
                    console.log("Thank you for shopping with us");
                    connection.end();
                    break;
            }
        })
}

function promptPurchase() {
    inquirer.prompt([{
            name: "item",
            type: "list",
            message: "What would you like to purchase?",
            choices: [
                "Morphe Palette",
                "Black Pumps",
                "Insecure Vol. 2",
                "The Read T-Shirt",
                "Fenty Beauty Killawatt",
                "AHS Coven",
                "The Simpsons Season 11",
                "Wine O'Clock Wine Glass",
                "Chief Keef Documentary",
                "Lavendar Bed Spread"
            ]
        }, {
            name: "quantity",
            message: "How many would you like to purchase?"
        }])
        .then(function(answer) {
            const query = "SELECT product_name, stock_quantity FROM products WHERE?";
            connection.query(query, { product_name: answer.item }, function(err, res) {
                if (err) throw err;
                if (res[0].stock_quantity > answer.quantity) {
                    console.log("Item is in stock!");
                    currentQuantity = (res[0].stock_quantity) - (answer.quantity);
                    selectedProduct = answer.item;
                    const query = connection.query("UPDATE products SET ? WHERE?", [{
                            stock_quantity: currentQuantity
                        },
                        {
                            product_name: selectedProduct
                        }
                    ])
                } else {
                    console.log("Out of Stock");
                }
                promptOptions();
            });
        })
}

// ==================== III. MAIN PROCESS ====================


connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});
