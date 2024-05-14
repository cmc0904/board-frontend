import { useState } from "react";

function SearchBox({ setCurrentPage, getAllBoard }) {
    const [searchType, setSearchType] = useState("TITLE");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const searchData = async () => {
        await setCurrentPage(1);
        getAllBoard(searchType, content, startDate, endDate);
        console.log("검색 `")
    }

    return (
        <div className="box_search">
            등록일
            <input type="date" className="comm_inp_date ml_5" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            ~
            <input type="date" className="comm_inp_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <select className="comm_sel ml_10" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value={"TITLE"}>제목</option>
                <option value={"TITLE_CONTENT"}>제목+내용</option>
                <option value={"WRITER"}>작성자</option>
                <option value={"DATE_ONLY"}>날짜로만 검색</option>
            </select>
            <input type="text" className="comm_inp_text" style={{ "width": "300px%" }} value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="comm_btn fill" onClick={searchData} style={{ "marginLeft": "4px" }}>검색</button>
            <button className="comm_btn fill" style={{ "marginLeft": "4px" }} onClick={() => getAllBoard("ALL_DATA")}>전체글</button>
        </div>
    );
}

export default SearchBox;
