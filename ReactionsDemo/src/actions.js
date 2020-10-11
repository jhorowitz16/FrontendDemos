import axios from "axios";
import { userStoreApi } from "./stores/users";
import { localStorageKeys } from "./constants";

axios.defaults.withCredentials = true;

const getRoute = suffix => `http://localhost:8000${suffix}`;

export const createChannel = async channelName => {
  await axios.post(getRoute("/channels"), { channelName });
};

export const createMessage = async (channelId, content) => {
  await axios.post(getRoute(`/channels/${channelId}/messages`), { content });
};

export const createUser = async username => {
  await axios.post(getRoute("/users"), { username });
};

export const logIn = async id => {
  await axios.post(getRoute("/login"), { id });
  userStoreApi.setState({ activeUserId: id });
  window.localStorage.setItem(localStorageKeys.USER_ID, id);
};

export const logOut = async () => {
  await axios.post(getRoute("/logout"));
  userStoreApi.setState({ activeUserId: null });
  window.localStorage.setItem(localStorageKeys.USER_ID, "");
};

export const editMessage = async ({ messageId, channelId, content, reactions }) => {
  await axios.patch(getRoute(`/channels/${channelId}/messages/${messageId}`), {
    content,
    reactions
  });
};
