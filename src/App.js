import { useState } from "react";

import gjsWebpage from "grapesjs-preset-webpage";
import gjsBlock from "grapesjs-blocks-basic";
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
      <GrapesjsReact
        id="grapesjs-react"
        plugins={[gjsWebpage, gjsBlock]}
        onInit={onInit}
        assetManager={{
          embedAsBase64: false,
          upload: "https://endpoint/upload/assets", // Example endpoint
          customFetch: async (url, options) => {
            // const response = await axios(url, { data: options.body })

            // Need to return Image URL array with "data" key.
            const response = {
              data: ["https://placehold.jp/2a9891/ffffff/200x200.png"],
            };
            return response;
          },
        }}
      />
      <button onClick={onClick}>Console log HTML/CSS</button>
    </>
  );
}

export default App;
