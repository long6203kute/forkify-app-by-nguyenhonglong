'use strict';

import icons from '../../img/icons.svg';

export class View {
  data;

  stateData;
  constructor(parenEl, errMessage) {
    this.errMessage = errMessage;
    this.parentEl = parenEl;
  }

  getData(data) {
    if (!data || data.length === 0) return (this.stateData = false);

    this.data = data;

    return (this.stateData = true);
  }

  clear() {
    this.parentEl.innerHTML = '';
  }

  renderSpinner() {
    this.clear();

    const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;

    this.parentEl.insertAdjacentHTML('beforeend', html);
  }

  renderError(message = this.errMessage) {
    this.clear();

    const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this.parentEl.insertAdjacentHTML('beforeend', html);
  }
}
