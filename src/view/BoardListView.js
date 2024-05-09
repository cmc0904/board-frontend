import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import PageNation from "../component/paging/PageNation";
import BoardItem from "../component/board/item/BoardItem";

// 팝업
import AttachedFilePopup from "../popup/AttachedFileListPopup";
import SendEmailPopup from "../popup/SendEmailPopup";
import CheckReadPermissionPopUp from "../popup/CheckReadPermissionPopup";

function BoardListView() {

    const [boardData, setBoardData] = useState([])
    const [notices, setNotices] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    /* 파일 리스트 팝업 */
    const [fileListPopUp, setFileListPopUp] = useState([]);
    const [isFileListPopUpOn, setIsFileListPopUpOn] = useState(false);

    /* 이메일 전송 팝업 */
    const [sendEmailAddress, setSendEmailAddress] = useState("");
    const [isSendEmailPopUpOn, setIsSendEmailPopUpOn] = useState(false);

    /* 비공개글 팝업 */
    const [privateArticleBoardIdx, setPrivateArticleBoardIdx] = useState("");
    const [isPrivateArticlePopupOn, setIsPrivateArticlePopupOn] = useState(false);

    // 파일 리스트 팝업 닫기
    const closeFileListPopUp = () => {
        setIsFileListPopUpOn(false);
        setFileListPopUp([])
    }

    // 파일 리스트 팝업 열기
    const getFileNameForFileListPopup = async (boardIdx) => {
        try {
            const res = await axios.get(`http://localhost:1000/api/board/getFileNamesByBoardIdx?boardIdx=${boardIdx}`);
            setFileListPopUp(res.data)
            setIsFileListPopUpOn(true)
        } catch (e) {
            console.log(e)
        }
    }

    // 이메일 전송 팝업 닫기
    const closeEmailPopUp = () => {
        setIsSendEmailPopUpOn(false);
    }

    // 이메일 전송 팝업 열기
    const openSendEmailPopup = (email) => {
        setSendEmailAddress(email)
        setIsSendEmailPopUpOn(true);
    }

    // 이메일 전송 팝업 닫기
    const closeCheckPasswordPopup = () => {
        setIsPrivateArticlePopupOn(false);
    }

    // 이메일 전송 팝업 열기
    const openCheckPasswordPopup = () => {
        setIsPrivateArticlePopupOn(true);
    }

    useEffect(() => {
        getNotices();
        getBoards();
    }, [])

    useEffect(() => {
        getBoards();
    }, [currentPage])

    const getBoards = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/board/getBoards?currentPage=${currentPage}`);
            console.log(res.data)
            setBoardData(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getNotices = async () => {
        try {
            const res = await axios.get("http://localhost:1000/api/board/getNotice");
            setNotices(res.data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div id="WrapContainer">

            <div className="container">
                <div className="wrap_tit">
                    <h2 className="tit_cont">자유게시판</h2>
                    <div className="ta_r">총 갯수 <strong className="fc_p">{boardData.count}</strong>건 </div>
                </div>

                <table className="tbl_board">
                    <colgroup>
                        <col style={{ "width": "5%" }} />
                        <col />
                        <col style={{ "width": "10%" }} />
                        <col style={{ "width": "10%" }} />
                        <col style={{ "width": "8%" }} />
                        <col style={{ "width": "7%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">제목</th>
                            <th scope="col">첨부파일</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일</th>
                            <th scope="col">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((item, index) => (
                            <BoardItem item={item} popup></BoardItem>
                        ))}

                        {boardData.boardData && boardData.boardData.map((item, index) => (
                            <BoardItem item={item} index={index} getFilePopUpData={getFileNameForFileListPopup} openSendEmailPopup={openSendEmailPopup} openCheckPasswordPopup={openCheckPasswordPopup}></BoardItem>
                        ))}


                    </tbody>
                </table>


                <div className="comm_paging_btn">
                    <PageNation
                        count={boardData.count}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <div className="flo_side right">
                        <Link to="/boardWrite">
                            <button className="comm_btn_round fill">글쓰기</button>
                        </Link>
                    </div>
                </div>



                <div className="box_search">
                    등록일
                    <input type="date" className="comm_inp_date ml_5" />
                    ~
                    <input type="date" className="comm_inp_date" />
                    <select className="comm_sel ml_10">
                        <option>제목</option>
                        <option>제목+내용</option>
                        <option>작성자</option>
                    </select>
                    <input type="text" className="comm_inp_text" style={{ "width": "300px%" }} />
                    <button className="comm_btn fill">검색</button>
                </div>

            </div>


            {isFileListPopUpOn &&
                <>
                    <div class="dimmed"></div>
                    <AttachedFilePopup
                        closeFileListPopUp={closeFileListPopUp}
                        boardIdx={1}
                        filesName={fileListPopUp} />
                </>
            }

            {isSendEmailPopUpOn &&
                <>
                    <div class="dimmed"></div>
                    <SendEmailPopup
                        closeSendEmailPopup={closeEmailPopUp}
                        email={sendEmailAddress} />
                </>
            }

            {isPrivateArticlePopupOn &&
                <>
                    <div class="dimmed"></div>
                    <CheckReadPermissionPopUp closePopup={closeCheckPasswordPopup}></CheckReadPermissionPopUp>
                </>
            }

        </div>
    );
}

export default BoardListView;
