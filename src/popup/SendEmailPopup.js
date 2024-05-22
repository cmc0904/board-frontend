import axios from "axios";
import { useRef, useState } from "react";


function SendEmailPopup({ closeSendEmailPopup, email }) {
  const [from, setFrom] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fileRef = useRef();

  const [files, setFiles] = useState([]);

  const handleChangeFile = (event) => {
    setFiles(Array.from(event.target.files));
  }

  // 선택된 파일을 담고 있는 배열에서 파일 객체 제거
  const cancelSelectedFile = (file) => {
    const filteredFiles = files.filter((item) => item !== file);
    const dataTransfer = new DataTransfer();
    filteredFiles.forEach(file => {
      dataTransfer.items.add(file);
    });
    fileRef.current.files = dataTransfer.files;
    setFiles(filteredFiles);
  }

  const sendEmail = async () => {
    try {
      if (!validation()) return;

      const res = await axios.post("/api/mail/sendMail", settingFormData())
      if (res.data.message === "SENDED_EMAIL") {
        closeSendEmailPopup();
      } else if (res.data.message === "SENDING_EMAIL_ERROR") {
        window.alert("이메일 전송중 오류가 발생하였습니다.");
      }

    } catch (error) {
      window.alert("이메일 전송중 오류가 발생하였습니다.");

    }
  }

  const settingFormData = () => {
    const formData = new FormData();

    formData.append("from", from);
    formData.append("to", email);
    formData.append("title", title);
    formData.append("content", content);

    Array.from(fileRef.current.files).forEach((file) => {
      formData.append("files", file);
    });

    return formData;
  }

  const validation = () => {
    if (!from.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
      window.alert("보내는 사람의 이메일 형식을 확인해주세요");
      return false;
    } else if (title.replaceAll(" ", "").length === 0) {
      window.alert("제목을 입력해주세요");
      return false;
    } else if (content.replaceAll(" ", "").length === 0) {
      window.alert('메일 내용을 입력 해주세요.')
      return false;
    }

    return true;
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
            <td><input type="text" className="comm_inp_text" style={{ "width": "100%" }} value={from} onChange={(e) => setFrom(e.target.value)} /></td>
          </tr>
          <tr>
            <th>받는 사람</th>
            <td><input type="text" className="comm_inp_text" value={email} style={{ "width": "100%" }} /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" className="comm_inp_text" style={{ "width": "100%" }} value={title} onChange={(e) => setTitle(e.target.value)} /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea className="comm_textarea" style={{ "width": "100%" }} value={content} onChange={(e) => setContent(e.target.value)} /></td>
          </tr>
          <tr>
            <th>파일</th>
            <td>
              <input type="file" className="comm_inp_file" style={{ "width": "100%" }} ref={fileRef} onChange={handleChangeFile} multiple/>
              <ul className="list_file_inline mt_5">
                {files.map((item, index) => (
                  <li key={index}>
                    {item.name}
                    <button className="btn_ico_del" onClick={() => cancelSelectedFile(item)}>삭제</button>
                  </li>
                ))}
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
