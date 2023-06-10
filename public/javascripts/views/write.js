document.addEventListener("DOMContentLoaded", (event) => {
  // 취소 버튼
  const goBackBtn = document.getElementById("goBackBtn");

  const onClickGoBackBtn = (event) => {
    window.history.go(-1);
  };

  goBackBtn.addEventListener("click", onClickGoBackBtn);

  // EditorJS
  let editor = new EditorJS({
    holder: "textEditor",
    /**
     * Tools list
     */
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: "Enter a header",
          levels: [1, 2, 3],
          defaultLevel: 2,
        },
      },
      image: {
        class: ImageTool,
        config: {
          uploader: {
            uploadByFile(file) {
              const formData = new FormData();
              formData.append("file", file);

              return axios
                .post("/upload", formData)
                .then((response) => {
                  return {
                    success: 1,
                    file: {
                      url: response.data.url,
                      // Include any other image data you want to store
                    },
                  };
                })
                .catch((error) => {
                  console.error(
                    "파일로 이미지를 업로드하기에 실패했습니다.",
                    error
                  );
                  return {
                    success: 0,
                    file: null,
                  };
                });
            },
            uploadByUrl(url) {
              return axios
                .post("/upload-url", { url })
                .then((response) => {
                  return {
                    success: 1,
                    file: {
                      url: response.data.url,
                      // Include any other image data you want to store
                    },
                  };
                })
                .catch((error) => {
                  console.error(
                    "URL로 이미지를 업로드하기에 실패했습니다.",
                    error
                  );
                  return {
                    success: 0,
                    file: null,
                  };
                });
            },
          },
        },
      },
      list: List,
      quote: Quote,
      marker: Marker,
      code: CodeTool,
      inlineCode: InlineCode,
      linkTool: LinkTool,
      table: Table,
    },
    i18n: {
      /**
       * @type {I18nDictionary}
       */
      messages: {
        ui: {
          blockTunes: {
            toggler: {
              "Click to tune": "클릭해서 조정하기",
              "or drag to move": "드래그해서 움직이기",
            },
          },
          inlineToolbar: {
            converter: {
              "Convert to": "변경하기",
            },
          },
          toolbar: {
            toolbox: {
              Add: "추가",
            },
          },
        },
        toolNames: {
          Text: "Text",
          Heading: "Heading",
          List: "List",
          Quote: "Quote",
          Code: "Code",
          Table: "Table",
          Link: "Link",
          Marker: "Marker",
          Bold: "Bold",
          Italic: "Italic",
          InlineCode: "InlineCode",
        },
        tools: {
          link: {
            "Add a link": "링크 추가",
          },
        },
        blockTunes: {
          delete: {
            Delete: "삭제",
          },
          moveUp: {
            "Move up": "위로 올리기",
          },
          moveDown: {
            "Move down": "아래로 내리기",
          },
        },
      },
    },
  });
});
