import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id,emotion,content,date}) =>{

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`)
  } // 이미지와 프리뷰를 클릭했을 때 일기 상세로 들어가는 온클릭함수
  const goEdit = () => {
    navigate(`/edit/${id}`)
  } // 수정하기 버튼 클릭시 수정하기에 연결되는 함수

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString(); // 전달받은 데이터를 알아보기 쉽게 하기 위해 지정

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={["emotion_img_wrapper",`emotion_img_wrapper_${emotion}`].join(" ")}
      >
        {/* 이모션 이미지의 조정을 위해 배열화 */}
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div
        onClick={goDetail}
        className="info_wrapper"
      >
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">
          {content.slice(0, 25)}
          {/* 컨텐츠의 내용이 너무 길 경우 잘라내기(프리뷰) */}
        </div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          onClick={goEdit}
          text={"수정하기"}
        />
      </div>
    </div>
  )
}

export default React.memo(DiaryItem);