import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { FiLogOut } from "react-icons/fi";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.get("token")) {
    } else navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="bg-yellow-300 h-20 flex justify-between p-5">
        <div>
          <h1 className="text-3xl">Movie Review</h1>
        </div>
        <div
          className="cursor-pointer p-3 text-2xl rounded-md"
          onClick={() => {
            cookie.remove("token");
            navigate("/login");
          }}>
          <FiLogOut />
        </div>
      </div>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </div>
  );
};

export default PrivateRoute;
