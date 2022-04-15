import { useState,useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from './../components/Myheader';
import MyButton from './../components/MyButton';
import DiaryList from "./../components/DiaryList";

const Home = () =>{
  const diaryList = useContext(DiaryStateContext);
  
  const [data,setData] = useState([]);
  const [curDate,setCurDate] = useState(new Date()); // 날짜 저장 스테이트
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

  useEffect(()=>{
    if(diaryList.length>=1){
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime(); // 이번 년도 이번 월의 1일
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
        // 마지막 날짜는 시간, 분, 초까지 입력을 해줘야 함.
        // (하지 않으면 마지막 날짜의 일기는 표시되지 않음)
      ).getTime(); // firstday와 lastday를 통해 그 사이에 작성된 일기를 추려낼 수 있음
      setData(diaryList.filter((it)=> it.date >= firstDay && it.date <= lastDay));  
    }
  },[diaryList,curDate]) // curDate가 변화하는 순간에만 diaryList에서 해당 연도와 월에 해당하는 데이터를 뽑아옴
  useEffect(()=>{
    console.log(data);
  },[data]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
  };
  return(
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data}/>
    </div>
  );
};

export default Home;