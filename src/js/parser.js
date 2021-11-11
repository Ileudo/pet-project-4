export default class Parser {
  constructor() {
    this.headers = [];
  }

  parse() {
    const recursy = (element) => {
      element.childNodes.forEach((node) => {
        if (node.nodeName.match(/^H\d/)) this.headers.push({ tag: node.nodeName, text: node.textContent });
        recursy(node);
      });
    };
    recursy(document.body);
  }
}
