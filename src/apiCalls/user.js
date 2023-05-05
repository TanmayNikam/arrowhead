import axios from "axios";

export const login = async (user) => {
  try {
    const response = await axios.post("/api/users/login", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (user) => {
  try {
    const response = await axios.post("/api/users/signup", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
