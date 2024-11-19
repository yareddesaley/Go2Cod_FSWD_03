import React, { useContext, useState } from "react";
import { userContext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";
import { useOtherUser } from "../hooks/useOtherUser";
import moment from "moment";
import InputEmoji from "react-input-emoji";
const ChatBox = () => {
  const { user } = useContext(userContext);
  const { currentChat, getMessage, createMessage } = useContext(chatContext);
  const { secondUser } = useOtherUser(currentChat, user);
  const [inputMessage, setInputMesssage] = useState("");

  console.log("input-message", inputMessage);
  if (!secondUser) return <p>There is no conversation yet</p>;

  return (
    <div className="bg-gray-100">
      <div className=" max-h-96  overflow-y-scroll flex flex-col justify-between">
        <div>
          <div className="bg-gray-200 font-bold p-3 flex justify-center sticky top-0">
            {secondUser?.name}
          </div>
          <div>
            <div onClick={window.scrollTo(0, 100)}>
              {getMessage &&
                getMessage.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        item.senderId === user?.user?._id
                          ? "flex  flex-col items-end p-3 "
                          : "flex flex-col items-start  p-3 "
                      }
                    >
                      <div className="text-xl">{item.message}</div>
                      <span className="text-sm">
                        {moment(item.createdAt).calendar()}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-2">
        <InputEmoji
          borderColor="gray"
          value={inputMessage}
          onChange={setInputMesssage}
        />
        <button
          className=" bg-green-500 py-1 px-3 rounded-full text-white font-bold"
          onClick={() =>
            createMessage(
              inputMessage,
              user?.user?._id,
              currentChat?._id,
              setInputMesssage
            )
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
