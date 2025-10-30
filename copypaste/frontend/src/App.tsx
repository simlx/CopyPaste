import { useState } from "react";
import "./App.css";
import { PressAltTab, PressCtrlV } from "../wailsjs/go/main/App";

function App() {
  const [texts, setTexts] = useState(Array(8).fill(""));
  const [copied, setCopied] = useState(Array(8).fill(false));

  const copy = (index: number) => {
    navigator.clipboard
      .writeText(texts[index])
      .then(() => {
        const newCopied = [...copied];
        newCopied[index] = true;
        setCopied(newCopied);

        setTimeout(() => {
          const resetCopied = [...newCopied];
          resetCopied[index] = false;
          setCopied(resetCopied);
        }, 1000);
      })
      .catch((err) => console.error(err));
  };

  const copy_paste = (index: number) => {
    navigator.clipboard.writeText(texts[index]);
    PressAltTab();
    setTimeout(() => {
      PressCtrlV();
    }, 200);
  };

  const handleChange = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  return (
    <div id="App">
      {Array.from({ length: 8 }).map((_, index) => (
        <table
          key={index}
          style={{
            width: "100%",
            height: "100%",
            borderWidth: "1px",
            marginTop: "9px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: "80%", position: "relative" }}>
                <textarea
                  value={texts[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  style={{
                    width: "98%",
                    height: "40px",
                    wordWrap: "break-word",
                    resize: "none",
                    backgroundColor: "#000040",
                    color: "#E0E0E0",
                  }}
                />
                {copied[index] && (
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    ✔
                  </span>
                )}
              </td>
              <td>
                <div>
                  <button
                    style={{ width: "100px" }}
                    onClick={() => copy(index)}
                  >
                    Copy
                  </button>
                  <button
                    style={{ width: "100px" }}
                    onClick={() => copy_paste(index)}
                  >
                    Copy & Paste
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default App;
