
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckReadPermissionPopUp({closePopup, privateArticleBoardIdx, type}) {

    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const checkPassword = async ()=> {
        const res = await axios.post("/api/security/generateReadPermissionToken", {
            boardIdx : privateArticleBoardIdx,
            password : password
        });

        // 비밀번호가 맞을 경우 게시판 읽기 권한이 부여된 토큰을 세션에 저장
        if(res.data.message !== "PASSWORD_WRONG") {
            window.sessionStorage.setItem("r_permission", res.data.message);
            closePopup();
            navigate(`/board/${privateArticleBoardIdx}`);
        } else {
            window.alert("비밀번호가 틀렸습니다.")
        }


    }


    const checkBoardEditPassword = async ()=> {
        const res = await axios.post("/api/security/generateReadPermissionToken", {
            boardIdx : privateArticleBoardIdx,
            password : password
        });

        // 비밀번호가 맞을 경우 게시판 읽기 권한이 부여된 토큰을 세션에 저장
        if(res.data.message !== "PASSWORD_WRONG") {
            window.sessionStorage.setItem("e_permission", res.data.message);
            closePopup();
            navigate(`/board/edit/${privateArticleBoardIdx}`);
        } else {
            window.alert("비밀번호가 틀렸습니다.")
        }


    }

    const deleteBoard = async () => {
        try {
            const res = await axios.delete(
                '/api/board/deleteBoard',
                {
                    data: {
                        boardIdx: privateArticleBoardIdx,
                        password: password
                    }
                }
            );
    

            if(res.data.message === "PASSWORD_WRONG") {
                window.alert("비밀번호가 틀렸습니다.")
            } else if(res.data.message === "BOARD_DELETED") {
                navigate(-1);
            }  else if (res.data.message === "DELETE_ERROR") {
                window.alert(`답변 : ${res.data.boardErrorCount}건, 댓글 : ${res.data.commentErrorCount}건으로 삭제가 불가능합니다.`)
            }
        } catch(e) {
            console.log(e);
        }
    };
    


    // 비밀번호를 확인해서 어떠한 기능?이 실행되는게 한 두개가 아니기에 타입에 따라서 분기적으로 처리
    const buttonHandler = ()=> {
        if(password.replaceAll(" ", "").length === 0) return window.alert("비밀번호를 입력해주세요")

        if(type === "READ_PRIVATE_ARTICLE") {
            checkPassword()
        } else if(type === "DELETE_BOARD") {
            deleteBoard();
        } else if(type === "EDIT_BOARD") {
            checkBoardEditPassword()
        }
    }

    return (
        <div className="comm_popup">
            <div className="wrap_tit">
                <span className="tit_pop">비밀번호 확인</span>
                <button type="button" className="btn_close" onClick={closePopup}>닫기</button>
            </div>
            <div className="wrap_cont">
                비밀번호 <input type="text" className="comm_inp_text" style={{ "width": "100%" }} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="wrap_bottom">
                <button className="comm_btn_round" onClick={closePopup}>닫기</button>
                <button className="comm_btn_round fill" onClick={buttonHandler}>확인</button>
            </div>
        </div>
    );
}

export default CheckReadPermissionPopUp;
