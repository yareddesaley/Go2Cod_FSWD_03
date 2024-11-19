import React, { useContext } from "react";
import { userContext } from "../context/AuthContext";
import Home from "./Home";

const Login = () => {
  const {
    loginInfo,
    setLoginInfo,
    loginUser,
    loginError,
    loginLoading,
    setLoginLoading,
    user,
    setUser,
  } = useContext(userContext);
  return (
    <div className="flex justify-center my-[3%] ">
      <div className="flex flex-col gap-5 bg-gray-400  w-[30%] rounded-2xl px-[4%] py-[1%]">
        <div className="font-bold text-red-500 text-2xl mx-auto">login</div>
        <div className="flex  flex-col">
          <label htmlFor="email" className="font-bold text-xl mr-2">
            Email
          </label>
          <input
            type="email"
            id="name"
            placeholder="email"
            className="p-3 outline-none rounded-xl  mt-3 "
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
        </div>
        <div className="flex  flex-col">
          <label htmlFor="password" className="font-bold text-xl mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="p-3 outline-none rounded-xl mt-3  "
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </div>
        <button
          className="bg-green-400 px-4 py-2 rounded-2xl text-white text-xl font-bold"
          onClick={loginUser}
        >
          {loginLoading ? loginLoading : "LogIn"}
        </button>
        {loginError && (
          <div className="bg-white h-20 text-red-500  text-lg flex justify-center rounded-xl outline outline-red-500">
            {loginError}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <p>You don't have an Account?</p>
          <button className="bg-green-400 px-4 py-2 rounded-2xl text-white text-xl font-bold">
            Sign Up here{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
