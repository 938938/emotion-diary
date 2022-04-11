import { useParams  } from "react-router-dom";
// use~~ React 훅에서 많이 사용. 사용자 정의 훅(Custom Hook)

const Diary = () =>{
  const {id} = useParams();
  console.log(id);
  // 
  return(
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  );
};

export default Diary;