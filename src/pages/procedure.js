import React from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";

const BlogRenderer=({ htmlContent }) =>{
  // Replace <div class="before-after"> with React component
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const beforeAfterBlocks = doc.querySelectorAll(".before-after");

  beforeAfterBlocks.forEach((block, i) => {
    const before = block.querySelector("img:nth-child(1)").src;
    const after = block.querySelector("img:nth-child(2)").src;

    block.outerHTML = `<div id="before-after-${i}"></div>`; // Placeholder
    setTimeout(() => {
      const container = document.getElementById(`before-after-${i}`);
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(<BeforeAfterSlider before={before} after={after} />);
      }
    }, 0);
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />
  );
}
export default Procedure;