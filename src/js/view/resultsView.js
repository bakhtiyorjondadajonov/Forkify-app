import icon from 'url:../../img/icons.svg';
import { View } from './view';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(eachResult) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview ${id === eachResult.id ? `preview__link--active` : ''}">
    <a class="preview__link " href="#${eachResult.id}">
      <figure class="preview__fig">
        <img src="${eachResult.imageUrl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${eachResult.title}</h4>
        <p class="preview__publisher">${eachResult.publisher}</p>
        
      </div>
    </a>
  </li>`;
  }
}
export default new ResultsView();
