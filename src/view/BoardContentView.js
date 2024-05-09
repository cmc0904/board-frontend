import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import parse from 'html-react-parser';

function BoardContentView() {

    const { boardIdx } = useParams();

    const [boardData, setBoardData] = useState({});
    const [fileNameList, setFileNameList] = useState([]);
    const [comments, setComments] = useState([]);

    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');


    useEffect(()=>{
        getBoardData();
        getAttachedFileNames();
        getCommentsByBoardIdx();
    }, [])

    const getBoardData = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/board/getBoardByBoardIdx?boardIdx=${boardIdx}`);
            setBoardData(res.data);
        } catch(e) {
            console.log(e)
        }
    }

    const getAttachedFileNames = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/board/getFileNamesByBoardIdx?boardIdx=${boardIdx}`);
            setFileNameList(res.data);
        } catch(e) {
            console.log(e)
        }
    }


    const getCommentsByBoardIdx = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/comment/getCommentByBoardIdx?boardIdx=${boardIdx}`);
            console.log(res.data)
            setComments(res.data);
        } catch(e) {
            console.log(e)
        }
    }


    const addComment = async () => {
        try {
            const res = await axios.post(`http://localhost:1000/api/comment/addComment`,
                {
                    boardIdx : boardIdx,
                    content : content,
                    password : password
                }
            );
        } catch(e) {
            console.log(e)
        }
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
                        <dd><a href="javascript:;">{boardData.boardWriterEmail}</a></dd>
                        <dt>작성일</dt>
                        <dd>{boardData.createAt && boardData.createAt.split("T")[0]}</dd>
                        <dt>조회수</dt>
                        <dd>30</dd>
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
                                        <li><a href="javascript:;">{item}</a></li>
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
                                            <button className="comm_btn_small">삭제</button>
                                            <button className="comm_btn_small">수정</button>
                                        </span>
                                    </div>
                                    <div className="cont">
                                        {item.content}
                                    </div>
                                </li>
                            ))}
                       
                        </ul>
                    </div>
                    <form>
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
                    </form>
                </div>

                <div className="comm_paging_btn">
                    <div className="flo_side left">
                        <button className="comm_btn_round fill">목록</button>
                        <button className="comm_btn_round">삭제</button>
                    </div>
                    <div className="flo_side right">
                        <button className="comm_btn_round fill">답글</button>
                        <button className="comm_btn_round fill">수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardContentView;
