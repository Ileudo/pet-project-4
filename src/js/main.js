import Customizator from './customizator';
import Parser from './parser';

window.addEventListener('DOMContentLoaded', () => {
  const panel = new Customizator();
  panel.render();
  const parser = new Parser();
  parser.parse();
});
