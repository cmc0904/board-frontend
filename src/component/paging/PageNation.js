import { useEffect, useState } from "react";

function PageNation({ count, currentPage, setCurrentPage }) {

    const [allPages, setAllPages] = useState([]);
    const [currentPg, setCurrentPg] = useState(1);
    const [siganl, setSignal] = useState("UP");


    useEffect(() => {
        setAllPages(Array.from({ length: Math.ceil(count / 10) }, (_, index) => index + 1));
        setCurrentPg(1);
    }, [count]);

    useEffect(() => {
        if(siganl === "UP_DOWN") {
            if(!!allPages.slice((currentPg - 1) * 5, currentPg * 5)[0]) {
                setCurrentPage(allPages.slice((currentPg - 1) * 5, currentPg * 5)[0])
            }
        } 
    }, [allPages, currentPg, setCurrentPage, siganl]);

    const clickPage = (item) => {
        setCurrentPage(item);
    };

    const next = () => {
        setSignal("UP_DOWN")
        setCurrentPg(currentPg + 1);
    };

    const previous = () => {
        setSignal("UP_DOWN")
        setCurrentPg(currentPg - 1);
    };

    const last = () => {
        setCurrentPage(allPages.length);
        setCurrentPg(Math.ceil(Math.ceil(count / 10) / 5));
        setSignal("LAST");

    };

    const first = () => {
        setCurrentPg(1);
        setCurrentPage(1)
        setSignal("FIRST");

    };

    return (
        <>
            <div className="flo_side left">
                페이지 <strong className="fc_p">{currentPage}</strong>/{allPages.length}
            </div>
            <div className="wr_paging">
                <button className="btn_page first" onClick={first}>첫 페이지</button>
                <button className="btn_page prev" onClick={previous} disabled={currentPage === 1}>◀</button>
                <span className="wr_page">
                    {allPages.slice((currentPg - 1) * 5, currentPg * 5).map((item, index) => (
                        <span
                            key={index}
                            className={`page ${item === currentPage && 'on'}`}
                            onClick={() => clickPage(item)}
                        >
                            {item}
                        </span>
                    ))}
                </span>
                <button className="btn_page next" onClick={next} disabled={currentPage === allPages.length}>▶</button>
                <button className="btn_page last" onClick={last}>마지막 페이지</button>
            </div>
        </>
    );
}

export default PageNation;
