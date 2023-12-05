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
    submitNewComment(input);
    setInput("");
  };

  async function getComments() {
    try {
      const response = await instance.post("/comments", {
        username: login.username,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const getCommentsData = () => {
    const commentsdata = getComments();
    const getData = () => {
      commentsdata.then((res) => {
        setCommentList(res.data.lists);
        console.log(res.data.lists);
      });
    };
    getData();
  };

  const editComment = (comment_id, edit_value) => {
    let newCommentList = commentList.map((comment) => {
      if (comment.comment_id === comment_id) {
        return { ...comment, comment: edit_value };
      }
      return comment;
    });
    changeComment(login.username, comment_id, edit_value);
    setCommentList(newCommentList);
    getCommentsData();
  };

  async function changeComment(username, comment_id, comment) {
    await instance.post("/comment/update", {
      username: username,
      comment_id: comment_id,
      comment: comment,
    });
  }

  async function submitNewComment(comment) {
    const lastCmtIndex = commentList.length > 0 ? commentList.length - 1 : 0;
    const addedCmtId =
      commentList.length > 0 ? commentList[lastCmtIndex].id + 1 : 1;
    await instance.post("/comment/create", {
      username: login.username,
      comment_id: addedCmtId,
      comment: comment,
    });
    getCommentsData();
  }

  async function deleteComment(comment_id) {
    await instance.post("/comment/delete", {
      comment_id: comment_id,
    });
    getCommentsData();
  }

  async function postLike(username, comment_id, likes) {
    const response = await instance.post("/like", {
      username: username,
      comment_id: comment_id,
      likes: likes,
    });
    console.log(response);
    getCommentsData();
  }

  async function deleteLike(username, comment_id, likes) {
    instance.delete("/unlike", {
      username: username,
      comment_id: comment_id,
      likes: likes,
    });
    getCommentsData();
  }

  useEffect(() => {
    getCommentsData();
  }, []);

  return (
    <>
      <div className="comment__wrap">
        <CommentList
          commentList={commentList}
          editComment={editComment}
          deleteComment={deleteComment}
          postLike={postLike}
          deleteLike={deleteLike}
        ></CommentList>
      </div>
      <div className="box-inp-cmt">
        {login.username !== "" && (
          <div className="comment__input">
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
        )}
      </div>
    </>
  );
}
