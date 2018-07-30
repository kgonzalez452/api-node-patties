var pattyRouter = require('express').Router();


var patties = [
  {
    id: 1,
    name: 'Krabby Patty Deluxe',
    meal: true,
    pretty: false,
    price: 15
  },
{
    id: 2,
    name: 'Purple Pretty Patty',
    meal: true,
    pretty: true,
    price: 10
  }
];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) { // if the request.body.id does not exist 
    id++;                 // increment the id to add and replace the id with the given id
    req.body.id = id + ""; // using this we set the id to an empty string because it depend on the id number to which it will be updated to
  }

  next(); // calls the next middleware function
};

pattyRouter.param("id", (req, res, next, id) => {
  var patty = patties.find(patty => { // we find a patty first and return the patty to assign it an id
    return patty.id == req.params.id;
  });

  if (patty) {            // if the patty already exists
    req.patty = patty;    // set the request of the patty to the patty variable so we can get the id of that patty
    next();               // and then call the next middleware function
  } else {
    res.send();
  }
});

pattyRouter.get("/", (req, res) => {  // gets all the patties in json format
  // GET patties
  res.json(patties);
});

pattyRouter.get("/:id", (req, res) => { 
  // GET patty.id
  // var patty = patties.find(patty => {
  //   return patty.id == req.params.id;
  // });
  var patty = req.patty;
  res.json(patty || {});
});

pattyRouter.post("/", updateId, (req, res) => {
  // POST patty.id
  var patty = req.body;
  // id++;
  // patty.id = id + '';

  patties.push(patty);

  res.json(patty);
});

//helper function for patch
function findpattyIndex(id) {
  // findIndex stuff
  return pattyIndex;
}

pattyRouter.put("/:id", (req, res) => {
  // PUT/REPLACE patty.id
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var patty = patties.findIndex(patty => patty.id == req.params.id);
  if (!patties[patty]) {
    res.send();
  } else {
    var updatedpatty = Object.assign(patties[patty], update);
    //_.assign(patties[patty], update);
    res.json(updatedpatty);
  }
  console.log(patty);
});

pattyRouter.delete("/:id", (req, res) => {
  // DELETE patty.id
  var patty = patties.findIndex(patty => patty.id == req.params.id);
  if (!patties[patty]) {
    res.send();
  } else {
    var deletedpatty = patties[patty];
    patties.splice(patty, 1);
    res, json(deletedpatty);
  }
});

module.exports = pattyRouter;