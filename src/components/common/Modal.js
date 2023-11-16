import Button from "./Button";
export default function Modal({ close }) {
  return (
    <div className="wrapper">
      <div className="overlay" onClick={close}></div>
      <div className="modal__form">
        <div className="profile">
          {/* <img src="/img/profile.svg"></img> */}
          <div
            className="profile__img"
            style={{
              backgroundImage: `url("/img/profile.svg")`,
            }}
          ></div>
          <p>account</p>
        </div>
        <div className="contents">
          <Button to="/result" className="contents__btn">
            나의 테스트 결과
          </Button>
          <div className="contents__line"></div>
          <p className="contents__logout">로그아웃</p>
        </div>
      </div>
    </div>
  );
}
