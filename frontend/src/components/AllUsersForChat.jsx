import React, { useContext } from "react";
import { chatContext } from "../context/ChatContext";
import { userContext } from "../context/AuthContext";

const AllUsersForChat = () => {
  const { user } = useContext(userContext);
  const { usersForChat, createChat, onlineUsers } = useContext(chatContext);
  return (
    <div>
      <h1 className="font-semibold flex mx-auto mb-5">
        Users You May Want To Chat With
      </h1>
      <div className="grid grid-cols-2 gap-5">
        {usersForChat &&
          usersForChat.map((item, index) => {
            return (
              <div
                key={index}
                className="font-bold flex gap-3 items-center justify-between bg-gray-300 px-3 py-1 cursor-pointer"
                onClick={() => createChat(user?.user?._id, item._id)}
              >
                <div>{item.name}</div>{" "}
                <div
                  className={
                    onlineUsers?.some((user) => user?.userId === item?._id)
                      ? "h-2 w-2 rounded-full bg-green-500"
                      : "h-2 w-2 rounded-full bg-gray-500"
                  }
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsersForChat;
