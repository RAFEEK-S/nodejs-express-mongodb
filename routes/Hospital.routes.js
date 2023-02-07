module.exports = app => {
    const Hospital = require("../controllers/Hospital.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Hospital.create);
  
    // Retrieve all Hospital
    router.get("/", Hospital.findAll);
  
    // Retrieve all published Hospital
    router.get("/published", Hospital.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Hospital.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Hospital.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Hospital.delete);
  
    // Delete all Hospital
    router.delete("/", Hospital.deleteAll);
  
    app.use('/api/Hospital', router);
  };