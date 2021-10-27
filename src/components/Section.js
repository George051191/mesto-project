export default class Section {
  constructor({ data, render }, selector) {
    this._data = data;
    this._render = render;
    this._selector = document.querySelector(selector);
  }

  setItem(element) {
    this._selector.append(element);
  }

  renderItem() {
    this._data.forEach((item) => {
      this._render(item);
    });
  }
}
