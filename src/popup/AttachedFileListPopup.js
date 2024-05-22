import axios from "axios";
import { useEffect, useState } from "react";


function AttachedFilePopup({filesName, boardIdx, closeFileListPopUp}) {
  const [needPassword, setNeedPassword] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(()=>{
    const getBoardData = async () => {
      try {
          const res = await axios.get(`http://localhost:1000/api/board/getBoardByBoardIdx?boardIdx=${boardIdx}`);
          setNeedPassword(res.data.isPrivate === 1);
      } catch(e) {
          console.log(e)
      }
    }

    getBoardData();
  }, [])


  const download = async (fileName) => {
    try {
        const response = await axios.get(`http://localhost:1000/api/board/fileDownload?fileName=${fileName}&boardIdx=${boardIdx}`,
            {
                responseType: 'blob' // Blob 형식으로 데이터 받기
            }
        );


        const blob = new Blob([response.data], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);

        // 다운로드 링크 생성
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute('download', fileName);

        // 링크를 body에 추가하고 클릭하여 다운로드 시작
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // 다운로드가 완료되면 링크 제거
        document.body.removeChild(downloadLink);
    } catch (e) {
        console.log("MemberList" + e)
    }
  }

    const checkDownloadPermission = async () => {
      try {
        const res = await axios.post("http://localhost:1000/api/security/generateReadPermissionToken", {
          boardIdx : boardIdx,
          password : password
        });

        if(res.data.message === "PASSWORD_WRONG" ) {
          window.alert("비밀번호가 틀렸습니다.")
          return;
        } else {
          setNeedPassword(false);
          return
        }

      } catch(e) {
        console.log(e)
      }
    }




  return (
    <div className="comm_popup">
      <div className="wrap_tit">
        <span className="tit_pop">첨부파일</span>
        <button type="button" className="btn_close" onClick={closeFileListPopUp}>닫기</button>
      </div>
      {
       needPassword ?
        <div className="wrap_cont">
          <div style={{"display" : "flex", "flexDirection":"row"}}>
            <input placeholder="비밀번호를 입력해주세요." type="text" className="comm_inp_text" style={{ "width": "100%", "flex": "9" }} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button style={{"borderRadius" : "2px", "marginLeft" : "5px", "flex": "2", "background":"#395b83", "color" :"white", "border": "1px soild #395b83"}} onClick={checkDownloadPermission}>확인</button>
          </div>
        </div>
        :
        <div className="wrap_cont">
          <ul className="list_file">
              {filesName.map((item, index) => (
                <li key={index}><a onClick={()=>download(item)}>{item}</a></li>
              ))}
          </ul>
        </div>
      }
      <div className="wrap_bottom">
        <button className="comm_btn_round" onClick={closeFileListPopUp}>닫기</button>
      </div>
    </div>
  );
}

export default AttachedFilePopup;
