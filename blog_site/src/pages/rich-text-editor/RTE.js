import "./RTE.css";

import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { BiLinkAlt, BiUnlink } from "react-icons/bi";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaIndent,
  FaOutdent,
} from "react-icons/fa";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import {
  TbBold,
  TbItalic,
  TbStrikethrough,
  TbSubscript,
  TbSuperscript,
  TbUnderline,
} from "react-icons/tb";
import { useEffect, useState } from "react";

export const RTE = () => {
  const [highlighter, setHighlighter] = useState(false);
  let optionsButtons = document.querySelectorAll(".option-button");
  let advancedOptionButton = document.querySelectorAll(".adv-option-button");
  let fontName = document.getElementById("fontName");
  let fontSizeRef = document.getElementById("fontSize");
  let writingArea = document.getElementById("text-input");
  let linkButton = document.getElementById("createLink");
  let alignButtons = document.querySelectorAll(".align");
  let spacingButtons = document.querySelectorAll(".spacing");
  let formatButtons = document.querySelectorAll(".format");
  let scriptButtons = document.querySelectorAll(".script");
  //List of fontlist
  let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];
  //Initial Settings
  const initializer = () => {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists, undo,redo since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
    //create options for font names
    // fontList.map((value) => {
    //   let option = document.createElement("option");
    //   option.value = value;
    //   option.innerHTML = value;
    //   fontName.appendChild(option);
    // });
    // //fontSize allows only till 7
    // for (let i = 1; i <= 7; i++) {
    //   let option = document.createElement("option");
    //   option.value = i;
    //   option.innerHTML = i;
    //   fontSizeRef.appendChild(option);
    // }
    // //default size
    // fontSizeRef.value = 3;
  };
  // //main logic
  // const modifyText = (command, defaultUi, value) => {
  //   //execCommand executes command on selected text
  //   document.execCommand(command, defaultUi, value);
  // };
  // //For basic operations which don't need value parameter
  // optionsButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     modifyText(button.id, false, null);
  //   });
  // });
  // //options that require value parameter (e.g colors, fonts)
  // advancedOptionButton.forEach((button) => {
  //   button.addEventListener("change", () => {
  //     modifyText(button.id, false, button.value);
  //   });
  // });
  // //link
  // linkButton.addEventListener("click", () => {
  //   let userLink = prompt("Enter formatHighlighter URL");
  //   //if link has http then pass directly else add https
  //   if (/http/i.test(userLink)) {
  //     modifyText(linkButton.id, false, userLink);
  //   } else {
  //     userLink = "http://" + userLink;
  //     modifyText(linkButton.id, false, userLink);
  //   }
  // });
  //Highlight clicked button
  const highlighter1 = (className, needsRemoval) => {
    className.forEach((button) => {
      button.addEventListener("click", () => {
        //needsRemoval = true means only one button should be highlight and other would be normal
        if (needsRemoval) {
          let alreadyActive = false;
          //If currently clicked button is already active
          if (button.classList.contains("active")) {
            alreadyActive = true;
          }
          //Remove highlight from other buttons
          highlighterRemover(className);
          if (!alreadyActive) {
            //highlight clicked button
            button.classList.add("active");
          }
        } else {
          //if other buttons can be highlighted
          button.classList.toggle("active");
        }
      });
    });
  };
  const highlighterRemover = (className) => {
    className.forEach((button) => {
      button.classList.remove("active");
    });
  };
  const formatHighlighter = (e) => {
    e.currentTarget.classList.contains("format");
    e.currentTarget.classList.toggle("active");
    console.log(e.currentTarget.classList);
  };
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const b = (e) => {
    scriptButtons.forEach((button) => {
      if (e.currentTarget == button) {
      } else {
      }
    });
  };
  useEffect(() => {
    // initializer();
  }, []);
  return (
    <div className="main-RTE-page">
      <div className="RTE-container">
        <div className="RTE-options">
          <button
            onClick={formatHighlighter}
            title="bold"
            id="bold"
            className="option-button format"
          >
            <TbBold />
          </button>
          <button
            onClick={formatHighlighter}
            title="italic"
            id="italic"
            className="option-button format"
          >
            <TbItalic />
          </button>
          <button
            onClick={formatHighlighter}
            title="underline"
            id="underline"
            className="option-button format"
          >
            <TbUnderline />
          </button>
          <button
            onClick={formatHighlighter}
            title="strikethrough"
            id="strikethrough"
            className="option-button format"
          >
            <TbStrikethrough />
          </button>
          <button
            onClick={b}
            title="subscript"
            id="subscript"
            className="option-button script"
          >
            <TbSubscript />
          </button>
          <button
            onClick={b}
            title="superscript"
            id="superscript"
            className="option-button script"
          >
            <TbSuperscript />
          </button>
          {/* ---- List ---- */}
          <button
            title="orderedList"
            id="orderedList"
            className="option-button"
          >
            <GoListOrdered />
          </button>
          <button
            title="unorderedList"
            id="unorderedList"
            className="option-button"
          >
            <GoListUnordered />
          </button>
          {/* ---- Undo/Redo ---- */}
          <button title="undo" id="undo" className="option-button">
            <AiOutlineUndo />
          </button>
          <button title="redo" id="redo" className="option-button">
            <AiOutlineRedo />
          </button>

          {/* ---- Link ---- */}
          <button title="Link" id="Link" className="option-button">
            <BiLinkAlt />
          </button>
          <button title="unLink" id="unLink" className="option-button">
            <BiUnlink />
          </button>

          {/* ---- Alignment ---- */}
          <button
            title="alignLeft"
            id="alignLeft"
            className="option-button align"
          >
            <FaAlignLeft />
          </button>
          <button
            title="alignCenter"
            id="alignCenter"
            className="option-button align"
          >
            <FaAlignCenter />
          </button>
          <button
            title="alignRight"
            id="alignRight"
            className="option-button align"
          >
            <FaAlignRight />
          </button>
          <button
            title="justifyAlign"
            id="justifyAlign"
            className="option-button align"
          >
            <FaAlignJustify />
          </button>
          <button title="indent" id="indent" className="option-button spacing">
            <FaIndent />
          </button>
          <button
            title="outdent"
            id="outdent"
            className="option-button spacing"
          >
            <FaOutdent />
          </button>

          {/* ---- Headings ---- */}
          <select
            title="headings"
            id="formatBlock"
            className="adv-option-button"
          >
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
          </select>

          {/* ---- Font ---- */}
          <select
            title="fontName"
            id="fontName"
            className="adv-option-button"
          ></select>
          <select
            title="fontSize"
            id="fontSize"
            className="adv-option-button"
          ></select>

          {/* ---- Color ---- */}
          <div className="input-wrapper">
            <input
              title="foreColor"
              type="color"
              id="foreColor"
              className="adv-option-button"
            />
            <label htmlFor="foreColor"> Font Color</label>
          </div>
          <div className="input-wrapper">
            <input
              title="backColor"
              type="color"
              id="backColor"
              className="adv-option-button"
            />
            <label htmlFor="backColor"> HighLight Color</label>
          </div>
        </div>
        <div id="text-input" contentEditable="true"></div>
      </div>
    </div>
  );
};
