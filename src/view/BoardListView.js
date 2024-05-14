import React, { useEffect, useState } from "react";

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
    const [fileIndex, setFileIndex] = useState();
    const [fileListPopUp, setFileListPopUp] = useState([]); // 파일 목록
    const [isFileListPopUpOn, setIsFileListPopUpOn] = useState(false); // 팝업이 열렸는지 

    /* 이메일 전송 팝업 */
    const [sendEmailAddress, setSendEmailAddress] = useState(""); // 선택한 이메일 
    const [isSendEmailPopUpOn, setIsSendEmailPopUpOn] = useState(false); // 이메일 팝업이 열렸는지

    /* 비공개글 팝업 */
    const [privateArticleBoardIdx, setPrivateArticleBoardIdx] = useState(""); // 비공개 글 인덱스 번호
    const [isPrivateArticlePopupOn, setIsPrivateArticlePopupOn] = useState(false); // 비공개 글이 열렸는지


    // 검색
    const [searchType, setSearchType] = useState("ALL_DATA");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


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
            setFileIndex(boardIdx)
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

    // 비밀번호 확인 팝업 닫기
    const closeCheckPasswordPopup = () => {
        setIsPrivateArticlePopupOn(false);
    }

    // 비밀번호 확인 팝업 열기
    const openCheckPasswordPopup = (boardIdx) => {
        setPrivateArticleBoardIdx(boardIdx)
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
            if(searchType === "ALL_DATA") {
                const res = await axios.get(`http://localhost:1000/api/board/getBoards?currentPage=${currentPage}&searchType=${searchType}&content=${content}`);
                setBoardData(res.data)

            } else{
                const res = await axios.get(`http://localhost:1000/api/board/getBoards?currentPage=${currentPage}&searchType=${searchType}&content=${content}&startDate=${startDate}&endDate=${endDate}`);
                setBoardData(res.data)

            }
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
                            <BoardItem key = {item.boardIdx} item={item} getFilePopUpData={getFileNameForFileListPopup} openSendEmailPopup={openSendEmailPopup} openCheckPasswordPopup={openCheckPasswordPopup} />
                        ))}

                        {
                            boardData.count === 0 ?
                                <tr>
                                    <td colspan="6" className="no_data">검색 결과가 없습니다.</td>
                                </tr>
                            :
                            boardData.boardData && boardData.boardData.map((item, index) => (
                                <BoardItem 
                                    key = {item.boardIdx}
                                    item={item}
                                    index={boardData.count - ((currentPage - 1) * 10 + index)}
                                    getFilePopUpData={getFileNameForFileListPopup}
                                    openSendEmailPopup={openSendEmailPopup}
                                    openCheckPasswordPopup={openCheckPasswordPopup}
                                    searchMode={boardData.type}
                                    content={content}
                                />
                            ))
                        }


                    </tbody>
                </table>


                <div className="comm_paging_btn">
                    {boardData.count > 10 && 
                    <PageNation
                        count={boardData.count}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    }
                    <div className="flo_side right">
                        <Link to="/boardWrite">
                            <button className="comm_btn_round fill">글쓰기</button>
                        </Link>
                    </div>
                </div>


                <div className="box_search">
                    등록일
                    <input type="date" className="comm_inp_date ml_5" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
                    ~
                    <input type="date" className="comm_inp_date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
                    <select className="comm_sel ml_10" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option>검색모드</option>
                        <option value={"TITLE"}>제목</option>
                        <option value={"TITLE_CONTENT"}>제목+내용</option>
                        <option value={"WRITER"}>작성자</option>
                        <option value={"DATE_ONLY"}>날짜로만 검색</option>
                    </select>
                    <input type="text" className="comm_inp_text" style={{ "width": "300px%" }} value={content} onChange={(e)=>setContent(e.target.value)}/>
                    <button className="comm_btn fill" onClick={() => {setCurrentPage(1); getBoards()}} style={{"marginLeft" : "4px"}}>검색</button>
                    <button className="comm_btn fill" style={{"marginLeft" : "4px"}} onClick={() => {setCurrentPage(1); setSearchType("ALL_DATA"); getBoards()}}>전체글</button>
                </div>
                

            </div>


            {isFileListPopUpOn &&
                <>
                    <div className="dimmed"></div>
                    <AttachedFilePopup
                        closeFileListPopUp={closeFileListPopUp}
                        boardIdx={fileIndex}
                        filesName={fileListPopUp} />
                </>
            }

            {isSendEmailPopUpOn &&
                <>
                    <div className="dimmed"></div>
                    <SendEmailPopup
                        closeSendEmailPopup={closeEmailPopUp}
                        email={sendEmailAddress} />
                </>
            }

            {isPrivateArticlePopupOn &&
                <>
                    <div className="dimmed"></div>
                    <CheckReadPermissionPopUp closePopup={closeCheckPasswordPopup} privateArticleBoardIdx={privateArticleBoardIdx} type={"READ_PRIVATE_ARTICLE"}></CheckReadPermissionPopUp>
                </>
            }

        </div>
    );
}

export default BoardListView;
