// load the models
const Tvshow = require("../models/tvshow");

const getTvshows = async (genre, rating, premiere_year) => {
  let filter = {};
  // if genre exists, pass it to the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exist, pass it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // if director exist, pass into the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  // apply filter in .find()
  const tvshows = await Tvshow.find(filter);
  return tvshows;
};

// get one shows
const getTvshow = async (id) => {
  const tvshow = await Tvshow.findById(id);
  return tvshow;
};

// add new shows
const addNewTvshow = async (
  title,
  creator,
  premiere_year,
  end_year,
  season,
  genre,
  rating
) => {
  // create new movie
  const newTvshow = new Movie({
    title,
    creator,
    premiere_year, // short hand
    end_year,
    season,
    genre,
    rating,
  });
  // save the new movie into mongodb
  await newTvshow.save();
  return newTvshow;
};

// update shows
const updateTvshow = async (
  id,
  title,
  creator,
  premiere_year,
  end_year,
  season,
  genre,
  rating
) => {
  const updatedTvshow = await Tvshow.findByIdAndUpdate(
    id,
    {
      title,
      creator,
      premiere_year,
      end_year,
      season,
      genre,
      rating,
    },
    {
      new: true, // return back the updated data
    }
  );
  return updatedTvshow;
};

// delete shows
const deleteTvshow = async (id) => {
  return await Tvshow.findByIdAndDelete(id);
};

module.exports = {
  getTvshows,
  getTvshow,
  addNewTvshow,
  updateTvshow,
  deleteTvshow,
};
