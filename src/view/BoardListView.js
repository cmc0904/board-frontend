import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

function BoardListView() {

    const [boards, setBoards] = useState([])

    useEffect(()=>{
        getBoards();
    }, [])

    const getBoards = async () => {
        try {
            const res = await axios.get("http://localhost:1000/api/board/getBoards?currentPage=1&searchType=1&startDate=2024-05-08&endDate=2024-05-09&searchContent=asd");
            console.log(res.data)
            setBoards(res.data)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div id="WrapContainer">
            <div className="container">
                <div className="wrap_tit">
                    <h2 className="tit_cont">자유게시판</h2>
                    <div className="ta_r">총 갯수 <strong className="fc_p">200</strong>건 </div>
                </div>

                <table className="tbl_board">
                    <colgroup>
                        <col style={{"width" : "5%"}} /> 
                        <col />
                        <col style={{"width" : "10%"}} />
                        <col style={{"width" : "10%"}} />
                        <col style={{"width" : "8%"}} />
                        <col style={{"width" : "7%"}} />
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
                        {boards.map((item, index) => (
                            <tr>
                                <td>196</td>
                                <td className="ta_l">
                                    <a className="link_title" href="javascript:;">
                                        {item.isNotice && 
                                            <span className="txt_label notice">공지</span>
                                        }
                                        {item.isPrivate && 
                                            <span className="ico_img lock">비밀글</span>
                                        }
                                        {item.boardTitle}
                                    </a>
                                    <span className="txt_reply">(1)</span>
                                    {item.isNewBoard ? <span className="ico_new">N</span>  : <span></span>}

                                </td>
                                <td>
                                    <a className="link_file" href="javascript:;">
                                        {item.fileCount !== 0 && 
                                            <span><span className="ico_img flie">첨부파일</span>{item.fileCount}</span>
                                        }
                                        
                                    </a>
                                </td>
                                <td><a className="link_writer" href="javascript:;">{item.writer}</a></td>
                                <td>{item.createAt.split("T")[0]}</td>
                                <td>54</td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>


                <div className="comm_paging_btn">
                    <div className="flo_side left">
                        페이지 <strong className="fc_p">3</strong>/20
                    </div>

                    <div className="wr_paging">
                        <button className="btn_page first" disabled="disabled">첫 페이지</button>
                        <button className="btn_page prev" disabled="disabled">이전</button>
                        <span className="wr_page">
                            <span className="page">1</span>
                            <span className="page">2</span>
                            <strong className="page on">3</strong>
                            <span className="page">4</span>
                            <span className="page">5</span>
                            <span className="page">6</span>
                            <span className="page">7</span>
                            <span className="page">8</span>
                            <span className="page">9</span>
                            <span className="page">10</span>
                        </span>
                        <button className="btn_page next">다음</button>
                        <button className="btn_page last">마지막 페이지</button>
                    </div>

                    <div className="flo_side right">
                        <button className="comm_btn_round fill">글쓰기</button>
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
                    <input type="text" className="comm_inp_text" style={{"width" : "300px%"}} />
                    <button className="comm_btn fill">검색</button>
                </div>


            </div>
        </div>
    );
}

export default BoardListView;
