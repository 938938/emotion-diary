// 라우트 이용에 대해 태스트하기 위한 임시 파일

import {Link} from 'react-router-dom';
// 라우트의 이동은 Link를 사용함

const RouteTest = () =>{
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <br />
      <Link to={'/diary'}>Diary</Link>
      <br />
      <Link to={'/new'}>New</Link>
      <br />
      <Link to={'/edit'}>Edit</Link>
      {/* <a href={"/new"}>New</a> 이런 식으로 하면 MPA 방식으로 이동하게 됨. 리액트의 장점을 사용할 수 없음(페이지 외부로 나가는 url이 필요할 때 사용) */}
    </div>
  )
}

export default RouteTest;