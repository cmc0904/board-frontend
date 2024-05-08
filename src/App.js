import './_css/common.css';
import Header from './component/layout/Header.js';
import BoardListView from './view/BoardListView.js';
import BoardWriteView from './view/BoardWriteView.js';

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
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
