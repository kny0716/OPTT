import { useRecoilState } from "recoil";
import { useState } from "react";
import { loginState } from "../../atoms";
import instance from "../../lib/axios";

export default function Comment({
  comment: { comment, comment_id, createdAt, likes, username, profile },
  isEditing,
  setSelectedIndex,
  editComment,
  deleteComment,
  postLike,
  deleteLike,
}) {
  const [login] = useRecoilState(loginState);
  const [editValue, setEditValue] = useState(comment);
  const [isLiked, setIsLiked] = useState(false);
  const handleEditInput = () => {
    editComment(comment_id, editValue);
    setSelectedIndex(0);
  };
  const serverPath = instance.defaults.baseURL + "uploads/";
  const profile_URL = serverPath + profile;
  const date = createdAt.split("T")[0];
  const editInput = (
    <div className="comment__edit__input">
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleEditInput() : null)}
      />
      <button
        className="submit__edit__btn"
        disabled=""
        onClick={handleEditInput}
      >
        등록
      </button>
    </div>
  );

  const handleEditButtonClick = () => {
    if (isEditing) {
      handleEditInput();
    } else {
      setSelectedIndex(comment_id);
    }
  };

  const handleDeleteButtonClick = () => {
    deleteComment(comment_id);
  };

  const handleLikeButtonClick = () => {
    setIsLiked(true);
    postLike(username, comment_id, likes);
  };

  const handleUnlikeButtonClick = () => {
    setIsLiked(false);
    deleteLike(username, comment_id, likes);
  };

  return (
    <li id={comment_id}>
      <div className="comment__form">
        <div className="comment__line"></div>
        <div className="comment__title">
          <img className="comment__profile" src={profile_URL}></img>
          <div className="comment__title__contents">
            <p className="username">{username}</p>
            <p className="date">{date}</p>
          </div>
          {login.username === username && (
            <div className="comments__change__contents">
              <img
                className="edit__btn"
                src="/img/result/edit_button.svg"
                onClick={handleEditButtonClick}
              ></img>
              <img
                className="delete__btn"
                src="/img/result/delete_button.svg"
                onClick={handleDeleteButtonClick}
              ></img>
            </div>
          )}
        </div>
        <div className="comment__contents__container">
          {isEditing ? editInput : <div className="comment">{comment}</div>}
          {/* <div className="comment">{comment}</div>
          {isEditing && editInput} */}
        </div>
        <div className="comment__like__container">
          {isLiked ? (
            <img
              className="like__btn"
              src="/img/result/unlike_button.svg"
              onClick={handleUnlikeButtonClick}
            />
          ) : (
            <img
              className="like__btn"
              src="/img/result/like_button.svg"
              onClick={handleLikeButtonClick}
            />
          )}
          <p className="like">{likes}</p>
        </div>
      </div>
    </li>
  );
}
