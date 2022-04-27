export const getStringDate = (date) =>{
  // return date.toISOString().slice(0, 10);
  // 2022-04-14 형식으로 나타내기 위한 함수
  // toISOString : ISO 형식의 문자열(YYYY-MM-DDTHH:mm:ss.sssZ)을 반환하는 메소드
  // → 세계별 시간대 차이가 있기 때문에 적절하지 못함
  let year = date.getFullYear();
  let month = String(date.getMonth()+1).padStart(2,"0");
  let day = String(date.getDate()).padStart(2,"0");
  // 노마드 코더에서 배운 방식
  
  // let month = date.getMonth()+1;
  // let day = date.getDate();
  // if(month<10){
  //   month = `0${month}`;
  // }
  // if(day<10){
  //   day=`0${day}`;
  // } // 나중에 노마드코더에서 배운 방식으로 변경해보기
  return `${year}-${month}-${day}`;
};