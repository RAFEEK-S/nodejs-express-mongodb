const { Hospitals } = require("../models");
const db = require("../models");
const hospital = db.Hospitals;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.doctorname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const Hospital= new hospital({
    doctorname: req.body.doctorname,
    department: req.body.department,
    specialisation: req.body.specialisation,
    experience:req.body.experience,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  Hospital
    .save(Hospital)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hospital."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const doctorname = req.query.doctorname;
  var condition = doctorname ? { doctorname: { $regex: new RegExp(doctorname), $options: "i" } } : {};

  hospital.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Hospitals."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  hospital.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found hospital with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving hospital with id=" + id });
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  hospital.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update hospital with id=${id}. Maybe hospital was not found!`
        });
      } else res.send({ message: "hospital was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating hospital with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  hospital.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete hospital with id=${id}. Maybe hospital was not found!`
        });
      } else {
        res.send({
          message: "hospital was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete hospital with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  hospital.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} hospitals were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Hospitals."
    });
  });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  hospital.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};