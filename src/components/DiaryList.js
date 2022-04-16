import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  {value:"all", name:"전부 다"},
  {value:"good", name:"좋은 감정만"},
  {value:"bad", name:"안좋은 감정만"},
]
// 좋은 감정, 보통, 안좋은 감정. 보통 파트 추가하기.


const ControlMenu = React.memo(({value, onChange, optionList}) => { // 필터 기능
  // onChange : 상태변화함수를 받고 있기 때문에 memo가 제대로 기능.
  return (
    <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
});
// 연산의 최적화. ex) 월을 변경할 때 아래 버튼은 리렌더링 될 필요가 없기 때문에 수정.(React.memo 추가)

const DiaryList = ({diaryList})=>{
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // 정렬을 저장할 state
  const [filter, setFilter] = useState("all");
  const getProcessedDiaryList = () =>{
    const filterCallBack = (item) => { // 필터 값에 따라 필터링을 어떻게 해야할지 달라지기때문에, 필터링할 함수를 작성
      if(filter === 'good'){
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }
    const compare = (a,b)=>{
      if(sortType==='latest'){
        return parseInt(b.date) - parseInt(a.date);
        //b.date ... 가 문자열 일 수도 있기 때문에. parseInt에 포함
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList));
    // 날짜 정렬을 위한 데이터. JSON.stringify = diaryList 배열을 문자로 바꿈. JSON.parse = 문자로 바뀐 diaryList를 다시 배열로 반환.
    const filteredList = filter === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it));
    // 필터링
    const sortedList = filteredList.sort(compare);
    // 정렬을 할 때 그냥은 정렬이 되지 않기 때문에 비교 함수를 작성, 이용.
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        {/* 상단 버튼의 자리 배치를 위해 추가 */}
        <div className="left_col">
          <ControlMenu // 날짜 정렬 파트
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu // 필터 파트
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton // 새 일기 쓰기 파트
            type={'positive'}
            text={'새 일기 쓰기'}
            onClick={()=>navigate('/new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it)=>(
        <DiaryItem
          key={it.id} {...it}
        />
      ))}
    </div>
  )
};

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;