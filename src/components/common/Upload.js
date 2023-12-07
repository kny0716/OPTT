import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
import { loginState } from "../../atoms";
import { useRecoilState } from "recoil";

export default function Upload(props) {
  const inputRef = useRef(null);
  const user_image = props.img;
  const username = props.username;
  const [login, setLogin] = useRecoilState(loginState);

  const postUserImage = async (username, formData) => {
    // let jsonData = JSON.stringify({ username: username });
    // formData.append("jsonData", jsonData);
    // console.log(formData);
    const res = await instance.post(`/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        charset: "utf-8",
        "Custom-Headers": username,
      },
    });
    if (res.data) {
      alert(res.data.msg);
      return res;
    } else {
      alert(res.data.msg);
    }
  };

  const handlePost = (e) => {
    const file = e.target.files[0];
    const correctForm = /(.*?)\.(jpg)$/; // |gif|png|jpeg|bmp|tif|heic| 삭제
    if (file.size > 1024 * 1024 * 10) {
      alert("10MB 이상의 이미지는 업로드 할 수 없습니다.");
      return;
    }
    if (!file.name.match(correctForm)) {
      alert("이미지 파일만 업로드가 가능합니다. (*.jpg)"); //, *.gif, *.png, *.jpeg, *.bmp, *.tif, *.heic 삭제
    } else {
      const formData = new FormData();
      formData.append("file", file);
      const serverPath = instance.defaults.baseURL + "uploads/";
      const promise = postUserImage(username, formData);
      console.log(promise);
      const getData = () => {
        promise.then((res) => {
          if (res.data.url === null) {
            setLogin({ ...login, profile: user_image });
            console.log(login);
          } else {
            console.log(`${serverPath}${res.data.url}`);
            setLogin({ ...login, profile: `${serverPath}${res.data.url}` });
          }
        });
      };
      getData();
    }

    try {
    } catch (e) {
      console.log("localStorage is not working");
    }
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <img className="profile__img" src={user_image} alt="profile_img" />
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
