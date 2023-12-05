import ResultForm from "../../components/result/ResultForm";
import { useRecoilState } from "recoil";
import instance from "../../lib/axios";
import { loginState } from "../../atoms";

export default function Result() {
  const [login, setLogin] = useRecoilState(loginState);
  const result_img_url = {
    넷플릭스: "/img/logo/netflix.svg",
    티빙: "/img/logo/tving.svg",
    쿠팡플레이: "/img/logo/coupangplay.svg",
    디즈니플러스: "/img/logo/disneyplus.svg",
    웨이브: "/img/logo/wavve.svg",
  };
  return (
    <div className="result">
      <ResultForm
        result={login.result}
        result_img_url={result_img_url[login.result]}
      />
    </div>
  );
}
