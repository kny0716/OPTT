import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage", // 고유한 key 값
  storage: sessionStorage,
});

export const loginState = atom({
  key: "loginState",
  default: {
    username: "",
    password: "",
    token: 0,
    profile: "",
    result: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const registerState = atom({
  key: "registerState",
  default: { username: "", password: "", passwordConfirm: "" },
});

export const commentListState = atom({
  key: "commentListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const guestState = atom({
  key: "guestState",
  default: { result: "" },
  effects_UNSTABLE: [persistAtom],
});
