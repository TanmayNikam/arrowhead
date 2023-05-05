import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { addToWatchlist } from "../apiCalls/watchlist";
import { toast } from "react-hot-toast";

const IMAGE_URL = "http://image.tmdb.org/t/p/original//";
const MovieCard = ({
  movie,
  showRate,
  handleRemoveFromWatchList,
  handleSubmitRatings,
}) => {
  const [editRating, setEditRating] = useState(false);
  const [userRating, setUserRating] = useState(
    movie.user_rating ? movie?.user_rating : 1
  );


  const handleAddWatchlist = async () => {
    try {
      const response = await addToWatchlist(movie.id);
      if (response.success) toast.success(response.message);
      else toast.error(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Card
        style={{ width: "20rem" }}
        className="border border-black p-1 rounded-lg">
        <Card.Img variant="top" src={`${IMAGE_URL}${movie.poster}`} />
        <Card.Body className="text-center mt-2 mb-2">
          <Card.Title className="mt-1 font-bold text-xl">
            {movie.title}
          </Card.Title>
          <Card.Text className="mt-1">
            Year: {new Date(movie.release_date).getFullYear()}
          </Card.Text>
          {!showRate && (
            <Card.Text className="mt-1">
              Vote Average: <span className="font-bold">{movie.rating}</span>
            </Card.Text>
          )}
          {showRate && (
            <Card.Text className="mt-1">
              You Rating:{" "}
              {!editRating ? (
                <span className="font-bold">{userRating}</span>
              ) : (
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="5"
                  step="0.1"
                  value={userRating}
                  onChange={(e) => setUserRating(e.target.value)}
                  className="p-1 rounded-xl"
                />
              )}
            </Card.Text>
          )}
          {!showRate && (
            <button
              className="text-white bg-blue-500 rounded-lg p-2 mt-1"
              onClick={handleAddWatchlist}>
              Add to Watchlist
            </button>
          )}

          {showRate && (
            <div className="flex justify-between px-4 py-1">
              <button
                className="text-white bg-red-500 p-2 rounded-xl"
                onClick={() => {
                  handleRemoveFromWatchList(movie.movie_id);
                }}>
                Remove{" "}
              </button>
              {!editRating ? (
                <button
                  className="text-black bg-yellow-400 p-2 rounded-xl"
                  onClick={() => {
                    setEditRating(!editRating);
                  }}>
                  Rate
                </button>
              ) : (
                <button
                  className="text-white bg-blue-500 p-2 rounded-xl"
                  onClick={() => {
                    if (userRating !== movie?.user_rating) {
                      handleSubmitRatings(movie.movie_id, userRating);
                      setEditRating(false);
                      setUserRating(userRating);
                    }
                  }}>
                  Submit
                </button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieCard;
