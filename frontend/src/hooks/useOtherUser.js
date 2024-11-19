import { useEffect, useState } from "react";
import { baseuri, getRequest } from "../util/service";

export const useOtherUser = (chat, user) => {
  const [secondUser, setSecondUser] = useState(null);
  const secondUserId =
    chat && chat?.members?.find((id) => user?.user?._id !== id);

  useEffect(() => {
    const getSecondUser = async () => {
      if (!secondUserId) return null;
      const response = await getRequest(`${baseuri}/getoneuser${secondUserId}`);
      setSecondUser(response);
    };
    getSecondUser();
  }, [secondUserId]);
  return { secondUser };
};
