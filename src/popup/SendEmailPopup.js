
function SendEmailPopup({closeSendEmailPopup, email}) {
    return (
        <div className="comm_popup"> 
        <form>
          <fieldset className="blind">이메일 보내기</fieldset>
          <div className="wrap_tit">
            <span className="tit_pop">이메일 보내기</span>
            <button type="button" className="btn_close" onClick={closeSendEmailPopup}>닫기</button>
          </div>
          <div className="wrap_cont">
            <table className="tbl_pop">
              <tr>
                <th>보내는 사람</th>
                <td><input type="text" className="comm_inp_text" style={{width : 100+"%"}} /></td>
              </tr>
              <tr>
                <th>받는 사람</th>
                <td><input type="text" className="comm_inp_text" value={email} style={{width : 100+"%"}} /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" className="comm_inp_text" style={{width : 100+"%"}} /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea className="comm_textarea" style={{width : 100+"%"}}></textarea></td>
              </tr>
              <tr>
                <th>파일</th>
                <td>
                  <input type="file" className="comm_inp_file" style={{width : 100+"%"}} />
                  <ul className="list_file_inline mt_5">
                    <li>file_20240425.zip <button className="btn_ico_del">삭제</button></li>
                    <li>file_파일명이 길 경우_파일명이 길 경우_파일명이 길 경우_20240425.png <button className="btn_ico_del">삭제</button></li>
                    <li>file_2.pdf <button className="btn_ico_del">삭제</button></li>
                    <li>file_3.jpg <button className="btn_ico_del">삭제</button></li>
                    <li>file_20240425.zip <button className="btn_ico_del">삭제</button></li>
                    <li>file_20240425.png <button className="btn_ico_del">삭제</button></li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
          <div className="wrap_bottom">
            <button className="comm_btn_round" onClick={closeSendEmailPopup}>닫기</button>
            <button className="comm_btn_round fill">보내기</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default SendEmailPopup;
  