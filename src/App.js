import React,{ useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 라우터 실행 돔. 이후 <BrowserRouter>태그를 최상위 태그에서 감싸주면 됨.

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

//Components
import MyButton from './components/MyButton';
import MyHeader from './components/Myheader';

const reducer = (state,action) =>{
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      // const newItem = {
      //   ...action.data
      // };
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it)
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary',JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
//상태관리 로직의 콘텍스트를 만들어서 data state를 컴포넌트 전역에 공급
export const DiaryDispatchContext = React.createContext();

// const dummyData = [ // Home 구현할 때 사용할 더미 데이터
//   {
//     id:1,
//     emotion:1,
//     content:"임시 일기1번",
//     date:1649838278345,
//   },
//   {
//     id:2,
//     emotion:2,
//     content:"임시 일기2번",
//     date:1649838278346,
//   },
//   {
//     id:3,
//     emotion:3,
//     content:"임시 일기3번",
//     date:1649838278347,
//   },
// ];

function App() {

  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || "";
  // process.env.PUBLIC_URL 사용으로 제대로 이미지가 불러오지 않을 때 사용

  // useEffect(()=>{ // localStorage 연습
  //   localStorage.setItem("key1",10); // 데이터 입력
  //   localStorage.setItem("key2","10");
  //   localStorage.setItem("key3",JSON.stringify({value:10}));
  //   // localStorage는 문자형으로만 저장하므로 오브젝트 형태로 저장하기 위해서는 JSON 기능 필요.
  //   const key1 = localStorage.getItem("key1"); // 데이터 가져오기
  //   const key2 = localStorage.getItem("key2");
  //   const key3 = JSON.parse(localStorage.getItem("key3"));
  // },[])

  const [data,dispatch] = useReducer(reducer,[]);
  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b)=>parseInt(b.id)-parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1; // 기존 데이터가 있을 경우 시작 id값을 그 다음 값으로 설정
      dispatch({type:"INIT",data:diaryList}); // 기존 데이터가 있을 경우 초기값으로 설정
    }
  },[])
  const dataId = useRef(0); // 더미데이터가 id를 1,2,3을 가지고 있기 때문에 0부터 시작하면 key값이 중복되는 오류가 발생 → (4)로 시작.
  //CREATE
  const onCreate = (date,content,emotion) =>{
    dispatch({type:"CREATE",data:{
      id:dataId.current,
      date:new Date(date).getTime(),
      content,
      emotion
    }})
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) =>{
    dispatch({type:"REMOVE",targetId});
  }
  //EDIT
  const onEdit = (targetId,date,content,emotion)=>{
    dispatch({type:"EDIT",data:{
      // type를 CREATE인 채로 수정 안하고 있었어서 수정시 일기 데이터가 새롭게 하나 더 나타나는 오류가 발생했음.
      id:targetId,
      date:new Date(date).getTime(),
      content,
      emotion
    }})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
              headText={"App"}
              leftChild={<MyButton text={'왼쪽 버튼'} onClick={()=>console.log("왼쪽")} />}
              rightChild={<MyButton text={'오른쪽 버튼'} onClick={()=>console.log("오른쪽")} />}
              // 컴포넌트 자체를 프롭으로 전달하면 전달되는 프롭의 갯수를 줄일 수 있음
            />
            <MyButton
              text={'버튼'}
              onClick={()=>console.log("성공")}
              type={"positive"}
            />
            <MyButton
              text={'버튼'}
              onClick={()=>console.log("성공")}
              type={"negative"}
            /> */}

            {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} /> */}
            {/* 이미지 불러오는 방법. process.env.PUBLIC_URL : PUBLIC이라는 경로를 바로 사용할 수 있게 하는 명령어*/}
            
            <Routes>
              <Route path='/' element={<Home />} />
              {/* url경로와 컴포넌트를 매칭, path='/' : 경로가 클래식일 때 element={<Home/} 엘리멘트는 홈이다 */}
              <Route path='/new' element={<New />} />
              {/* http://localhost:3000/new 으로 들어가도 위의 App.js는 그대로 표시. Routes 태그 안의 요소만 변화 */}
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              {/* id라는 이름으로 뒤의 값을 전달하겠다는 선언. 무조건 /와 id를 갖는다는 선언이기 때문에 /diary로는 경로를 탐색할 수 없음.
                    <Route path='/diary' element={<Diary />} />   ← 이 코드를 넣어 별도 처리를 하면 되지만 일기에 id값이 없는 경우는 없기 때문에 이번에는 생략. */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;