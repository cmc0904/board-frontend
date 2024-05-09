
function CheckReadPermissionPopUp({closePopup}) {
    return (
        <div class="comm_popup">
            <div class="wrap_tit">
                <span class="tit_pop">비밀번호 확인</span>
                <button type="button" class="btn_close" onClick={closePopup}>닫기</button>
            </div>
            <div class="wrap_cont">
                비밀번호 <input type="text" class="comm_inp_text" style={{ "width": "100%" }} />
            </div>
            <div class="wrap_bottom">
                <button class="comm_btn_round" onClick={closePopup}>닫기</button>
                <button class="comm_btn_round fill">확인</button>
            </div>
        </div>
    );
}

export default CheckReadPermissionPopUp;
