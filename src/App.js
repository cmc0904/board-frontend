import './_css/common.css';
import Header from './component/layout/Header.js';
import BoardListView from './view/BoardListView.js';
import BoardWriteView from './view/BoardWriteView.js';




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardEditView from './view/EditBoardView.js';
import BoardReplyView from './view/BoardReplyView.js';
import BoardContentViewProtectedRouter from './route/BoardContentViewProtectedRouter.js';

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Routes>
          {/* 게시판 글 작성 */}
          <Route path="/boardWrite" element={<BoardWriteView />} />
          
          {/* 게시판 글 목록 */}
          <Route path="/" element={<BoardListView />} />

          {/* 게시판 상세 목록 */}
          <Route path="/board/:boardIdx" element={<BoardContentViewProtectedRouter/>} />

          {/* 게시판 수정 */}
          <Route path="/board/edit/:boardIdx" element={<BoardEditView/>} />

          {/* 게시판 답변 */}
          <Route path="/board/reply/:boardIdx" element={<BoardReplyView/>} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
