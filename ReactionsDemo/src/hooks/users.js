import React from "react";
import { useUserStore } from "../stores/users";

export const useActiveUser = () => {
  const activeUserId = useUserStore(state => state.activeUserId);
  const users = useUserStore(state => state.users);
  return React.useMemo(() => users.find(user => user.id === activeUserId), [
    activeUserId,
    users
  ]);
};
