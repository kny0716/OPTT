import Button from "./Button";
import Upload from "./Upload";
export default function ModalForm({
  close,
  logout,
  resultClick,
  profile,
  username,
}) {
  if (profile === null) {
    profile = "/img/profile.svg";
  }
  const image_path = "/img/modal_background.svg";
  return (
    <div className="wrapper">
      <div className="overlay" onClick={close}></div>
      <div
        className="modal__form"
        style={{ backgroundImage: `url('${image_path}')` }}
      >
        <div className="profile">
          <Upload img={profile} username={username} />
        </div>
        <div className="contents">
          <button onClick={resultClick} className="contents__btn">
            나의 테스트 결과
          </button>
          <div className="contents__line"></div>
          <button className="contents__btn" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
