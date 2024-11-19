import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { userContext } from "./context/AuthContext";
import ChatContext from "./context/ChatContext";

const App = () => {
  const { user } = useContext(userContext);

  return (
    <ChatContext user={user}>
      <div>
        <Navbar />
        <Routes>
          {user && user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          {user && user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/register" element={<Register />} />
          )}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ChatContext>
  );
};

export default App;
