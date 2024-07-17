'use strict';

import { View } from './view.js';

class ViewSearch extends View {
  constructor() {
    super(document.querySelector('.search'), 'Cannot search with your keyword');
  }

  clearInput() {
    return (this.parentEl.querySelector('.search__field').value = '');
  }

  addHandlerSearch(handler) {
    this.parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      let searchValue = this.querySelector('.search__field').value;

      searchValue = searchValue.trim().toLowerCase();

      handler(searchValue);
    });
  }
}

export default new ViewSearch();
