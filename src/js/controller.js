import icon from 'url:../img/icons.svg';
import * as model from './model';
import bookmarksView from './view/bookmarksView';
import paginationView from './view/paginationView';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';

c;
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    resultsView.renderer(model.getSearchResultsPerPage());
    bookmarksView.renderer(model.state.bookMarks);
    await model.loadRecipe(id);
    recipeView.renderer(model.state.recipe);
  } catch (error) {
    recipeView.rendorError(error);
  }
};
const controlSearch = async () => {
  //get search query

  const query = searchView.getQuery();
  await model.loadSearchResults(query);
  //load search results

  resultsView.renderer(model.getSearchResultsPerPage());
  paginationView.renderer(model.state.search);
};
const controlPagination = dataGoto => {
  resultsView.renderer(model.getSearchResultsPerPage(dataGoto));
  paginationView.renderer(model.state.search);
};
const controlServings = newServings => {
  model.updateServingsFn(newServings);
  recipeView.renderer(model.state.recipe);
};
const controlBookMarks = () => {
  //Add bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.renderer(model.state.recipe);
  //Render bookmarks
  bookmarksView.renderer(model.state.bookMarks);
  //delete bookmarks
};
const init = function () {
  recipeView.addHandlerRendorer(controlRecipe);
  searchView.searchFnHandler(controlSearch);
  paginationView.paginationHandler(controlPagination);
  recipeView.servingsHandler(controlServings);
  recipeView.bookMarkHandler(controlBookMarks);
};
init();
