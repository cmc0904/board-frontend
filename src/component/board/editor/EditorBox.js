// import logo from './logo.svg';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditorBox({setEditorContents, value}) {
  return (
      <CKEditor
        style={{ height: "100%" }}
        data={value}
        editor={ClassicEditor}
        config={{
          placeholder: "내용을 입력하세요.",
        }}
        onChange={(event, editor) => {
          setEditorContents(editor.getData())
          // const data = editor.getData();
          // console.log({ event, editor, data });
        }}
      />
  );
}

export default EditorBox;
