import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum accusamus in, sunt cupiditate incidunt assumenda?"
  );
  const [cursorStart, setCursorStart] = useState(0);
  const [cursorEnd, setCursorEnd] = useState(0);
  const textareaRef = useRef();

  const addStyle = (type) => {
    const selectStart = textareaRef.current?.selectionStart;
    const selectEnd = textareaRef.current?.selectionEnd;
    /*     setText(
      () => text.substring(0, selectStart) + "<b>BEBE</b>" + text.substring(selectEnd)
    ); */
    const selectedText = text.substring(selectStart, selectEnd);

    if (!selectedText) return;

    const applyStyle = (type, selectedText) => {
      let formattedText = selectedText;
      let fontSize = 16;
      switch (type) {
        case "bold":
          formattedText = `<b>${selectedText}</b>`;
          break;
        case "underlined":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "increaseFontSize":
          formattedText = `<span style="font-size: ${
            fontSize * 2
          }px">${selectedText}</span>`;
          break;

        default:
          break;
      }
      return formattedText;
    };

    const textBeforeSelected = text.substring(0, selectStart);
    const textAfterSelected = text.substring(selectEnd);
    setText(
      () =>
        textBeforeSelected + applyStyle(type, selectedText) + textAfterSelected
    );
  };

  return (
    <div className="App">
      <div className="div-textarea-container">
        <div
          className="div-textarea"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </div>
      <div className="textarea">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="div-textarea"
        ></textarea>
        <button onClick={() => addStyle("bold")}>Bold</button>
        <button onClick={() => addStyle("underlined")}>Underlined</button>
        <button onClick={() => addStyle("increaseFontSize")}>FontSize+</button>
      </div>
    </div>
  );
}

export default App;
