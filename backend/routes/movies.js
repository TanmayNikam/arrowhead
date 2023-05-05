const router = require("express").Router();
const { getMovies, getWatchedMovies } = require("../controllers/movies");
const { isAuthenticated } = require("../controllers/users");

router.get("/", getMovies);
router.get("/watched", isAuthenticated, getWatchedMovies);

module.exports = router;
