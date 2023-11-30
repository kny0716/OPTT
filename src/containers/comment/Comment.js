// import CommentForm from "../../components/auth/CommentForm";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "../../atoms";
import instance from "../../lib/axios";

export default function Comment({
  comment: { id, username, content },
  isEditing,
  setSelectedIndex,
  editComment,
}) {
  const [editValue, setEditValue] = useState(content);
  const handleEditInput = () => {
    editComment(id, editValue);
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
      setSelectedIndex(id);
    }
  };

  return (
    <li id={id}>
      <span className="comment__form">
        <span>{username}</span>
        {isEditing ? editInput : <span>{content}</span>}
        <button className="edit__btn" onClick={handleEditButtonClick}>
          수정
        </button>
      </span>
    </li>
  );
}

// export default function Comment() {
//   const [login, setLogin] = useRecoilState(loginState);
//   const [comment, setComment] = useState("");
//   const [comment_id, setComment_id] = useState(""); // 임시
//   const [mycomment, setMycomment] = useState([]); // 임시
//   const [comments, setComments] = useState([]); // 임시

//   const commentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     submitComment(comment);
//     setComment("");
//   };

//   async function submitComment(comment) {
//     await instance.post("/comment/create", {
//       username: login.username,
//       comment: comment,
//     });
//   }

//   // post로 수정?
//   async function getComments() {
//     try {
//       const response = await instance.post("/comments");
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function getCommentsData() {
//     const commentsdata = getComments();
//     const getData = () => {
//       commentsdata.then((res) => {
//         setComments(res.data.comments);
//       });
//     };
//     getData();
//   }

//   async function deleteComment() {
//     await instance.delete("/comment/delete", {
//       username: login.username,
//       comment: comment,
//     });
//   }

//   function updateComment() {
//     // 수정 버튼을 클릭한 댓글의 id나 내용을 가져와 setComment해야함
//     setComment(comment);
//     submitNewComment(comment);
//   }
//   async function submitNewComment(comment) {
//     // 응답으로 boolean이 오는데 사용해야하나?
//     await instance.post("/comment/update", {
//       username: login.username,
//       comment_id: comment_id,
//       comment: comment,
//     });
//     // try {
//     //   const response = await instance.post("/comment/update", {
//     //     username: login.username,
//     //     comment_id: comment_id,
//     //     comment: comment,
//     //   });
//     // } catch (error) {
//     //   console.error(error);
//     // }
//   }

//   async function postLike() {
//     try {
//       const response = await instance.post("/like", {
//         username: login.username,
//         comment_id: comment_id,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function deleteLike() {
//     try {
//       const response = await instance.delete("/unlike", {
//         username: login.username,
//         comment_id: comment_id,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getCommentsData();
//   }, []); // 여기에 comments 넣어도 되나?
//   return (
//     <CommentForm
//       commentChange={commentChange}
//       handleSubmit={handleSubmit}
//       newcomment={comment}
//       comments={comments}
//       mycomment={comment_id}
//       onClick={{ deleteComment, updateComment, postLike, deleteLike }}
//     />
//   );
// }
