import { useNavigate  } from 'react-router-dom';

// import logo from './logo.svg';
function BoardItem({ item, index, getFilePopUpData, openSendEmailPopup, openCheckPasswordPopup }) {

  const navigate = useNavigate();

  // 클릭한 게시판이 비공개 글인지 아닌지 확인해서 비공개글 이라면 팝업을 띄우고, 아니면 게시판 상세페이지로 이동.
  const checkIsPrivatePage = () => {
    if(item.isPrivate === 1) {
      openCheckPasswordPopup();
    } else {
      navigate(`/board/${item.boardIdx}`);
    }
  }

  return (
    <tr>
      <td>{index}</td>
      <td className="ta_l">
        <a className="link_title" href="#!" onClick={checkIsPrivatePage}>
            {item.isNotice === 1 ?
              <span className="txt_label notice">공지</span>
              :
              item.isPrivate === 1 && <span className="ico_img lock">비밀글</span>
            }
            {item.boardTitle}
        </a>
        {item.commentCount !== 0 && <span className="txt_reply">(1)</span>}
        {item.isNewBoard === 1 && <span className="ico_new">N</span>}
      </td>
      <td>
        {item.fileCount !== 0 &&
          <a class="link_file" onClick={()=>getFilePopUpData(item.boardIdx)} href="#!">
            <span class="ico_img flie">첨부파일</span>{item.fileCount}
          </a>
        }
      </td>
      <td><a className="link_writer" href="#!" onClick={()=>openSendEmailPopup(item.boardWriterEmail)}>{item.writer}</a></td>
      <td>{item.createAt.split("T")[0]}</td>
      <td>54</td>
    </tr>
  );
}

export default BoardItem;
