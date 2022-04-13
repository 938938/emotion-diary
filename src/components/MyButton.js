const MyButton=({text,type,onClick})=>{
  const btnType = ['positive','negative'].includes(type)? type:'default';
  // positive, negative, default 이외의 type이 들어오면 강제로 default 타입으로 변경
  return (
    <button
      className={["MyButton",`MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

MyButton.defaultProps = {
  type : "default",

}

export default MyButton;