import React, { createContext, useEffect, useState } from "react";
import { baseuri, getRequest, postRequest } from "../util/service";
import { useNavigate } from "react-router-dom";
export const userContext = createContext();
const AuthContext = ({ children }) => {
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //register user
  const register = async () => {
    setRegisterLoading("Loading");
    const response = await postRequest(
      `${baseuri}/register`,
      JSON.stringify(registerUser)
    );
    if (response.error) {
      setRegisterError(response.message);
      setRegisterLoading(false);
      return;
    }
    localStorage.setItem("user", JSON.stringify(response));
    setRegisterLoading(false);
    setRegisterError(null);
    navigate("/");
    return setUser(response);
  };
  //
  useEffect(() => {
    let user = localStorage.getItem("user");
    setUser(user);
  }, []);

  //logout user
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  //log in user
  const loginUser = async () => {
    setLoginLoading("Loading");
    const response = await postRequest(
      `${baseuri}/login`,
      JSON.stringify(loginInfo)
    );
    if (response.error) {
      setLoginError(response.message);
      setLoginLoading(false);
      return;
    }
    localStorage.setItem("user", JSON.stringify(response));
    setLoginLoading(false);
    setLoginError(null);
    navigate("/");
    return setUser(response);
  };
  //get all users
  useEffect(() => {
    const allusers = async (req, res) => {
      const response = await getRequest(`${baseuri}/allusers`);

      setAllUsers(response);
    };
    allusers();
  }, []);

  return (
    <div>
      <userContext.Provider
        value={{
          registerUser,
          setRegisterUser,
          user,
          allUsers,
          loginError,
          registerError,
          register,
          registerLoading,
          loginLoading,
          setLoginLoading,
          logoutUser,
          loginInfo,
          setLoginInfo,
          loginUser,
        }}
      >
        {children}
      </userContext.Provider>
    </div>
  );
};

export default AuthContext;
