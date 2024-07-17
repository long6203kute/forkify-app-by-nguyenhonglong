'use strict';

import { async } from 'regenerator-runtime/runtime';

import icons from '../../img/icons.svg';

import { View } from './view.js';

class ViewRecipe extends View {
  constructor() {
    super(document.querySelector('.recipe'), 'Can not render recipe');
  }

  addHandlerRecipe(handler) {
    window.addEventListener('load', handler);

    window.addEventListener('hashchange', handler);
  }

  addHandlerUpdateServings(handler) {
    this.parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');

      if (!btn) return;

      const servings = +btn.dataset.servings;

      handler(servings);
    });
  }

  addHandlerBookmark(handler) {
    this.parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }

  renderHTML(data) {
    console.log(data.bookmarks);
    const userIcon = `
        <svg>
            <use href="${icons}#icon-user"></use>
        </svg>
    `;
    return `
        <figure class="recipe__fig">
          <img src="${data.image_url}" alt="${
      data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              data.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-servings=${
                data.servings - 1
              } class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-servings=${
                data.servings + 1
              } class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            ${data.key ? userIcon : ''}
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      data.bookmarks ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${data.ingredients
              .map((item) => {
                return `
                    <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${
                      item.quantity ? item.quantity : ''
                    }</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${item.unit}</span>
                        ${item.description}
                    </div>
                    </li>
                `;
              })
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  renderData() {
    if (!this.stateData) return this.renderError();

    this.clear();

    const html = this.renderHTML(this.data);

    this.parentEl.insertAdjacentHTML('beforeend', html);
  }
}

export default new ViewRecipe();
