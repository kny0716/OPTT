import ResultForm from "../../components/result/ResultForm";
import { useRecoilState } from "recoil";
import { loginState, guestState } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { on } from "events";

export default function Result() {
  const [login, setLogin] = useRecoilState(loginState);
  const [guest, setGuest] = useRecoilState(guestState);
  const result_img_url = {
    넷플릭스: "/img/logo/netflix.svg",
    티빙: "/img/logo/tving.svg",
    쿠팡플레이: "/img/logo/coupangplay.svg",
    디즈니플러스: "/img/logo/disneyplus.svg",
    웨이브: "/img/logo/wavve.svg",
  };
  const navigate = useNavigate();

  const onClickRestart = () => {
    navigate("/");
  };
  return (
    <div className="result">
      {login.username !== "" && (
        <ResultForm
          result={login.result}
          result_img_url={result_img_url[login.result]}
          onClick={onClickRestart}
        />
      )}
      {login.username === "" && (
        <ResultForm
          result={guest.result}
          result_img_url={result_img_url[guest.result]}
          onClick={onClickRestart}
        />
      )}
    </div>
  );
}
