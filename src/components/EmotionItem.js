import React from "react";

const EmotionItem=({emotion_id, emotion_img, emotion_descript,onClick,isSelected})=>{
  return(
    <div className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}`:`EmotionItem_off`].join(" ")} onClick={()=>onClick(emotion_id)}>
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default React.memo(EmotionItem);
// 전달받는 요소 중 onClick 함수가 있기 때문에 React.memo를 사용해도 리렌더링이 계속 일어남.
// 함수 : useState를 통해 전달받은 상태변화 함수가 아니거나 useCallback으로 묶어둔 함수가 아닌 경우 기본적으로 컴포넌트가 렌더링 될 때 재생성됨. → DiaryEditor에서 수정.