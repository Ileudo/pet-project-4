export default class Customizator {
  constructor() {
    this.btnBLock = document.createElement('div');
    this.colorPicker = document.createElement('input');

    this.btnBLock.addEventListener('click', (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
  }

  onScaleChange(e) {
    let scale;
    if (e.target.value) {
      scale = Number(e.target.value.replace(/x/g, ''));
    }

    function recursy(element) {
      element.childNodes.forEach((node) => {
        if (node.nodeName === '#text') {
          if (!node.parentNode.dataset.fz) {
            const value = window.getComputedStyle(node.parentNode).fontSize;
            node.parentNode.setAttribute('data-fz', value.replace(/\D/g, ''));
          }

          node.parentNode.style.fontSize = node.parentNode.dataset.fz * scale + 'px';
        } else {
          recursy(node);
        }
      });
    }

    recursy(document.body);
  }

  onColorChange(e) {
    document.body.style.backgroundColor = e.target.value;
  }

  render() {
    const panel = document.createElement('div');
    const scaleInputS = document.createElement('input');
    const scaleInputM = document.createElement('input');

    panel.classList.add('panel');
    this.btnBLock.classList.add('scale');
    scaleInputS.classList.add('scale_btn');
    scaleInputM.classList.add('scale_btn');
    this.colorPicker.classList.add('color');

    scaleInputS.setAttribute('type', 'button');
    scaleInputM.setAttribute('type', 'button');
    scaleInputS.setAttribute('value', '1x');
    scaleInputM.setAttribute('value', '1.5x');
    this.colorPicker.setAttribute('type', 'color');
    this.colorPicker.setAttribute('value', '#ffffff');

    document.body.append(panel);
    panel.append(this.btnBLock, this.colorPicker);
    this.btnBLock.append(scaleInputS, scaleInputM);
  }
}
