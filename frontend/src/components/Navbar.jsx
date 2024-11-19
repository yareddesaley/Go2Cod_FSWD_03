import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(userContext);
  return (
    <div className="flex justify-evenly  gap-20 p-[1%] bg-gray-200">
      <Link to={"/"}>
        <div>Chat with me</div>
      </Link>
      {user && (
        <div>
          Name{" "}
          <span
            className="
      font-semibold"
          >
            {user?.user?.name}
          </span>
        </div>
      )}
      <div className="flex gap-24">
        {!user && (
          <Link to={"/login"}>
            <div>Login</div>
          </Link>
        )}
        {!user && (
          <Link to={"/register"}>
            <div>Register</div>
          </Link>
        )}
        {user && (
          <Link to={"/login"}>
            <div onClick={logoutUser}>Log out </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
