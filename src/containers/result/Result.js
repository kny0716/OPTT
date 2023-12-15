import ResultForm from "../../components/result/ResultForm";
import { useRecoilState } from "recoil";
import { loginState, guestState } from "../../atoms";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";

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
  const result_explain = {
    넷플릭스:
      "전세계에서 가장 유명한 OTT 서비스 넷플릭스! 영화와 드라마뿐만 아니라 애니메이션, 다큐멘터리 등 다양한 콘텐츠를 제공합니다. 특히 넷플릭스 오리지널 컨텐츠는 높은 퀄리티와 폭넓은 장르로 꾸준히 사랑받고 있습니다.",
    티빙: "CJ ENM에서 운영하는 국내 OTT 서비스, 티빙! 주로 한국 드라마와 예능 프로그램을 중심의 콘텐츠를 제공합니다. 실시간 TV 방송도 제공하여, 원하는 프로그램을 빠르게 시청할 수 있다는 것이 큰 장점입니다. 최근 인지도, 이용률 전반에서 큰 폭의 성장세를 보이는 OTT 플랫폼입니다.",
    쿠팡플레이:
      "쿠팡 로켓와우 멤버십 회원에게 무료로 제공되는 OTT 서비스 쿠팡플레이! 월 4,990원으로 가장 저렴한 OTT입니다. 쿠팡플레이의 핵심 컨텐츠는 스포츠 중계로 많은 스포츠 팬들에게 사랑을 받고 있습니다.",
    디즈니플러스:
      "월트 디즈니 컴퍼니의 OTT 서비스 디즈니 플러스! 디즈니, 픽사, 마블, 스타워즈 등의 다양한 컨텐츠를 제공하여 가족 단위로 이용하기 좋다는 장점이 있습니다. 최근에는 오리지널 컨텐츠도 제작되어 인기를 끌었습니다.",
    웨이브:
      "KBS, MBC, SBS와 SK텔레콤이 만든 OTT 서비스 웨이브! 국내 지상파나 케이블 TV에서 방영하고 있는 다양한 컨텐츠를 제공합니다. 실시간 TV 방송도 제공하여 원하는 프로그램을 빠르게 시청할 수 있습니다. Skt 통신사 이용자는 할인 혜택을 받을 수 있다는 것이 장점입니다.",
  };

  const result_tag = {
    넷플릭스: "# 넷플릭스 오리지널  # 다양한 컨텐츠 ",
    티빙: "# 한국 드라마 예능 중심 # 실시간 TV 방송",
    쿠팡플레이: "# 스포츠 중계  # 가장 저렴한 가격",
    디즈니플러스: "# 디즈니 # 픽사 # 마블 # 스타워즈 ",
    웨이브: "# 국내 지상파 컨텐츠 # 실시간 TV 방송 ",
  };
  const navigate = useNavigate();

  const onClickRestart = () => {
    navigate("/");
  };

  const baseURL = instance.defaults.baseURL;

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const onClickShare = () => {
    handleCopyClipBoard(baseURL);
  };
  return (
    <div className="result">
      {login.username !== "" && (
        <ResultForm
          result={login.result}
          result_tag={result_tag[login.result]}
          result_explain={result_explain[login.result]}
          result_img_url={result_img_url[login.result]}
          onClickRestart={onClickRestart}
          onClickShare={onClickShare}
        />
      )}
      {login.username === "" && (
        <ResultForm
          result={guest.result}
          result_tag={result_tag[guest.result]}
          result_explain={result_explain[guest.result]}
          result_img_url={result_img_url[guest.result]}
          onClickRestart={onClickRestart}
          onClickShare={onClickShare}
        />
      )}
    </div>
  );
}
