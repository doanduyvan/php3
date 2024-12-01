import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class MyCustomBase64Adapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({
              default: reader.result,
            });
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    console.log("Upload aborted");
  }
}

function ContentEditor({ content, setContent }) {
  const editorConfiguration = {
    placeholder: "Nhập nội dung bài viết...",
    extraPlugins: [CustomPlugin], // Thêm plugin Base64UploadAdapter
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "imageUpload",
      "blockQuote",
      "undo",
      "redo",
    ],
  };

  // Tạo plugin Base64UploadAdapter
  function CustomPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyCustomBase64Adapter(loader);
    };
  }

  return (
    <div className="addpost mb-4">
      <label
        htmlFor="content"
        className="block text-lg font-medium text-gray-700"
      >
        Nội dung bài viết
      </label>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        config={editorConfiguration}
      />
    </div>
  );
}

export default ContentEditor;
