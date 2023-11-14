import React from "react";
const contents = [
  {
    query: "OTT를 처음 이용하려고 한다. 당신의 선택은?",
    answers: [
      "가족, 친구 다 모여! 계정 공유할래? 돈 아껴야지~",
      "계정 공유? 딱히 필요없어!",
    ],
  },
  {
    query: "OTT 회원가입을 마치고 뜬 무료 체험 창! 당신의 선택은?",
    answers: [
      "무료체험? 나중에 해지하기 귀찮아~ 그냥 돈 내",
      "오 너무 좋은데? 바로 등록!",
    ],
  },
  {
    query:
      "어떤 OTT를 이용할까 고민하던 당신... 친구들이 다들 넷플릭스를 사용한다고 한다고 꼬드기는데.. ",
    answers: ["그래?? 역시 많이 쓰는 게 최고지~ ", "나는 나만의 길을 갈거야!"],
  },
  {
    query:
      "OTT 이용권 결제를 앞둔 당신... 옆에서 엄마가 ‘얘~ 요즘은 통신사로 할인 많이 받던데? 알아보고 하는 거니?",
    answers: ["그래? 알아볼게~", " ... 그냥 할래"],
  },
  {
    query:
      "일정을 다 끝내고 휴식을 위해 OTT에 접속하는데 시청할 수 없다는 알람이 뜬다?! 알고보니 범인은 드라마를 보고 계신 부모님... 당신의 선택은?",
    answers: [
      "'다른거나 봐야겠다..' OTT를 끈다",
      "나와 부모님 모두 행복할 수 있게 동시 시청이 가능한 이용권으로 업그레이드한다",
    ],
  },
  {
    query:
      "친구가 '나는 한국 드라마 별로... 해외 드라마가 훨씬 재밌어!' 라고 말할 때, 당신의 반응은?",
    answers: [
      "그래? 나는 한국 드라마가 더 좋던데..",
      "오 맞아! 나도 해외 드라마 좋아해",
    ],
  },
  {
    query:
      "영화관에 도착한 당신... 현재 예매할 수 있는 건 국내 영화와 해외 영화뿐... 당신의 선택은?",
    answers: ["국내 영화", "해외 영화"],
  },
  {
    query: "'친구가 ‘야! 너 이번주 그 예능 봤어?'라고 말할 때, 당신의 반응은?",
    answers: [
      "그거? 당연히 봤지~ 완전 재밌더라",
      "어? 나 예능에는 관심이 없어서...",
    ],
  },
  {
    query: "OTT 홈페이지에서 오리지널 컨텐츠 광고를 본 당신의 반응은?",
    answers: [
      " '어! 이거 재밌겠다. 뭔가 다르겠지? 봐야지~' 이용권을 구매한다",
      "'음~ 관심없어' 자연스럽게 x를 누른다.",
    ],
  },
  {
    query: "'너 애니메이션 좋아해?' 물어보는 친구... 당신의 반응은",
    answers: ["응! 나 애니메이션 좋아해!!", "아니 별로 관심없어~"],
  },
  {
    query: "평소 즐겨보던 프로그램 방송 시간이 다가온다... 당신의 선택은?",
    answers: [
      "본방사수를 위해 OTT에 접속해 시작을 기다린다",
      "나중에 OTT에 올라오면 본다",
    ],
  },
];

export default function SurveyForm(props) {
  const index = parseInt(props.number) - 1;
  return (
    <div id="survey">
      <div className="survey__div">
        <div className="survey__header">
          <div className="survey__header__title">
            <img src="img/back.svg"></img>
            <p>{props.number}/11</p>
          </div>
          <div className="survey__progressbar"></div>
        </div>
        <div className="survey__form">
          <div className="survey__form__query">{contents[index].query}</div>
          <div className="survey__form__answer" onClick={props.onClick}>
            {contents[index].answers[0]}
          </div>
          <div className="survey__form__answer" onClick={props.onClick}>
            {contents[index].answers[1]}
          </div>
        </div>
      </div>
    </div>
  );
}
