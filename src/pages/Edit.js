import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () =>{
  const navigate = useNavigate();
  // Page moving 사용. 페이지를 이동할 수 있는 훅.
  const [searchParams,setSearchParams] = useSearchParams();
  // QueryString 사용
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  console.log("id:",id);
  return(
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={()=>setSearchParams({who:'abc'})}>QS 바꾸기</button>
      {/* 버튼을 클릭하면 주소가 edit?who=abc로 바뀜 */}
      <button onClick={()=>{
        navigate('/home')
        // 경로 작성. ex) 로그인이 되지 않은 사용자가 로그인 페이지로 가려고 할 때 등 사용
      }}>Home으로 가기</button>
      <button onClick={()=>{navigate(-1)}}>뒤로가기</button>
    </div>
  );
};

export default Edit;