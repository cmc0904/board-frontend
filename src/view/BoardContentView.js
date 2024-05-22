import React, { useEffect, useState } from "react";
import { Navigate, useParams, Link, useNavigate  } from "react-router-dom";
import axios from "axios";

import parse from 'html-react-parser';

import CheckReadPermissionPopUp from "../popup/CheckReadPermissionPopup";
import CommentDeletePopUp from "../popup/CommentDeletePopUp";
import EditCommentPopUp from "../popup/EditCommentPopUp";


function BoardContentView({boardIdx}) {

    //const { boardIdx } = useParams();

    const [boardData, setBoardData] = useState({});
    const [fileNameList, setFileNameList] = useState([]);
    const [comments, setComments] = useState([]);

    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');

    const [commentControl, setCommentControl] = useState({});

    const navigate = useNavigate();


    const goBack = () => {
      navigate(-1);
    };
  

    // 비밀번호 확인 팝업 (글 삭제)
    const [isPopUpOn, setIPopUpOn] = useState(false);

    const closePopUP = () => {
        setIPopUpOn(false)
    }

    // 댓글 삭제 팝업
    const [isCommentDeletePopUpOn, setIsCommentDeletePopupOn] = useState(false);

    const closeCommentDeletePopUp = () => {
        setIsCommentDeletePopupOn(false);
    }

    const openCommentDeletePopUp = (item) => {
        setCommentControl(item);
        setIsCommentDeletePopupOn(true);
    }


    // 댓글 수정 팝업
    const [isCommentUpdatePopUpOn, setIsCommentUpdatePopUpOn] = useState(false);

    const closeCommentUpdatePopUp = () => {
        setIsCommentUpdatePopUpOn(false);
    }

    const openCommentUpdatePopUp = (item) => {
        setCommentControl(item);
        setIsCommentUpdatePopUpOn(true);
    }



    // 게시판 수정
    const [isEditBoarPopUpOn, setIsEditPopUpOn] = useState(false);

    const closeEditPopUpdatePopUp = () => {
        setIsEditPopUpOn(false);
    }

    const openEditPopUpUpdatePopUp = () => {
        setIsEditPopUpOn(true);
    }


    useEffect(()=>{
        const read = async () => {
            try {
                await axios.put(`/api/board/readBoard?boardIdx=${boardIdx}`);
                getBoardData();
                getAttachedFileNames();
                getCommentsByBoardIdx();
            } catch(e) {
                console.log(e)
            }
        }
        read();
        
        return() => {
            // 웹이 언마운트 될때 비공개글을 확인하기 위한 토큰 제거
            window.sessionStorage.removeItem("r_permission");
        }
    }, [])

    const getBoardData = async () => {
        try {
            const res = await axios.get(`/api/board/getBoardByBoardIdx?boardIdx=${boardIdx}`);
            setBoardData(res.data);
        } catch(e) {
            console.log(e)
        }
    }

    const getAttachedFileNames = async () => {
        try {
            const res = await axios.get(`/api/board/getFileNamesByBoardIdx?boardIdx=${boardIdx}`);
            setFileNameList(res.data);
        } catch(e) {
            console.log(e)
        }
    }


    const getCommentsByBoardIdx = async () => {
        try {
            const res = await axios.get(`/api/comment/getCommentByBoardIdx?boardIdx=${boardIdx}`);
            setComments(res.data);
        } catch(e) {
            console.log(e)
        }
    }


    const addComment = async () => {
        try {
            if(!validation()) return;

            const res = await axios.post(`/api/comment/addComment`,
                {
                    boardIdx : boardIdx,
                    content : content,
                    password : password
                }
            );


            if(res.data.message === "UPLOAD_SUCCESSFUL") {
                getCommentsByBoardIdx();
                setContent("");
                setPassword("");
            }

        } catch(e) {
            console.log(e)
        }
    }

    const download = async (fileName) => {
        try {
            const response = await axios.get(`/api/board/fileDownload?fileName=${fileName}&boardIdx=${boardIdx}`,
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
            console.log(e)
        }
    }


    const validation = () => {
        if (content.replaceAll(" ", "").length === 0) {
            window.alert("댓글을 입력을 해주세요");
            return false;
        } else if(content.length > 300) {
            window.alert("댓글은 최대 300자 제한입니다.");
            return false;
        } else if (password.replaceAll(" ", "").length === 0) {
            window.alert("비밀번호를 입력 해주세요.");
            return false;
        } 

        return true;
    }


    return (
        <div id="WrapContainer">
            <div className="container">
                <div className="wrap_tit">
                    <h2 className="tit_cont">자유게시판</h2>
                </div>
                <div className="wrap_view">
                    <dl className="view_tit">
                        <dt>제목</dt>
                        <dd><h3 className="tit">{boardData.boardTitle}</h3> </dd>
                    </dl>
                    <dl className="view_info">
                        <dt>작성자</dt>
                        <dd>{boardData.writer}</dd>
                        <dt>이메일</dt>
                        <dd><a>{boardData.boardWriterEmail}</a></dd>
                        <dt>작성일</dt>
                        <dd>{boardData.createAt && boardData.createAt.split("T")[0]}</dd>
                        <dt>조회수</dt>
                        <dd>{boardData.boardView}</dd>
                    </dl>
                    <div className="view_cont">
                        {boardData.boardArticle && parse(boardData.boardArticle)}
                    </div>

                    {
                        boardData.fileCount !== 0 && 
                            <div className="view_file">
                                <strong className="tit_file"><span className="ico_img flie">첨부파일</span> 첨부파일</strong>
                                <ul className="list_file">
                                    {fileNameList.map((item, idx) => (
                                        <li><a onClick={() => download(item)}>{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                    }
                </div>

                <div className="wrap_reply">
                    <div className="reply_tit">
                        <strong className="tit">댓글({comments.length})</strong>
                    </div>
                    <div className="reply_cont">
                        <ul className="list_reply">
                            {comments.map((item, idx) => (
                                <li>
                                    <div className="info">
                                        <strong>사용자</strong> <span className="fc_g ml_5">{item.createAt} </span>
                                        <span className="ml_10">
                                            <button className="comm_btn_small" onClick={() => openCommentDeletePopUp(item)}>삭제</button>
                                            <button className="comm_btn_small" onClick={() => openCommentUpdatePopUp(item)}>수정</button>
                                        </span>
                                    </div>
                                    <div className="cont">
                                        {item.content}
                                    </div>
                                </li>
                            ))}
                       
                        </ul>
                    </div>
                    <div>
                        <fieldset className="blind">댓글작성</fieldset>
                        <div className="reply_write">
                            <div className="wr_cont">
                                <textarea className="comm_textarea" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                            <div className="wr_btn">
                                비밀번호 <input type="text" className="comm_inp_text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <button className="comm_btn_round fill" onClick={addComment}>등록</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="comm_paging_btn">
                    <div className="flo_side left">
                        <button className="comm_btn_round fill" onClick={goBack}>목록</button>
                        <button className="comm_btn_round" onClick={() => setIPopUpOn(true)}>삭제</button>
                    </div>
                    <div className="flo_side right">
                        {boardData.isNotice !== 1 && 
                            <Link to={`/board/reply/${boardIdx}`}>
                                <button className="comm_btn_round fill">답글</button>
                            </Link>
                        }
                        {/*<Link to = {`/board/edit/${boardIdx}`}></Link>*/}
                        <button className="comm_btn_round fill" onClick={openEditPopUpUpdatePopUp}>수정</button>
                    </div>
                </div>
            </div>

            {isPopUpOn &&
                <>
                    <div className="dimmed"></div>
                    <CheckReadPermissionPopUp closePopup={closePopUP} privateArticleBoardIdx={boardIdx} type={"DELETE_BOARD"}></CheckReadPermissionPopUp>
                </>
            }


            {isCommentDeletePopUpOn && 
                <>
                    <div className="dimmed"></div>
                    <CommentDeletePopUp closePopUp={closeCommentDeletePopUp} item={commentControl} getData={getCommentsByBoardIdx}></CommentDeletePopUp>
                </>
            }
            
            
            {
            
            isCommentUpdatePopUpOn && 
                <>
                    <div className="dimmed"></div>
                    <EditCommentPopUp closePopUp={closeCommentUpdatePopUp} item={commentControl} getData={getCommentsByBoardIdx}></EditCommentPopUp>
                </>
            }

            {isEditBoarPopUpOn &&
                <>
                    <div className="dimmed"></div>
                    <CheckReadPermissionPopUp closePopup={closeEditPopUpdatePopUp} privateArticleBoardIdx={boardIdx} type={"EDIT_BOARD"}></CheckReadPermissionPopUp>
                </>
            }


        </div>
    );
}

export default BoardContentView;
