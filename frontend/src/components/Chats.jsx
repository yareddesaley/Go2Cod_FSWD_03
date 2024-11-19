import React, { useContext } from "react";
import { useOtherUser } from "../hooks/useOtherUser";
import { chatContext } from "../context/ChatContext";

const Chats = ({ chat, user }) => {
  const { secondUser } = useOtherUser(chat, user);
  const { onlineUsers } = useContext(chatContext);
  return (
    <div className="bg-gray-100 py-2 px-5 w-full text-gray-700 flex gap-3 justify-center items-center">
      <div className="w-10 h-10 rounded-full bg-white"></div>
      <div className="w-full cursor-pointer">
        <div className=" font-bold flex justify-between mb-2">
          <div className="flex gap-3 justify-center items-center">
            <div>{secondUser?.name}</div>
            <div
              className={
                onlineUsers?.some((user) => user?.userId === secondUser?._id)
                  ? "h-2 w-2 rounded-full bg-green-500"
                  : "h-2 w-2 rounded-full bg-gray-500"
              }
            ></div>
          </div>
          <div className="font-semibold text-sm">12/12/2000</div>
        </div>
        <span className="ml-2 text-sm flex justify-between">
          <span>Text Message</span>
          <span className="w-5 h-5 rounded-full bg-green-600 font-semibold text-white flex items-center justify-center">
            1
          </span>
        </span>
        <hr className="border-t-gray-700 w-full mt-2" />
      </div>
    </div>
  );
};

export default Chats;
