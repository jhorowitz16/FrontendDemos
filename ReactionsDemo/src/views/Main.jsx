import React from "react";
import Authorization from "./Authorization";
import Chat from "./Chat";
import { useUserStore } from "../stores/users";

const Main = () => {
  const activeUserId = useUserStore(state => state.activeUserId);
  const users = useUserStore(state => state.users);
  const isValidActiveId = React.useMemo(
    () => users.some(user => user.id === activeUserId),
    [users, activeUserId]
  );

  if (activeUserId == null || !isValidActiveId) {
    return <Authorization />;
  }

  return <Chat />;
};

export default Main;
