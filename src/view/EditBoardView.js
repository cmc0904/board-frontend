import React, { useEffect, useRef, useState } from "react";
import EditorBox from "../component/board/editor/EditorBox"; // 텍스트 Editor
import WriteFileBox from "../component/board/file/WriteFileBox"; // 파일 업로드
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BoardEditView() {
    /* 2개 하나로 합치기 */
    const fileRef = useRef(); // 파일
    const [files, setFiles] = useState([]); // 파일

    const { boardIdx } = useParams();

    const navigate = useNavigate();

    const [index, setIndex] = useState(null); // 제목
    const [title, setTitle] = useState(""); // 제목
    const [writer, setWriter] = useState(""); // 작성자
    const [password, setPassword] = useState(""); // 비밀번호
    const [email, setEmail] = useState(""); // 이메일
    const [isNotice, setIsNotice] = useState(false); // 공지사항 체크 여부
    const [isPrivate, setIsPrivate] = useState(false); // 비밀글 체크 여부
    const [content, setContent] = useState(""); // 내용

    useEffect(()=> {
        const getBoardData = async () => {
            try {
                const res = await axios.get(`http://localhost:1000/api/board/getBoardByBoardIdx?boardIdx=${boardIdx}`);
                console.log(res.data)
                setIndex(res.data.boardIdx)
                setTitle(res.data.boardTitle);
                setContent(res.data.boardArticle);
                setEmail(res.data.boardWriterEmail);
                setWriter(res.data.writer)
                setIsPrivate(res.data.isPrivate === 1)
                setIsNotice(res.data.isNotice === 1)
            } catch(e) {
                console.log(e)
            }
        }

        getBoardData();
        getAttachedFileNames();

        return() => {
            // 웹이 언마운트 될때 비공개글을 확인하기 위한 토큰 제거
            window.sessionStorage.removeItem("e_permission");
        }
    }, [])


    const getAttachedFileNames = async () => {
        try {
            const res = await axios.get(`http://localhost:1000/api/board/getFileNamesByBoardIdx?boardIdx=${boardIdx}`);
            console.log(res.data)

            setFiles(res.data)
        } catch(e) {
            console.log(e)
        }
    }

    const edit = async () => {
        try {
            try {
                const res = await axios.put("http://localhost:1000/api/board/editBoard", settingFormData());
                console.log(res.data)

                if(res.data.message === "EDIT_SUCCESSFUL") {
                    navigate("/")
                } else if (res.data.message === "EDIT_FAILED") {
                    window.alert("게시판을 수정하던 중 오류가 발생했습니다.")
                }
            } catch(e) {
                console.log(e)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const settingFormData = ()=> {
        const formData = new FormData();

        formData.append("idx", index);
        formData.append("title", title);
        formData.append("article", content);
        formData.append("writer", writer);
        formData.append("password", password);
        formData.append("email",  email);
        formData.append("isNotice", isNotice ? 1 : 0);
        formData.append("isPrivate", isPrivate ? 1 : 0);

        Array.from(fileRef.current.files).forEach((file) => {
            formData.append("files", file);
        });

        return formData;
    }

    const clearInput = ()=> {
        const con = window.confirm("수정중인 글이 있습니다. 삭제 하시겠습니까?")
        
        if(con) {
            setTitle("");
            setWriter("");
            setPassword("");
            setEmail("");
            setIsNotice(false);
            setIsPrivate(false);
            setContent("");
            const dataTransfer = new DataTransfer();
            fileRef.current.files = dataTransfer.files
            setFiles([])
            navigate(-1)
        }
    }

    // URL 을 통한 접근 방지
    axios.post(`http://localhost:1000/api/security/validateReadPermissionToken`,
        {
            ticket : window.sessionStorage.getItem("e_permission"),
            boardIdx : boardIdx
        })
    .then(res => {
        if(res.data.message === "TOKEN_WRONG") {
            return window.location.replace("/");
        }
    }).catch(e => {
        console.log(e)
    })

    return (
        <div id="WrapContainer">
            <div className="container">
                <div className="wrap_tit">
                    <h2 className="tit_cont">자유게시판</h2>
                </div>
                <div className="wrap_write">
                    <dl className="write_tit">
                        <dt>제목</dt>
                        {/* 제목 input 요소 */}
                        <dd><input type="text" className="comm_inp_text" style={{ "width": "100%" }} value={title} onChange={(e) => setTitle(e.target.value)} /></dd>
                    </dl>
                    <div className="write_info">
                        <dl className="info">
                            <dt>작성자</dt>
                            <dd><input type="text" className="comm_inp_text" style={{ "width": "80px" }} value={writer} onChange={(e) => setWriter(e.target.value)} /></dd>
                            <dt>비밀번호</dt>
                            <dd><input type="text" className="comm_inp_text" style={{ "width": "100px" }} value={password} onChange={(e) => setPassword(e.target.value)} /></dd>
                            <dt>이메일</dt>
                            <dd><input type="text" className="comm_inp_text" style={{ "width": "150px" }} value={email} onChange={(e) => setEmail(e.target.value)} /></dd>
                        </dl>

                        <dl className="side">
                            <dt>공지사항</dt>
                            <dd><label className="comm_swich"><input type="checkbox" checked={isNotice} onChange={(e) => setIsNotice(e.target.checked)} /><span className="ico_txt" /></label> </dd>
                            <dt>비밀글</dt>
                            <dd><label className="comm_swich"><input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} /><span className="ico_txt" /></label> </dd>
                        </dl>
                    </div>
                    <div className="write_cont">
                        <EditorBox setEditorContents={setContent} value={content}></EditorBox>
                    </div>
                    <div className="write_file">
                        <WriteFileBox fileRef={fileRef} selectedFiles={files} setSelectedFiles={setFiles}></WriteFileBox>
                    </div>
                </div>

                <div className="comm_paging_btn">
                    <div className="flo_side left">
                        <button className="comm_btn_round fill" onClick={clearInput}>목록</button>
                    </div>
                    <div className="flo_side right">
                        <button className="comm_btn_round" onClick={clearInput}>취소</button>
                        <button className="comm_btn_round fill" onClick={edit}>수정</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BoardEditView;