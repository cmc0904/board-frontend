import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const BoardItem = ({ item, index, getFilePopUpData, openSendEmailPopup, openCheckPasswordPopup, searchMode, content }) => {
  const navigate = useNavigate();

  const checkIsPrivatePage = () => {
    item.isPrivate === 1 ? openCheckPasswordPopup(item.boardIdx) : navigate(`/board/${item.boardIdx}`);
  };

  const highlightContent = (title) => {
    return searchMode === "TITLE" || searchMode === "TITLE_CONTENT"
      ? title.replaceAll(content, (match) => `<em class="highlight">${match}</em>`)
      : title;
  };

  return (
    <tr>
      <td>{index}</td>
      <td className="ta_l">
        <a className="link_title" onClick={checkIsPrivatePage} style={{ marginLeft: `${(item.depth - 1) * 20}px` }}>
          {item.isNotice === 1 && <span className="txt_label notice">공지</span>}
          {item.isPrivate === 1 && <span className="ico_img lock">비밀글</span>}
          {parse(highlightContent(item.boardTitle))}
        </a>
        {item.commentCount !== 0 && <span className="txt_reply">({item.commentCount})</span>}
        {item.isNewBoard === 1 && <span className="ico_new">N</span>}
      </td>
      <td>
        {item.fileCount !== 0 && (
          <a class="link_file" onClick={() => getFilePopUpData(item.boardIdx)}><span class="ico_img flie">첨부파일</span>{item.fileCount}</a>
        )}
      </td>
      <td><a className="link_writer" onClick={() => openSendEmailPopup(item.boardWriterEmail)}>{item.writer}</a></td>
      <td>{item.createAt.split("T")[0]}</td>
      <td>{item.boardView}</td>
    </tr>
  );
};

export default BoardItem;
