import axios from "axios";
import cookie from "js-cookie";

export const getMovies = async (search = "", filter) => {
  try {
    let uri = `/api/movies${
      filter === "All" ? "" : "/watched"
    }?search=${search}`;
    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// const getAllMovies = async (offset, search = "") => {
//   try {
//     let uri = `/api/movies?offset=${offset}`;
//     if (search !== "") uri = `/api/movies?offset=${offset}&search=`;
//     const movies = await axios.get(uri);
//     console.log(movies.data);
//     return movies.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getWatchedMovies = async (offset, search = "") => {
//   try {
//     let uri = `/api/movies?offset=${offset}`;
//     if (search !== "") uri = `/api/movies/watched?offset=${offset}&search=`;
//     const movies = await axios.get(uri);
//     console.log(movies.data);
//     return movies.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
