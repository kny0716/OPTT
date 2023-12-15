import WrapComments from "../../containers/comment/WrapComment";

export default function ResultForm({
  result,
  result_img_url,
  onClickRestart,
  onClickShare,
}) {
  return (
    <div className="result__form">
      <h1>{result}</h1>
      <img className="result__img" src={result_img_url}></img>
      <div className="result__explain__form">
        <h2> 소제목</h2>
      </div>
      <div className="result__share__form">
        <p>친구에게 공유하기</p>
        <img src="img/result/share_button.svg" onClick={onClickShare}></img>
      </div>
      <img
        className="restart__btn"
        src="img/result/restart_button.svg"
        onClick={onClickRestart}
      ></img>
      <WrapComments />
    </div>
  );
}