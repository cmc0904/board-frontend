import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SearchBox({ setCurrentPage, setSearchType, setContent, setStartDate, setEndDate }) {
    
    const [searchTypeTemp, setSearchTypeTemp] = useState("TITLE");
    const [contentTemp, setContentTemp] = useState("");
    const [startDateTemp, setStartDateTemp] = useState("");
    const [endDateTemp, setEndDateTemp] = useState("");
    
    const [isSearched, setIsSearched] = useState(false);
    
    let state = useSelector((state) => { return state.boardList })
    useEffect(()=> {

        setSearchTypeTemp(state.searchMode);
        setContentTemp(state.content);
        setStartDateTemp(state.startDate);
        setEndDateTemp(state.endDate);
        setIsSearched(state.searchMode !== "ALL_DATA");

    }, [])




    const searchData = async () => {
        setCurrentPage(1);
        setSearchType(searchTypeTemp);
        setContent(contentTemp);
        setStartDate(startDateTemp);
        setEndDate(endDateTemp);
        setIsSearched(true);
    }

    const allData = async () => {
        setCurrentPage(1);
        setSearchType("ALL_DATA");
        setContent("");
        setStartDate("");
        setEndDate("");;
        setIsSearched(false)
    }

    return (
        <div className="box_search">
            등록일
            <input type="date" className="comm_inp_date ml_5" value={startDateTemp} onChange={(e) => setStartDateTemp(e.target.value)} />
            ~
            <input type="date" className="comm_inp_date" value={endDateTemp} onChange={(e) => setEndDateTemp(e.target.value)} />
            <select className="comm_sel ml_10" value={searchTypeTemp} onChange={(e) => setSearchTypeTemp(e.target.value)}>
                <option value={"TITLE"}>제목</option>
                <option value={"TITLE_CONTENT"}>제목+내용</option>
                <option value={"WRITER"}>작성자</option>
                <option value={"DATE_ONLY"}>등록일로 검색</option>
            </select>
            <input type="text" className="comm_inp_text" style={{ "width": "300px%" }} value={contentTemp} onChange={(e) => setContentTemp(e.target.value)} />
            <button className="comm_btn fill" onClick={searchData} style={{ "marginLeft": "4px" }}>검색</button>

            {isSearched && 
                <button className="comm_btn fill" style={{ "marginLeft": "4px" }} onClick={allData}>전체글</button>
            }
        </div>
    );
}

export default SearchBox;
