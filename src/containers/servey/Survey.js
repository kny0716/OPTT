import { useState } from "react";
import SurveyForm from "../../components/survey/SurveyForm";
import Loading from "../../components/common/Loding";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";
import { loginState, guestState } from "../../atoms";
import { useRecoilState } from "recoil";

const ott = ["넷플릭스", "티빙", "쿠팡플레이", "디즈니플러스", "웨이브"];
const contents = [
  {
    // [넷플릭스, 티빙, 쿠팡플레이, 디즈니플러스, 웨이브]
    query: "OTT를 처음 이용하려고 한다. \n 당신의 선택은?",
    answers: [
      "가족, 친구 다 모여! 계정 공유할래? \n 돈 아껴야지~",
      "계정 공유? 딱히 필요없어!",
    ],
    result: { first: [3, 3, 3, 3, 3], second: [0, 0, 0, 0, 0] },
  },
  {
    query: "OTT 회원가입을 마치고 뜬 무료 체험 창! \n 당신의 선택은?",
    answers: [
      "오 너무 좋은데? 바로 등록!",
      "무료체험? 나중에 해지하기 귀찮아~ 그냥 돈 내",
    ],
    result: { first: [0, 0, 5, 0, 5], second: [0, 0, 0, 0, 0] },
  },
  {
    query:
      "어떤 OTT를 이용할까 고민하던 당신... \n 친구들이 다들 넷플릭스를 사용한다고 한다고 꼬드기는데.. ",
    answers: ["그래?? 역시 많이 쓰는 게 최고지~ ", "나는 나만의 길을 갈거야!"],
    result: { first: [5, 3, 4, 1, 2], second: [0, 0, 0, 0, 0] },
  },
  {
    query:
      "OTT 이용권 결제를 앞둔 당신... \n 옆에서 엄마가 ‘얘~ 요즘은 통신사로 할인 많이 받던데? \n 알아보고 하는 거니?’라고 말한다.\n 당신의 선택은?",
    answers: ["그래? 알아볼게~", " ... 그냥 할래"],
    result: { first: [3, 3, 0, 3, 3], second: [0, 0, 0, 0, 0] },
  },
  {
    query:
      "일정을 다 끝내고 휴식을 위해 \n OTT에 접속하는데 시청할 수 없다는 알람이 뜬다?!\n 알고보니 범인은 드라마를 보고 계신 부모님... \n당신의 선택은?",
    answers: [
      "나와 부모님 모두 행복할 수 있게 동시 시청이 가능한 이용권으로 업그레이드한다",
      "'다른거나 봐야겠다..' OTT를 끈다",
    ],
    result: { first: [3, 3, 3, 3, 3], second: [0, 0, 0, 0, 0] }, // 애매하네... 요금제에 따라서 다양해서
  },
  {
    query:
      "친구가 '나는 한국 드라마 별로... 해외 드라마가 훨씬 재밌어!' \n 라고 말할 때 당신의 반응은?",
    answers: [
      "그래? 나는 한국 드라마가 더 좋던데..",
      "오 맞아! 나도 해외 드라마 좋아해",
    ],
    result: { first: [5, 5, 3, 3, 5], second: [5, 1, 3, 4, 2] },
  },
  {
    query:
      "영화관에 도착한 당신... 현재 예매할 수 있는 건 \n 국내 영화와 해외 영화뿐...  당신의 선택은?",
    answers: ["국내 영화", "해외 영화"],
    result: { first: [5, 2, 4, 1, 3], second: [5, 1, 3, 5, 2] },
  },
  {
    query:
      "'친구가 ‘야! 너 이번주 그 예능 봤어?'라고 말할 때, \n 당신의 반응은?",
    answers: [
      "그거? 당연히 봤지~ 완전 재밌더라",
      "어? 나 예능에는 관심이 없어서...",
    ],
    result: { first: [2, 5, 3, 1, 4], second: [0, 0, 0, 0, 0] },
  },
  {
    query: "OTT 홈페이지에서 오리지널 컨텐츠 광고를 본 당신의 반응은?",
    answers: [
      " '어! 이거 재밌겠다. 뭔가 다르겠지? 봐야지~' 이용권을 구매한다",
      "'음~ 관심없어' 자연스럽게 x를 누른다.",
    ],
    result: { first: [5, 3, 1, 4, 2], second: [0, 0, 0, 0, 0] },
  },
  {
    query: "'너 애니메이션 좋아해?' 물어보는 친구... \n 당신의 반응은?",
    answers: ["응! 나 애니메이션 좋아해!!", "아니 별로 관심없어~"],
    result: { first: [4, 2, 3, 5, 1], second: [0, 0, 0, 0, 0] },
  },

  {
    query: "평소 즐겨보던 프로그램 방송 시간이 다가온다... \n 당신의 선택은?",
    answers: [
      "본방사수를 위해 OTT에 접속해 시작을 기다린다",
      "나중에 OTT에 올라오면 본다",
    ],
    result: { first: [0, 3, 3, 0, 3], second: [0, 0, 0, 0, 0] },
  },
];

export default function Survey() {
  const [login, setLogin] = useRecoilState(loginState);
  const [guest, setGuest] = useRecoilState(guestState);

  const [question_number, set_question_number] = useState(0);
  const [survey_result, set_survey_result] = useState([0, 0, 0, 0, 0]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const firstAnswerClick = (e) => {
    if (question_number === 10) {
      set_question_number(question_number + 1);
      set_survey_result(
        survey_result.map(
          (value, index) =>
            value + contents[question_number].result.first[index]
        )
      );
      if (login.token === 1) {
        setResult(login.username, login.password, survey_result);
      } else {
        setResult(login.username, login.password, survey_result);
        setGuest({ result: findResult(survey_result, ott) });
      }
      setLoading(true);
      setTimeout(() => {
        navigate("/result");
      }, 4000);
    } else {
      set_question_number(question_number + 1);
      set_survey_result(
        survey_result.map(
          (value, index) =>
            value + contents[question_number].result.first[index]
        )
      );
    }
  };
  const secondAnswerClick = (e) => {
    if (question_number === 10) {
      set_question_number(question_number + 1);
      set_survey_result(
        survey_result.map(
          (value, index) =>
            value + contents[question_number].result.second[index]
        )
      );
      if (login.token === 1) {
        setResult(login.username, login.password, survey_result);
      } else {
        setResult(login.username, login.password, survey_result);
        setGuest({ result: findResult(survey_result, ott) });
      }
      setLoading(true);
      setTimeout(() => {
        navigate("/result");
      }, 4000);
    } else {
      set_question_number(question_number + 1);
      set_survey_result(
        survey_result.map(
          (value, index) =>
            value + contents[question_number].result.second[index]
        )
      );
    }
  };

  function findResult(result, ott) {
    let maxIndex = 0;
    for (let i = 1; i < result.length; i++) {
      if (result[i] > result[maxIndex]) {
        maxIndex = i;
      }
    }
    return ott[maxIndex];
  }

  async function setResult(username, password, result) {
    const result_ott = findResult(result, ott);
    setLogin({
      ...login,
      result: result_ott,
    });
    await instance
      .post("/user/result", {
        username: username,
        password: password,
        result: result_ott,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {!loading && (
        <SurveyForm
          number={question_number}
          contents={contents}
          onSubmit={{ firstAnswerClick, secondAnswerClick }}
        />
      )}
      {loading && <Loading />}
    </>
  );
}
