const express = require("express");
//create a router for tvshows
const router = express.Router();

// load the models
const { 
  getTvshows,
  getTvshow,
  addNewTvshow,
  updateTvshow,
  deleteTvshow,
} = require("../controller/tvshow");

// create the routes

// get all the tvshows. Pointing to /tvshows
router.get("/", async (req, res) => {
  try{
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;
  // use the gettvshows from the controller to laod the movies data
  const tvshows = await getTvshows(genre, rating, premiere_year);
  res.status(200).send(tvshows);
}catch (error) {
  res.status(400).send({
    error: error._message,
  });
}
});

// get one show by id
router.get("/:id", async (req, res) => {
  try{
  const id = req.params.id;
  const tvshows = await getTvshow.findById(id);
  res.status(200).send(tvshows);
  }catch(error){
    res.status(400).send({
      error: error._message,
    });
  }
});

// add shows
// POST http://localhost:5555/tvshows
router.post("/", async (req, res) => {
  try {
    // retrieve the data from req.body
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const season = req.body.season;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // check for error
    if (!title || !creator || !premiere_year ||!end_year || !season || !genre || !rating) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }
     // pass in all the data to addNewMovie function
     const newTvshow = await addNewTvshow(
      title,
      creator,
      premiere_year,
      end_year,
      season,
      genre,
      rating
    );
    res.status(200).send(newTvshow);
  } catch (error) {
    // if there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update shows
// PUT http://localhost:5555/tvshows/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try{
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const season = req.body.season;
    const genre = req.body.genre;
    const rating = req.body.rating;
    // pass in the data into the updateMovie function
    const updatedTvshow = await updateTvshow(
      title,
      creator,
      premiere_year,
      end_year,
      season,
      genre,
      rating
    );
    res.status(200).send(updatedTvshow);
  }catch (error) {
    restart.status(400).send({
      error: error_message,
    });
  }
});

// delete shows
// DELETE http://localhost:5555/tvshows/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try{
    const id = req.params.id;
     // trigger the deleteMovie function
     await deleteTvshow(id);
     res.status(200).send({
       message: `Movie with the provided id #${id} has been deleted`,
     });
   } catch (error) {
     res.status(400).send({
       error: error._message,
     });
   }
  });

module.exports = router;
