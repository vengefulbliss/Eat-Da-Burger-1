var connection = require("../config/connection.js");

connection.connect(function(err) {
  if(err) {
    console.log("Error", err.stack);
  }
  console.log("Connected as id: %s", connection.threadId)
});

var orm = {
  addBurger: function(burger, cb) {
    var burgerName = burger;
    var mySQLQuery = "INSERT INTO burgers (burger_name) VALUES ('" + burgerName + "')";
    connection.query(mySQLQuery, function(err, result) {
      if (err) throw err;
      //cb(result);
    });
  },
  eatBurger: function(id, cb) {
    var id = id;
    connection.query("UPDATE burgers SET devoured=1 WHERE id=?", [id], function(err, result) {                                                   
      if (err) throw err;
      //cb(result);
    }); 
  },
  showBurgers: function() {
  connection.query('SELECT * FROM burgers', function(err, result) {                                                   
      if (err) throw err; 
      console.log("The burger connection test :" + result[0].burger_name); 
      //cb(result);               
  });
 } 
};

//used to test the orm functions
orm.addBurger("cheese");
orm.eatBurger(29);
orm.showBurgers();
