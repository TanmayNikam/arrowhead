const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const mysql = require("mysql2");

const db = require("./dbconfig");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const watchListRoutes = require("./routes/watchlist");
const ratingsRoutes = require("./routes/ratings");
const { addToNotionDatabase } = require("./controllers/notion");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/watched", watchListRoutes);
app.use("/api/ratings",ratingsRoutes)

app.listen(5000, () => {
  console.log("Server started listening on port 5000");
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Tanmay@2002",
//   database: "movie_db",
// });

// db.connect(async (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("DB connected");

//   }
// });
// for (let i = 0; i < 10000; i++) {
//   let selectQuery = `select id from users where username="tanmay${i}"`;
//   let randomMoviesQuery = `select distinct id from movies order by rand() limit 5`;
//   db.query(selectQuery, (error, rows) => {
//     if (error) console.log(error);
//     else {
//       let userid = rows[0].id;
//       console.log(userid);
//       db.query(randomMoviesQuery, (err, rs) => {
//         if (err) console.log(err);
//         else {
//           rs.forEach((mid) => {
//             let insertQuery = `INSERT INTO watched (user_id,movie_id,watched) VALUES ("${userid}","${mid.id}",1)`;
//             db.query(insertQuery, (er, res) => {
//               if (er) console.log(er);
//             });
//             const rating = randomInRange(1, 5);
//             insertQuery = `INSERT INTO ratings (user_id,movie_id,rating) VALUES ("${userid}","${mid.id}",${rating})`;
//             db.query(insertQuery, (er, res) => {
//               if (er) console.log(er);
//               addToNotionDatabase(userid, mid.id, rating);
//             });
//           });
//         }
//       });
//     }
//   });
// }

// for (let i = 0; i < 1; i++) {
//   console.log(i);
//   let selectQuery = `select id from users where username="tanmay${i}"`;
//   let randomMoviesQuery = `select distinct id from movies order by rand() limit 5`;
//   db.query(selectQuery, (error, rows) => {
//     if (error) console.log(error);
//     else {
//       let userid = rows[0].id;
//       db.query(randomMoviesQuery, (err, rs) => {
//         if (err) console.log(err);
//         else {
//           rs.forEach((mid) => {
//             let insertQuery = `INSERT INTO watched (user_id,movie_id,watched) VALUES ("${userid}","${mid.id}",1)`;
//             db.query(insertQuery, (er, res) => {
//               if (er) console.log(er);
//               console.log(res);
//             });
//           });
//         }
//       });
//     }
//   });
// }

// for (let i = 1; i <= 500; i++) {
//   console.log(i);
//   const res = await axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=13c6f2af580d0c2e5001096be2ab8a6a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_watch_monetization_types=flatrate`
//   );
//   // const username = `tanmay${i}`;
//   // const password = await bcrypt.hash(username, 12);
//   res.data.results.forEach(item=>{
//     let insertQuery = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)";
//     let query = mysql.format(insertQuery, [
//       "movies",
//       "title",
//       "overview",
//       "rating",
//       "id",
//       "poster",
//       item.title,
//       item.overview,
//       item.vote_average,
//       item.id,
//       item.poster_path
//     ]);
//     db.query(query, (error, response) => {
//       if (error) {
//         console.log(error);
//         return error;
//       }
//     });
//   })
// }

// function randomInRange(min, max) {
//   return Math.random() < 0.5
//     ? (1 - Math.random()) * (max - min) + min
//     : Math.random() * (max - min) + min;
// }
