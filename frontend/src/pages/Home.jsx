import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../context/ChatContext";
import Chats from "../components/Chats";
import { userContext } from "../context/AuthContext";
import AllUsersForChat from "../components/AllUsersForChat";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const { userChats, setCurrentChat } = useContext(chatContext);
  const { user } = useContext(userContext);

  return (
    <div className="flex  justify-center gap-10 p-10">
      <div className="w-[30%] h-auto">
        {userChats &&
          userChats.map((chat, index) => {
            return (
              <div key={index} onClick={() => setCurrentChat(chat)}>
                <Chats chat={chat} user={user} />
              </div>
            );
          })}
      </div>
      <div className="w-1/2 h-auto">
        <ChatBox />
      </div>
      <div className="w-1/4 h-auto bg-gray-100 p-5">
        <AllUsersForChat />
      </div>
    </div>
  );
};

export default Home;
