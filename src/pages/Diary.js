import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyButton from "../components/MyButton";
import MyHeader from "../components/Myheader";
// use~~ React 훅에서 많이 사용. 사용자 정의 훅(Custom Hook)

const Diary = () =>{
  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data,setData] = useState();

  useEffect(()=>{
    if(diaryList.length >= 1){
      const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id)
      );
      if(targetDiary){
        setData(targetDiary); // 일기가 존재할 때
      } else {
        navigate('/',{replace:true}); // 일기가 존재하지 않을 때 홈화면으로 + 뒤로가기 불가.
      }
    };
  },[id,diaryList]);

  if(!data){
    return <div className="DiaryPage">로딩중입니다...</div>; // 데이터가 없는 경우
  } else {
    const curEmotionData = emotionList.find((it)=>parseInt(it.emotion_id)===parseInt(data.emotion));
    return(
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
          rightChild={<MyButton text={'수정하기'} onClick={()=>navigate(`/edit/${data.id}`)}/>}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img src={curEmotionData.emotion_img}/>
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;