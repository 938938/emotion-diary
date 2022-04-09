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
    </div>
  )
}

export default RouteTest;