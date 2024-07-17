'use strict';

import { View } from './view.js';
import icons from '../../img/icons.svg';

class ViewResults extends View {
  constructor() {
    super(
      document.querySelector('.results'),
      'Cannot search with your keyword'
    );
  }

  renderData(id) {
    if (!this.stateData) return this.renderError();

    this.clear();

    const userIcon = `
        <div class="preview__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
        </div>
    `;

    const html = `
        ${this.data
          .map((item) => {
            return `
                <li class="preview">
                    <a class="preview__link ${
                      item.id === id ? 'preview__link--active' : ''
                    }" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image_url}" alt="${item.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                            ${item.key ? userIcon : ''}
                    </div>
                    </a>
                </li>
            `;
          })
          .join('')}
    `;

    this.parentEl.insertAdjacentHTML('beforeend', html);
  }
}

export default new ViewResults();
