
import axios from "axios";
import { useState } from "react";

function CheckReadPermissionPopUp({closePopup, selectedBoardIdx}) {

    const [password, setPassword] = useState("")

    const checkPassword = async ()=> {
        const res = await axios.post("http://localhost:1000/api/security/generateReadPermissionToken", {
            boardIdx : selectedBoardIdx,
            password : password
        });

        console.log(res.data);

    }

    return (
        <div class="comm_popup">
            <div class="wrap_tit">
                <span class="tit_pop">비밀번호 확인</span>
                <button type="button" class="btn_close" onClick={closePopup}>닫기</button>
            </div>
            <div class="wrap_cont">
                비밀번호 <input type="text" class="comm_inp_text" style={{ "width": "100%" }} value={password} onClick={(e) => setPassword(e.target.value)}/>
            </div>
            <div class="wrap_bottom">
                <button class="comm_btn_round" onClick={closePopup}>닫기</button>
                <button class="comm_btn_round fill" onClick={checkPassword}>확인</button>
            </div>
        </div>
    );
}

export default CheckReadPermissionPopUp;
