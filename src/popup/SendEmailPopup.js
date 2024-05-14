import axios from "axios";
import { useState } from "react";


function SendEmailPopup({ closeSendEmailPopup, email }) {
  const [from, setFrom] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const sendEmail = async () => {
    try {
      const res = await axios.post("http://localhost:1000/api/mail/sendMail", {
        from: from,
        to: email,
        title: title,
        content: content
      })
      if (res.data.message === "SENDED_EMAIL") {
        closeSendEmailPopup();
      } else if (res.data.message === "SENDING_EMAIL_ERROR") {
        window.alert("이메일 전송중 오류가 발생하였습니다.");
      }

    } catch (error) {
      window.alert("이메일 전송중 오류가 발생하였습니다.");

    }
  }


  return (
    <div className="comm_popup">
      <fieldset className="blind">이메일 보내기</fieldset>
      <div className="wrap_tit">
        <span className="tit_pop">이메일 보내기</span>
        <button type="button" className="btn_close" onClick={closeSendEmailPopup}>닫기</button>
      </div>
      <div className="wrap_cont">
        <table className="tbl_pop">
          <tr>
            <th>보내는 사람</th>
            <td><input type="text" className="comm_inp_text" style={{ width: 100 + "%" }} value={from} onChange={(e) => setFrom(e.target.value)} /></td>
          </tr>
          <tr>
            <th>받는 사람</th>
            <td><input type="text" className="comm_inp_text" value={email} style={{ width: 100 + "%" }} /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" className="comm_inp_text" style={{ width: 100 + "%" }} value={title} onChange={(e) => setTitle(e.target.value)} /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea className="comm_textarea" style={{ width: 100 + "%" }} value={content} onChange={(e) => setContent(e.target.value)} /></td>
          </tr>
          <tr>
            <th>파일</th>
            <td>
              <input type="file" className="comm_inp_file" style={{ width: 100 + "%" }} />
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
        <button className="comm_btn_round fill" onClick={sendEmail}>보내기</button>
      </div>
    </div>
  );
}

export default SendEmailPopup;
