import { useState } from "react";

import webpage from "grapesjs-preset-webpage";
import "grapesjs/dist/css/grapes.min.css";
import { GrapesjsReact } from "grapesjs-react";

function App() {
  const [editor, setEditor] = useState(null);

  const onInit = (editor) => {
    setEditor(editor);
    console.log("editor", editor);
  };

  const onClick = () => {
    if (!editor) return;

    const pages = editor.Pages.getAll().map((page) => {
      const component = page.getMainComponent();
      return {
        page,
        html: editor.getHtml({ component }),
        css: editor.getCss({ component }),
      };
    });

    console.log("pages", pages);

    const projectData = editor.getProjectData();
    console.log("projectData", projectData);
  };

  return (
    <>
      <GrapesjsReact id="grapesjs-react" plugins={[webpage]} onInit={onInit} />
      <button onClick={onClick}>Console log HTML/CSS</button>
    </>
  );
}

export default App;
