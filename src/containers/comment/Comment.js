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
  const handleEditInput = () => {
    editComment(comment_id, editValue);
    setSelectedIndex(0);
  };

  const editInput = (
    <input
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={(e) => (e.key === "Enter" ? handleEditInput() : null)}
    />
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
    postLike(username, comment_id, likes);
    console.log(likes);
  };

  const handleUnlikeButtonClick = () => {
    deleteLike(username, comment_id, likes);
  };

  return (
    <li id={comment_id}>
      <span className="comment__form">
        <span>{username}</span>
        {isEditing ? editInput : <span>{comment}</span>}
        {login.username === username && (
          <div>
            <button className="edit__btn" onClick={handleEditButtonClick}>
              수정
            </button>
            <button className="delete__btn" onClick={handleDeleteButtonClick}>
              삭제
            </button>
          </div>
        )}
        <button className="like__btn" onClick={handleLikeButtonClick}>
          좋아요
        </button>
        <button className="unlike__btn" onClick={handleUnlikeButtonClick}>
          좋아요 취소
        </button>
        <div> 좋아요 수 {likes}</div>
      </span>
    </li>
  );
}

