import React from "react";
import ReactDOM from "react-dom";
import { initializeChannelStore } from "./stores/channels";
import { initializeMessageStore } from "./stores/messages";
import { initializeUserStore } from "./stores/users";
import { localStorageKeys } from "./constants";
import { logIn } from "./actions";
import Main from "./views/Main";

import "./index.module.scss";

initializeChannelStore();
initializeMessageStore();
initializeUserStore();

const storedUserId = window.localStorage.getItem(localStorageKeys.USER_ID);
if (storedUserId != null && storedUserId !== "") {
  logIn(storedUserId);
}

ReactDOM.render(<Main />, document.getElementById("root"));
