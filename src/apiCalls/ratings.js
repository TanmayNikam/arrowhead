import axios from "axios";
import cookie from "js-cookie";

export const updateUserRatings = async (movieid, rating) => {
  try {
    const response = await axios.patch(
      "/api/ratings",
      { movieid, rating },
      { headers: { Authorization: `Bearer ${cookie.get("token")}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
