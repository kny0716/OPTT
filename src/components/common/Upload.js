import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
import { loginState } from "../../atoms";

export default function Upload(props) {
  const inputRef = useRef(null);
  const userImage = props.img;
  const username = props.username;

  const postUserImage = async (account, formData) => {
    try {
      const res = await instance.post(`/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
      });
      if (res.data) {
        alert(res.data.msg);
        return res;
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("전송 실패 : " + err);
    }
  };

  const handlePost = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // return instance
    //   .post("/profile", formData)
    //   .then((res) => {
    //     console.log(res);
    //     // setLogin({
    //     //   username: login.username,
    //     //   password: login.password,
    //     //   token: login.token,
    //     //   profile: e.tartget.files[0],
    //     //   result: login.result,
    //     // }); // post하고 나면 menu, modal이 바뀌어야하는데 이렇게 바꿔야하지 않나?
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    postUserImage(username, formData);
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <img className="profile__img" src={userImage} alt="profile_img" />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => handlePost(e)}
        name="file"
        key="file"
      />
      <img
        className="profile__edit"
        src="/img/profile_edit.svg"
        alt="edit"
        onClick={onUploadImageButtonClick}
      />
      <span>{username}</span>
    </>
  );
}
