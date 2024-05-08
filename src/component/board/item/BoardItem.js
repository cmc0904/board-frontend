// import logo from './logo.svg';


function BoardItem({index, data}) {
  return (
    <tr>
        <td>{index}</td>
        <td className="ta_l">
            <a className="link_title" href="javascript:;">자유게시판 제목입니다. 제목이 길어서 한 줄 이상이 되면 말 줄임이 필요합니다 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트</a>
            <span className="txt_reply">(2)</span>
            <span className="ico_new">N</span>
        </td>
        <td> </td>
        <td><a className="link_writer" href="javascript:;">홍길동</a></td>
        <td>2024-04-25</td>
        <td>5</td>
    </tr>
  );
}

export default BoardItem;
