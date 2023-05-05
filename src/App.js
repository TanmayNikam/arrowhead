import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/Home";
import Login from "./screens/login";
import Register from "./screens/register";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            exact
          />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
