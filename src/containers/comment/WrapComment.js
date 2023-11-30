import React, { useEffect, useState } from "react";
import { commentListState } from "../../atoms";
import CommentList from "./CommentList";
import { useRecoilState, useRecoilValue } from "recoil";
import instance from "../../lib/axios";
import { loginState } from "../../atoms";

export default function WrapComments() {
  const login = useRecoilValue(loginState);
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useRecoilState(commentListState);

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const addComment = () => {
    if (input !== "") {
      const lastCmtIndex = commentList.length > 0 ? commentList.length - 1 : 0;
      const addedCmtId =
        commentList.length > 0 ? commentList[lastCmtIndex].id + 1 : 1;
      const newComment = {
        id: addedCmtId,
        username: "bibigo",
        content: input,
      };
      setCommentList([...commentList, newComment]);
      submitNewComment(input);
      setInput("");
    }
  };

  async function getComments() {
    try {
      const response = await instance.post("/comments", {
        username: login.username,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getCommentsData = () => {
    const commentsdata = getComments();
    const getData = () => {
      commentsdata.then((res) => {
        setCommentList(res.data.comments);
      });
    };
    getData();
  };

  const editComment = (comment_id, edit_value) => {
    let newCommentList = commentList.map((comment) => {
      if (comment.id === comment_id) {
        return { ...comment, content: edit_value };
      }
      return comment;
    });
    setCommentList(newCommentList);
  };

  async function submitNewComment(comment) {
    const lastCmtIndex = commentList.length > 0 ? commentList.length - 1 : 0;
    const addedCmtId =
      commentList.length > 0 ? commentList[lastCmtIndex].id + 1 : 1;
    await instance.post("/comment/update", {
      username: login.username,
      comment_id: addedCmtId,
      comment: comment,
    });
  }

  useEffect(() => {
    getCommentsData();
  }, []);

  return (
    <>
      <div className="comment__wrap">
        <CommentList
          commentsList={commentList}
          editComment={editComment}
        ></CommentList>
      </div>
      <div className="box-inp-cmt">
        <input
          type="text"
          placeholder="댓글 달기..."
          value={input}
          onChange={inputChange}
          onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
        />
        <button className="btn-submit" disabled="" onClick={addComment}>
          게시
        </button>
      </div>
    </>
  );
}
