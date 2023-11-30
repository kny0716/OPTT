import { useEffect, useState } from "react";
import Comment from "./Comment";
export default function CommentList({ commentsList, editComment }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const [commentList, setCommentList] = useState(commentListState);
  return (
    <ul className="comment__list">
      {commentsList.map((comment) => {
        const comment_id = comment.id;
        return (
          <Comment
            key={comment_id}
            comment={comment}
            isEditing={selectedIndex === comment_id ? true : false}
            setSelectedIndex={setSelectedIndex}
            editComment={editComment}
          ></Comment>
        );
      })}
    </ul>
  );
}
