class Section {
  constructor({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(api) {
    api
      .then((data) => {
        data.forEach((item) => {
          this.addItem(this._renderer(item));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
