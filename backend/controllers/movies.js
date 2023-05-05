const util = require("util");
const db = require("../dbconfig");
const query = util.promisify(db.query).bind(db);

exports.getMovies = async (req, res) => {
  try {
    let { offset, search } = req.query;
    let sqlQuery = `select * from movies`;
    search = search.replace("%20", " ");
    if (search !== "")
      sqlQuery = `select * from movies where title like '%${search}%'`;
    const movies = await query(sqlQuery);
    res.json({
      data: movies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getWatchedMovies = async (req, res) => {
  try {
    const userid = req.user;
    let { search } = req.query;
    let sqlQuery = `select ratings.rating as user_rating,title,poster,table1.rating,release_date,table1.user_id,table1.movie_id from (select user_id,movie_id,poster,rating,release_date,title from movies left join watched on watched.movie_id=movies.id where watched.user_id=${userid}) as table1 left join ratings on ratings.movie_id=table1.movie_id and ratings.user_id=table1.user_id`;
    search = search.replace("%20", " ");
    if (search !== "")
      sqlQuery = `select ratings.rating as user_rating,title,poster,table1.rating,release_date,table1.user_id,table1.movie_id from (select * from (select user_id,movie_id,poster,rating,release_date,title from movies left join watched on watched.movie_id=movies.id where watched.user_id=${userid}) as alt_table where title like '%${search}%') as table1 left join ratings on ratings.movie_id=table1.movie_id and ratings.user_id=table1.user_id`;
    const movies = await query(sqlQuery);
    res.json({
      data: movies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
