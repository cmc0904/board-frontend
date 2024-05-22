import axios from "axios";
import { useState } from "react";

function CommentDeletePopUp({ item, closePopUp, getData }) {
    const [password, setPassword] = useState("")

    const deleteComment = async () => {
        try {
            if(password.replaceAll(" ", "").length === 0) return window.alert("비밀번호를 입력해주세요")

            const res = await axios.delete(
                'http://localhost:1000/api/comment/deleteComment',
                {
                    data: {
                        boardIdx: item.idx,
                        password: password
                    }
                }
            );
    

            if(res.data.message === "PASSWORD_WRONG") {
                window.alert("비밀번호가 틀렸습니다.")
            } else if(res.data.message === "COMMENT_DELETED") {
                closePopUp();
                getData();
            }
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <div className="comm_popup">
            <div className="wrap_tit">
                <span className="tit_pop">댓글삭제</span>
                <button type="button" className="btn_close" onClick={closePopUp}>닫기</button>
            </div>
            <div className="wrap_cont">
            비밀번호 <input type="text" className="comm_inp_text" style={{ "width": "100%" }} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="wrap_bottom">
                <button className="comm_btn_round" onClick={closePopUp}>닫기</button>
                <button className="comm_btn_round fill" onClick={deleteComment}>확인</button>
            </div>
        </div>
    );
}

export default CommentDeletePopUp;
