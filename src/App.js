import './_css/common.css';
import Header from './component/layout/Header.js';
import BoardListView from './view/BoardListView.js';
import BoardWriteView from './view/BoardWriteView.js';
import BoardContentView from './view/BoardContentView.js';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
          <Route path="/board/:boardIdx" element={<BoardContentView />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
