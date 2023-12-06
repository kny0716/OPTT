// import CommentForm from "../../components/auth/CommentForm";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "../../atoms";
import instance from "../../lib/axios";

export default function Comment({
  comment: { comment, comment_id, createdAt, likes, username },
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
    console.log(likes);
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
          <div className="comment__profile"></div>
          <div className="comment__title__contents">
            <p className="username">{username}</p>
            <p className="date">{createdAt}</p>
          </div>
          {login.username === username && (
            <div className="comments__change__contents">
              <button className="edit__btn" onClick={handleEditButtonClick}>
                수정
              </button>
              <button className="delete__btn" onClick={handleDeleteButtonClick}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="comment__contents__container">
          <div className="comment">{comment}</div>
          {isEditing && editInput}
        </div>
        <div className="comment__like__container">
          {isLiked ? (
            <img
              className="like__btn"
              src="/img/result/like_button.svg"
              onClick={handleUnlikeButtonClick}
            />
          ) : (
            <img
              className="like__btn"
              src="/img/result/like_button.svg"
              onClick={handleLikeButtonClick}
            />
          )}
          <p className="like"> 좋아요 수 {likes}</p>
        </div>
      </div>
    </li>
  );
}
