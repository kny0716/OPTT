import Button from "./Button";
import Upload from "./Upload";
export default function ModalForm({ close, logout, profile }) {
  if (profile === "") {
    profile = "/img/profile.svg";
  }
  return (
    <div className="wrapper">
      <div className="overlay" onClick={close}></div>
      <div className="modal__form">
        <div className="profile">
          <Upload img={profile} username="account" />
        </div>
        <div className="contents">
          <Button to="/result" className="contents__btn">
            나의 테스트 결과
          </Button>
          <div className="contents__line"></div>
          <button className="contents__logout" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
