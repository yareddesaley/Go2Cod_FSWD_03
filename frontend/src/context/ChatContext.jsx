import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseuri, getRequest, postRequest } from "../util/service";
import { io } from "socket.io-client";
export const chatContext = createContext();
const ChatContext = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [usersForChat, setUsersForChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [getMessage, setGetMessage] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log("online-users", onlineUsers);

  //my socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  //add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?.user?._id);
    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;
    const secondUserId =
      currentChat && currentChat?.members?.find((id) => user?.user?._id !== id);
    socket.emit("sendMessage", { ...newMessage, secondUserId });
  }, [newMessage]);
  //receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setGetMessage((prev) => [...prev, res]);
    });
  }, [socket, currentChat]);
  //get chat users
  useEffect(() => {
    const getUserChats = async () => {
      if (user?.user?._id) {
        try {
          const response = await getRequest(`${baseuri}/chat${user.user._id}`);
          setUserChats(response);
        } catch (error) {
          console.error("Failed to fetch user chats:", error);
        }
      }
    };
    getUserChats();
  }, [user]);
  //get user message
  useEffect(() => {
    const userMessage = async () => {
      const response = await getRequest(
        `${baseuri}/getmessage${currentChat?._id}`
      );
      setGetMessage(response);
    };
    userMessage();
  }, [currentChat]);
  //get all users available for chat
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseuri}/allusers`);
      const availableChats = response.filter((item) => {
        let chatExists = false;
        if (item._id === user?.user?._id) return false;
        if (userChats) {
          chatExists = userChats?.some((chat) => {
            return chat.members[0] === item._id || chat.members[1] === item._id;
          });
        }
        return !chatExists;
      });
      setUsersForChat(availableChats);
    };
    getUsers();
  }, [userChats]);
  //create chat
  const createChat = useCallback(async (userOneId, userTwoId) => {
    const response = await postRequest(
      `${baseuri}/createchat`,
      JSON.stringify({ userOneId, userTwoId })
    );
    setUserChats((prev) => [...prev, response]);
  }, []);
  //create message
  const createMessage = useCallback(
    async (textMessage, senderId, currentChatId, setTextMessage) => {
      if (!textMessage) return;
      const response = await postRequest(
        `${baseuri}/createmessage`,
        JSON.stringify({
          message: textMessage,
          chatId: currentChatId,
          senderId: senderId,
        })
      );
      setNewMessage(response);
      setGetMessage((prev) => [...prev, response]);
      setTextMessage("");
    }
  );

  return (
    <chatContext.Provider
      value={{
        userChats,
        usersForChat,
        createChat,
        getMessage,
        currentChat,
        setCurrentChat,
        createMessage,
        onlineUsers,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatContext;
