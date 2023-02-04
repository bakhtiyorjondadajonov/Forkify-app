import icon from 'url:../../img/icons.svg';
export class View {
  _data;
  renderer(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.rendorError('Query is not found,Please try another one!');
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();
    this.clearFn(markup);
  }
  rendorError(errorMessage = 'Something bad happened') {
    const markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${icon}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errorMessage}</p>
  </div>
      `;
    this.clearFn(markup);
  }
  clearFn(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
      <svg>
        <use href="${icon}#icon-loader"></use>
      </svg>
    </div>
`;
    this.clearFn(markup);
  }
}
