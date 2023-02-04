import icon from 'url:../../img/icons.svg';
import { View } from './view';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage = 0;
  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );
    this._currentPage = this._data.page;
    if (this._currentPage === 1 && numberOfPages > 1)
      return this._btnNextRendorer();
    if (this._currentPage === numberOfPages && numberOfPages > 1)
      return this._btnPreviewRendorer();
    if (this._currentPage < numberOfPages)
      return `${this._btnPreviewRendorer()}${this._btnNextRendorer()}`;
    return '';
  }
  _btnPreviewRendorer() {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${
      this._currentPage - 1
    }">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._currentPage - 1}</span>
          </button>
    `;
  }
  _btnNextRendorer() {
    return `
    
    <button class="btn--inline pagination__btn--next"  data-goto="${
      this._currentPage + 1
    }">
            <span>Page${this._currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }
  paginationHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageNumber = btn.dataset.goto * 1;
      handler(pageNumber);
    });
  }
}
export default new PaginationView();
