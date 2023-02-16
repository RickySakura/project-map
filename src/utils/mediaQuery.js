// 手动媒体查询，在每一次窗口resize后都修改一次 html 的font-size
// 窗口高度，与 html 的font-szie有函数关系： fontSize = (0.1026 * window.innerHeight + 1.03)
let HtmlElement = document.querySelector("html");
const resetFontSize = () => {
  let fontSize = 0.1026 * window.innerHeight + 1.03;
  // if (fontSize >= 60) {
  //   HtmlElement.style.fontSize = `${fontSize}px`;
  // }
  HtmlElement.style.fontSize = `${fontSize}px`;

};
window.onload = resetFontSize;
window.onresize = resetFontSize;