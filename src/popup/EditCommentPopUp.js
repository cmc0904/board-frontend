import axios from "axios";
import { useState } from "react";

function EditCommentPopUp({ item, closePopUp, getData }) {
    const [password, setPassword] = useState("")
    const [content, setContent] = useState(item.content)

    const editComment = async () => {
        try {
            if(!validation()) return;
            
            const res = await axios.put(
                '/api/comment/updateComment',
                {
                    commentIdx: item.idx,
                    password: password,
                    content: content
                }
            );


            if(res.data.message === "PASSWORD_WRONG") {
                window.alert("비밀번호가 틀렸습니다.");
            } else if (res.data.message === "COMMENT_EDIT") {
                closePopUp();
                getData()
            }
        } catch (e) {
            console.log(e);
        }
    }

    const validation = () => {
        if(content.replaceAll(" ", "").length === 0) {
            window.alert("댓글을 입력 해주세요.");
            return false;
        } else if(content.length > 300) {
            window.alert("댓글은 300자 제한입니다.");
            return false;
        } else if (password.replaceAll(" ", "").length === 0) {
            window.alert('비밀번호를 입력 해주세요.')
            return false;
        }

        return true;
    }


    return (
        <>
            <fieldset className="blind">댓글 수정</fieldset>
            <div className="comm_popup" style={{"width" : "400px"}}>
                <div className="wrap_tit">
                    <span className="tit_pop">댓글 수정</span>
                    <button type="button" className="btn_close" onClick={closePopUp}>닫기</button>
                </div>
                <div className="wrap_cont">
                    <table className="tbl_pop"> 
                        <tr>
                            <th>비밀번호</th>
                            <td><input type="text" className="comm_inp_text" style={{"width" : "100%"}} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요."/></td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea className="comm_textarea" style={{"width" : "100%", "height" : "90px"}} value={content} onChange={(e)=>setContent(e.target.value)} />
                            </td>
                        </tr>

                    </table>
                </div>
                <div className="wrap_bottom">
                    <button className="comm_btn_round" onClick={closePopUp}>닫기</button>
                    <button className="comm_btn_round fill" onClick={editComment}>보내기</button>
                </div>
            </div>
        </>
    );
}

export default EditCommentPopUp;
