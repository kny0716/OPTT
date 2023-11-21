import { atom } from "recoil";
export const loginState = atom({
  key: "loginState",
  default: { username: "", password: "" },
});

export const registerState = atom({
  key: "registerState",
  default: { username: "", password: "", passwordConfirm: "" },
});
