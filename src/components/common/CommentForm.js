export default function CommentForm({ props }) {
  return (
    <div className="comment__form">
      {/* input으로 할까 아님 textarea로 할까 */}
      <textarea
        className="comment__input"
        placeholder="댓글을 입력하세요"
        value={props.newcomment}
        onChange={props.commentChange}
      ></textarea>
      <button className="comment__btn" onClick={props.handleSubmit}>
        등록
      </button>
      {props.comments.length !== 0 && (
        <div className="comments__list">
          <ul className="comments">
            {props.comments.map((comment, index) => (
              <li id={index}>
                {comment}
                <button onClick={props.onClick.updateComment}>수정</button>
                <button onClick={props.onClick.deleteComment}>삭제</button>
                <button onClick={props.onClick.postLike}>좋아요</button>
                <button onClick={props.onClick.deleteLike}>좋아요 삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
