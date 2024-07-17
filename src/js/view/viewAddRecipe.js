'use strict';

import { View } from './view.js';

class ViewAddRecipe extends View {
  constructor() {
    super(document.querySelector('.upload'), '');
  }

  btnOpen = document.querySelector('.nav__btn--add-recipe');

  btnClose = document.querySelector('.btn--close-modal');

  overlay = document.querySelector('.overlay');

  windowForm = document.querySelector('.add-recipe-window');

  formOpenClose() {
    this.overlay.classList.toggle('hidden');

    this.windowForm.classList.toggle('hidden');
  }

  addHandlerOpenForm() {
    this.btnOpen.addEventListener('click', this.formOpenClose.bind(this));
  }

  addHandlerCloseForm() {
    this.btnClose.addEventListener('click', this.formOpenClose.bind(this));

    this.overlay.addEventListener('click', this.formOpenClose.bind(this));
  }

  addHandlerSubmitForm(handler) {
    this.parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(this));

      console.log(data);

      return handler(data);
    });
  }
}

export default new ViewAddRecipe();
