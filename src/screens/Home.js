import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../apiCalls/movies";
import { toast } from "react-hot-toast";
import { removeFromWatchlist } from "../apiCalls/watchlist";
import { updateUserRatings } from "../apiCalls/ratings";
import Loader from "../components/Loader";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [movies, setMovies] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleSubmitRatings = async (movieid, rating) => {
    try {
      if (rating < 1 || rating > 5) {
        toast.error("Ratings should be between 1 and 5");
        return;
      }
      // setLoader(true);
      const response = await updateUserRatings(movieid, rating);
      if (response.success) {
        toast.success("Rating Updated Successfully");
        const newMovies = movies.map((movie) => {
          if (movie.movie_id === movieid)
            return { ...movie, user_rating: rating };
          return movie;
        });
        setMovies(newMovies);
      } else toast.error(response.message);
      // setLoader(false);
    } catch (error) {
      console.log(error);
      // setLoader(false);
      toast.error("Something went wrong");
    }
  };

  const getmovies = async (filterStatus = filter) => {
    try {
      setLoader(true);
      const moviesResponse = await getMovies(search, filter);
      setMovies(moviesResponse.data);
      setCurrPage(0);
      setLoader(false);
      setPages(parseInt(Math.ceil(moviesResponse.data.length / 12)));
    } catch (error) {
      console.log(error);
    }
  };
  const getMoviePage = (movies) => {
    const start = currPage * 12;
    const end = Math.min(start + 12, movies.length);

    return movies.slice(start, end);
  };
  const incrementPage = () => {
    setCurrPage((currPage + 1) % pages);
  };
  const decrementPage = () => {
    setCurrPage((currPage - 1 + pages) % pages);
  };

  const handleRemoveFromWatchList = async (movieid) => {
    try {
      setMovies(movies.filter((movie) => movie.movie_id !== movieid));
      const response = await removeFromWatchlist(movieid);
      if (response.success) toast.success(response.message);
      else toast.error(response.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    getmovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="pt-10 text-left p-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <input
                type="text"
                className="w-96 text-left p-3 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movie"
              />
              <button className="rounded-3xl bg-gray-500 p-3">
                <BsSearch onClick={getmovies} />
              </button>
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xl p-2 border border-black rounded-lg">
                <option value="All">All</option>
                <option value="Watched">Watched</option>
              </select>
            </div>
          </div>

          {movies.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10 p-5 pr-5 text-right">
              {getMoviePage(movies).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  showRate={filter === "Watched"}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  handleSubmitRatings={handleSubmitRatings}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full text-5xl text-gray-600 mt-48">
              {filter === "All" ? "No Movies" : "No Movies Added To WatchList"}
            </div>
          )}
          {pages > 1 && (
            <div className="flex gap-4 justify-end">
              <button
                onClick={decrementPage}
                className="border border-black p-1 rounded-md">
                <span className="text-xl">{"<"}</span> Prev
              </button>
              <button
                onClick={incrementPage}
                className="border border-black p-1 rounded-md">
                Next <span className="text-xl">{">"}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
