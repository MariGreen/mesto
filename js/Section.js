import { initialCards } from './inititialCards.js';

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // clear() {
  //   this._container.innerHTML = '';
  // }

  renderItems() {
    //рендерит каждый элемент массива
    //this.clear();
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    //добавляет в начало
    this._container.prepend(element);
  }
}

export { Section };
