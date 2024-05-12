// import logo from './logo.svg';

import { useEffect } from "react";

function WriteFileBox({fileRef, selectedFiles, setSelectedFiles}) {

    // HTML에서 기본적으로 제공하는 레이아웃 중 input type=file 옆에 몇개 파일 선택됨 이걸 바꿈
    useEffect(()=> {
        const dataTransfer = new DataTransfer();
        Array.from(fileRef.current.files).forEach(file => {
            dataTransfer.items.add(file);
        });
        fileRef.current.files = dataTransfer.files;
    }, [fileRef])

    // 파일 선택시 실행되는 함수 (State 에 선택된 파일 저장) 
    const handleChangeFile = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    }

    // 선택된 파일을 담고 있는 배열에서 파일 객체 제거
    const cancelSelectedFile = (file) => {
        const filteredFiles = selectedFiles.filter((item) => item !== file);
        const dataTransfer = new DataTransfer();
        filteredFiles.forEach(file => {
            dataTransfer.items.add(file);
        });
        fileRef.current.files = dataTransfer.files;
        setSelectedFiles(filteredFiles);
    }

    return (
        <>
            <strong className="tit_file">
                <span className="ico_img flie">첨부파일</span> 첨부파일
            </strong>
            <div className="cont_file">
                <input
                    type="file"
                    className="comm_inp_file"
                    onChange={handleChangeFile}
                    style={{ "width": "100%" } }
                    ref={fileRef}
                    multiple
                />
                <ul className="list_file_inline mt_5">
                    {selectedFiles.map((item, index) => (
                        <li key={index}>
                            {item.name}
                            <button className="btn_ico_del" onClick={() => cancelSelectedFile(item)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default WriteFileBox;
