class HelloWorld extends HTMLElement {
  connectedCallback() {
    console.log("Hello World!");
  }
}

customElements.define("hello-world", HelloWorld);

const canvas = document.querySelector("#demo-canvas");

if (canvas) {
  const context = canvas.getContext("2d");

  context.strokeRect(20, 20, 260, 110);
  context.font = "20px sans-serif";
  context.fillText("Canvas demonstration", 48, 82);
}
