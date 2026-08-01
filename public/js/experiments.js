document.querySelectorAll("hello-world").forEach(() => {
  console.log("Hello World!");
});

const canvas = document.querySelector("#demo-canvas");

if (canvas) {
  const context = canvas.getContext("2d");

  context.strokeRect(20, 20, 260, 110);
  context.font = "20px sans-serif";
  context.fillText("Canvas demonstration", 48, 82);
}
