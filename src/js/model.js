import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  query: '',
  recipe: {},
  bookMarks: [],
  search: {
    results: [],
    page: 1,
    resPerPage: RES_PER_PAGE,
  },
};
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      publisher: recipe.publisher,
      title: recipe.title,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      imageUrl: recipe.image_url,
    };
    state.bookMarks.some(bookmark => {
      if (bookmark.id === id) {
        state.recipe.bookmarked = true;
      }
    });
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async query => {
  const data = await getJSON(`${API_URL}?search=${query}`);
  state.search.results = data.data.recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      imageUrl: recipe.image_url,
    };
  });
  state.search.page = 1;
};
export const getSearchResultsPerPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resPerPage;
  const end = page * state.search.resPerPage;
  return state.search.results.slice(start, end);
};
export const updateServingsFn = newServings => {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity / state.recipe.servings) * newServings;

    ingredient.quantity = ingredient.quantity.toFixed(2);
  });
  state.recipe.servings = newServings;
};
// Add Bookmark
export const addBookMark = recipe => {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
//Delete Bookmark
export const deleteBookmark = id => {
  //delete unbookmarked recipe from bookmarks array
  const index = state.bookMarks.findIndex(bookmark => bookmark.id == id);
  state.bookMarks.splice(index, 1);
  //remove bookmarked icon
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
