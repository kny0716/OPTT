import { useEffect, useState } from "react";
import Comment from "./Comment";
export default function CommentList({
  commentList,
  editComment,
  deleteComment,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ul className="comment__list">
      {commentList &&
        commentList.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              isEditing={selectedIndex === comment.comment_id ? true : false}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              editComment={editComment}
              deleteComment={deleteComment}
            ></Comment>
          );
        })}
    </ul>
  );
}
