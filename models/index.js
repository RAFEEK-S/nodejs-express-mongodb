const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery",true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Hospitals = require("./Hospital.model.js")(mongoose);

module.exports = db;