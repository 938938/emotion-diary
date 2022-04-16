import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";


const Edit = () =>{
  const navigate = useNavigate();
  // Page moving 사용. 페이지를 이동할 수 있는 훅.

  // const [searchParams,setSearchParams] = useSearchParams();
  // // QueryString 사용
  // const id = searchParams.get('id');
  // const mode = searchParams.get('mode');
  // console.log("id:",id);
  // 실습 예제

  const [originData,setOriginData] = useState();

  const {id} = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    // 페이지 이동시 타이틀을 변경하기 위한 코드. html 문서의 <title>을 가리킴.
    titleElement.innerHTML = `감정일기장 - ${id}번 일기 수정`;
  },[])

  useEffect(()=>{
    if(diaryList.length>=1){
      const targetDiary = diaryList.find(
        (it)=>parseInt(it.id) === parseInt(id)
      );
      if(targetDiary){
        setOriginData(targetDiary);
      } else {
        navigate("/",{replace:true}); // 존재하지 않는 id의 페이지로 가면 자동으로 홈화면으로. 뒤로가기 불가능.
      }
    }
  },[id,diaryList])

  return(
    <div>
      {/* <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={()=>setSearchParams({who:'abc'})}>QS 바꾸기</button> */}
      {/* 버튼을 클릭하면 주소가 edit?who=abc로 바뀜 */}
      {/* <button onClick={()=>{
        navigate('/home')
        // 경로 작성. ex) 로그인이 되지 않은 사용자가 로그인 페이지로 가려고 할 때 등 사용
      }}>Home으로 가기</button>
      <button onClick={()=>{navigate(-1)}}>뒤로가기</button> */}
      {originData && <DiaryEditor isEdit={true} originData={originData}/>}
    </div>
  );
};

export default Edit;