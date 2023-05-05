import axios from "axios";
import cookie from "js-cookie";

export const addToWatchlist = async (movieid) => {
  try {
    const response = await axios.post(
      "/api/watched",
      { movieid },
      { headers: { Authorization: `Bearer ${cookie.get("token")}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: error.message, success: false };
  }
};

export const removeFromWatchlist = async (movieid) => {
  try {
    const response = await axios.delete(`/api/watched?movieid=${movieid}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: error.message, success: false };
  }
};
