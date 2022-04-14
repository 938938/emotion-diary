// New 와 Edit 의 구성이 비슷하기 때문에 중복되는 부분을 따로 제작.

import { useState,useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import MyHeader from './Myheader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from './../App';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id:1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "매우 좋음"
  },
  {
    emotion_id:2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음"
  },
  {
    emotion_id:3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "평범함"
  },
  {
    emotion_id:4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨"
  },
  {
    emotion_id:5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "매우 나쁨"
  }
]

const getStringDate = (date) =>{
  return date.toISOString().slice(0, 10);
  // 2022-04-14 형식으로 나타내기 위한 함수
  // toISOString : ISO 형식의 문자열(YYYY-MM-DDTHH:mm:ss.sssZ)을 반환하는 메소드
}

const DiaryEditor = () => {
  const contentRef = useRef(); // 일기 내용이 비어있을 경우 포커스 용도
  const [content,setContent] = useState(); // 일기 내용 저장
  const [emotion,setEmotion] = useState(3); // 감정 선택 저장
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  }
  const [date, setDate] = useState(getStringDate(new Date()));
  const {onCreate} = useContext(DiaryDispatchContext);
  const handleSubmit = () =>{ // 작성 완료를 눌렀을 때 실행되는 함수
    if(content.length<1){
      contentRef.current.focus();
      return;
    }
    onCreate(date,content,emotion);
    navigate('/',{replace:true}); // 작성완료를 누른 후에는 뒤로가기를 할 수 없음
  }
  const navigate = useNavigate();
  return(
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)}/>
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it)=>(
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion} // 선택되었는지 아닌지를 전달
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={()=>navigate(-1)}/>
            <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;