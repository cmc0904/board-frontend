
function AttachedFilePopup({filesName, boardIdx, closeFileListPopUp}) {
  return (
    <div className="comm_popup">
      <div className="wrap_tit">
        <span className="tit_pop">첨부파일</span>
        <button type="button" className="btn_close" onClick={closeFileListPopUp}>닫기</button>
      </div>
      <div className="wrap_cont">
        <ul className="list_file">
            {filesName.map((item, index) => (
            <li key={index}><a href="javascript:;">{item}</a></li>
            ))}
        </ul>
      </div>
      <div className="wrap_bottom">
        <button className="comm_btn_round" onClick={closeFileListPopUp}>닫기</button>
      </div>
    </div>
  );
}

export default AttachedFilePopup;
