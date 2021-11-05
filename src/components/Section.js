export class Section {
    constructor({ items, renderer }, selector) {
            this._selector = document.querySelector(selector);
            this._items = items;
            this._renderer = renderer;

        }
        /**
         * метод добавления нового элемента
         *
         */
    addItem(newElement) {
            this._selector.prepend(newElement);
        }
        /**
         * метод для создания и добавления новых элементов в разметку
         *
         */
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);

        });
    }
}
