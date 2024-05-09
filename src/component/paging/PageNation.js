import { useEffect, useState } from "react";

function PageNation({ count, currentPage, setCurrentPage }) {

    const pages = Array.from({ length: Math.ceil(count / 10) }, (_, index) => index + 1);


    const clickPage = (item) => {
        setCurrentPage(item);
    };

    const firstOrLast = (firstOrLast) => {
        if (firstOrLast === "FIRST") {
            setCurrentPage(1); // 처음 페이지 이동
        } else if (firstOrLast === 'LAST') {
            setCurrentPage(pages.length); // 끝 페이지 이동
        }
    };

    const nextOrPrevious = (nextOrPrevious) => {
        if (nextOrPrevious === "NEXT") {
            setCurrentPage(currentPage  - 5);
        } else if (nextOrPrevious === 'PREVIOUS') {
            setCurrentPage(currentPage  + 5);
        }
    };

    return (
        <>
            <div className="flo_side left">
                페이지 <strong className="fc_p">{currentPage}</strong>/{pages.length}
            </div>
            <div className="wr_paging">
                    <button className="btn_page first" onClick={() => { firstOrLast("FIRST"); } }>첫 페이지</button>
                    <button className="btn_page prev" onClick={() => { nextOrPrevious("PREVIOUS"); } }>◀</button>
                    <span className="wr_page">
                        {pages.map((item, index) => (
                            <span
                                key={index}
                                className={`page ${item === currentPage && 'on'}`}
                                onClick={() => clickPage(item)}
                            >
                                {item}
                            </span>
                        ))}
                    </span>
                    <button className="btn_page next" onClick={() => { nextOrPrevious("NEXT"); } }>▶</button>
                    <button className="btn_page last" onClick={() => { firstOrLast("LAST"); } }>마지막 페이지</button>
            </div>
        </>
    );
}

export default PageNation;
