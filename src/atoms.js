import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: { username: "", password: "", token: 0 },
});

export const registerState = atom({
  key: "registerState",
  default: { username: "", password: "", passwordConfirm: "" },
});
