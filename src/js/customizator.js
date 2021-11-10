export default class Customizator {
  constructor() {
    this.btnBLock = document.createElement('div');
    this.colorPicker = document.createElement('input');
    this.clear = document.createElement('div');
    this.scale = localStorage.getItem('scale') || 1;
    this.color = localStorage.getItem('color') || '#ffffff';

    this.btnBLock.addEventListener('click', (e) => this.onScaleChange(e));
    this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    this.clear.addEventListener('click', () => this.reset());
  }

  injectStyle() {
    const style = document.createElement('style');
    style.innerHTML = `
        .panel {
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: fixed;
            top: 10px;
            right: 0;
            border: 1px solid rgba(0,0,0, .2);
            box-shadow: 0 0 20px rgba(0,0,0, .5);
            width: 300px;
            height: 60px;
            background-color: #fff;

        }

        .scale {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100px;
            height: 40px;
        }

        .scale_btn {
            display: block;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(0,0,0, .2);
            border-radius: 4px;
            font-size: 18px;
        }

        .color {
            width: 40px;
            height: 40px;
        }

        .clear {
            font-size: 30px;
            cursor: pointer;
        }
    `;
    document.querySelector('head').appendChild(style);
  }

  setBgColor() {
    document.body.style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }

  setScale() {
    const recursy = (element) => {
      element.childNodes.forEach((node) => {
        if (node.nodeName === '#text') {
          if (!node.parentNode.dataset.fz) {
            const value = window.getComputedStyle(node.parentNode).fontSize;
            node.parentNode.setAttribute('data-fz', value.replace(/\D/g, ''));
          }
          node.parentNode.style.fontSize = node.parentNode.dataset.fz * this.scale + 'px';
        } else {
          if (!node.classList.contains('panel')) recursy(node);
        }
      });
    };

    recursy(document.body);
  }

  onScaleChange(e) {
    this.scale = Number(e.target.value.replace(/x/g, ''));
    localStorage.setItem('scale', this.scale);
    this.setScale();
  }

  onColorChange(e) {
    this.color = e.target.value;
    localStorage.setItem('color', this.color);
    this.setBgColor();
  }

  reset() {
    localStorage.clear();
    this.scale = 1;
    this.color = '#ffffff';
    this.setBgColor();
    this.setScale();
  }

  render() {
    this.injectStyle();
    this.setBgColor();
    this.setScale();

    const panel = document.createElement('div');
    const scaleInputS = document.createElement('input');
    const scaleInputM = document.createElement('input');
    this.clear.innerHTML = `&times;`;

    panel.classList.add('panel');
    this.btnBLock.classList.add('scale');
    scaleInputS.classList.add('scale_btn');
    scaleInputM.classList.add('scale_btn');
    this.colorPicker.classList.add('color');
    this.clear.classList.add('clear');

    scaleInputS.setAttribute('type', 'button');
    scaleInputM.setAttribute('type', 'button');
    scaleInputS.setAttribute('value', '1x');
    scaleInputM.setAttribute('value', '1.5x');
    this.colorPicker.setAttribute('type', 'color');
    this.colorPicker.setAttribute('value', '#ffffff');

    document.body.append(panel);
    panel.append(this.btnBLock, this.colorPicker, this.clear);
    this.btnBLock.append(scaleInputS, scaleInputM);
  }
}
