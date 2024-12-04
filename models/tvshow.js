// schema for movies collection
const { Schema, model } = require("mongoose");

// setup the schema
const tvshowsSchema = new Schema({
  title:{ String,require:true},
  creator: {String, require:true},
  premiere_year: {Number, require:true},
  end_year: {Number, require:true},
  season: {Number, require:true},
  genre: {String, require:true},
  rating: {Number, require:true}
});

// convert the schema to a model
const Tvshow  = model("Tvshow" , tvshowsSchema);

module.exports  =Tvshow; 