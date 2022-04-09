import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 라우터 실행 돔. 이후 <BrowserRouter>태그를 최상위 태그에서 감싸주면 됨.
import RouteTest from './components/RouteTest';
// 라우트를 불러오기 위한 임시 태그

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* url경로와 컴포넌트를 매칭, path='/' : 경로가 클래식일 때 element={<Home/} 엘리멘트는 홈이다 */}
          <Route path='/new' element={<New />} />
          {/* http://localhost:3000/new 으로 들어가도 위의 App.js는 그대로 표시. Routes 태그 안의 요소만 변화 */}
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary' element={<Diary />} />
        </Routes>
        <RouteTest />
        {/* <a href={"/new"}>New</a> 이런 식으로 하면 MPA 방식으로 이동하게 됨. 리액트의 장점을 사용할 수 없음(페이지 외부로 나가는 url이 필요할 때 사용) */}
      </div>
    </BrowserRouter>
  );
}

export default App;