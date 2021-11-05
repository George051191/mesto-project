export default class Section {
  constructor({ items, render }, selector) {
    this._items = items;
    this._render = render;
    this._selector = document.querySelector(selector);
  }

  addItem(element) {
    this._selector.prepend(element);
  }

  renderItem() {
    this._items.forEach((item) => {
      this._render(item);
    });
  }
}
