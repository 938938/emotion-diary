import { useEffect } from "react";
import DiaryEditor from "./../components/DiaryEditor";

const New = () =>{

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    // 페이지 이동시 타이틀을 변경하기 위한 코드. html 문서의 <title>을 가리킴.
    titleElement.innerHTML = `감정일기장 - 새 일기 쓰기`;
  },[])

  return(
    <div>
      <DiaryEditor />
    </div>
  )
};

export default New;