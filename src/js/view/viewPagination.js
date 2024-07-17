'use strict';

import { async } from 'regenerator-runtime';

import { View } from './view.js';
import icons from '../../img/icons.svg';

class ViewPagination extends View {
  constructor() {
    super(document.querySelector('.pagination'), 'Cannot render pagination');
  }

  addHandlerPagination(handler) {
    this.parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const page = +btn.dataset.page;

      handler(page);
    });
  }

  renderData() {
    if (!this.stateData) return this.renderError();

    this.clear();

    const numberOfPage = Math.ceil(
      this.data.recipes.length / this.data.resultsPerPage
    );

    console.log(numberOfPage);
    console.log(this.data.recipes.length);
    console.log(this.data.resultsPerPage);

    let html;

    if (numberOfPage > 1 && this.data.curPage === 1) {
      html = `
            <button data-page=${
              this.data.curPage + 1
            } class="btn--inline pagination__btn--next">
                <span>Page ${this.data.curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    } else if (this.data.curPage > 1 && this.data.curPage < numberOfPage) {
      html = `
        <button data-page=${
          this.data.curPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.curPage - 1}</span>
        </button>

        <button data-page=${
          this.data.curPage + 1
        } class="btn--inline pagination__btn--next">
                <span>Page ${this.data.curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    } else if (this.data.curPage === numberOfPage) {
      html = `
            <button data-page=${
              this.data.curPage - 1
            } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.curPage - 1}</span>
        </button>
        `;
    }

    this.parentEl.insertAdjacentHTML('beforeend', html);
  }
}

export default new ViewPagination();
