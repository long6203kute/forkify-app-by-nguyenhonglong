'use strict';

import view from './view/view.js';
import viewRecipe from './view/viewRecipe.js';
import viewSearch from './view/viewSearch.js';
import viewResults from './view/viewResults.js';
import * as model from './model.js';
import { START_PAGE } from './config.js';
import viewPagination from './view/viewPagination.js';
import viewBookmark from './view/viewBookmark.js';
import viewAddRecipe from './view/viewAddRecipe.js';

const recipeContainer = document.querySelector('.recipe');
let curPage;

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const loadRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    viewRecipe.renderSpinner();

    await model.loadRecipe(id);

    viewRecipe.getData(model.state.recipe);

    viewRecipe.renderData();
  } catch (err) {
    console.log('error', err);
  }
};

const loadSearch = async function (searchValue) {
  try {
    if (!searchValue || searchValue === '')
      return viewResults.renderError(viewSearch.errMessage);

    viewSearch.clearInput();

    viewResults.renderSpinner();

    await model.loadResults(searchValue);

    const arrResults = model.loadResultsPerPage(START_PAGE);

    viewResults.getData(arrResults);

    viewResults.renderData();

    viewPagination.getData(model.state.search);

    viewPagination.renderData();
  } catch (err) {
    console.log('error', err);
  }
};

const loadPagination = function (page) {
  const arrResults = model.loadResultsPerPage(page);

  viewResults.getData(arrResults);

  viewResults.renderData();

  viewPagination.getData(model.state.search);

  viewPagination.renderData();
};

const loadUpdateServings = function (number) {
  if (number <= 0) return;

  console.log(number);

  model.loadUpdateServings(number);

  console.log(model.state.recipe);

  viewRecipe.getData(model.state.recipe);

  viewRecipe.renderData();
};

const loadBookmark = function () {
  const id = window.location.hash.slice(1);

  !model.state.recipe.bookmarks
    ? model.addBookmark(viewRecipe.data)
    : model.removeBookmark(viewRecipe.data.id);

  viewRecipe.getData(model.state.recipe);

  viewRecipe.renderData();

  viewBookmark.getData(model.state.bookmarks);

  viewBookmark.renderData(id);
};

const loadSubmitForm = async function (data) {
  try {
    const id = window.location.hash.slice(1);

    await model.loadSubmitForm(data);

    viewBookmark.getData(model.state.bookmarks);

    viewBookmark.renderData(id);

    viewRecipe.getData(model.state.recipe);

    viewRecipe.renderData();

    viewResults.getData(model.state.search.recipes);

    console.log(model.state.search.recipes);

    viewResults.renderData(id);

    viewAddRecipe.formOpenClose();
  } catch (err) {
    console.log('error', err);
  }
};

const hashChange = function () {
  const id = window.location.hash.slice(1);

  const arrResults = model.loadResultsPerPage(curPage);

  viewResults.getData(arrResults);

  viewResults.renderData(id);

  viewBookmark.getData(JSON.parse(localStorage.getItem('bookmark')));

  viewBookmark.renderData(id);
};

window.addEventListener('hashchange', hashChange);

const pageLoad = function () {
  const id = window.location.hash.slice(1);

  viewBookmark.getData(model.state.bookmarks);

  viewBookmark.renderData(id);

  viewResults.getData(model.state.addRecipe);

  viewResults.renderData(id);
};

window.addEventListener('load', pageLoad);

const init = function () {
  viewRecipe.addHandlerRecipe(loadRecipe);

  viewRecipe.addHandlerUpdateServings(loadUpdateServings);

  viewRecipe.addHandlerBookmark(loadBookmark);

  viewSearch.addHandlerSearch(loadSearch);

  viewPagination.addHandlerPagination(loadPagination);

  viewAddRecipe.addHandlerOpenForm();

  viewAddRecipe.addHandlerCloseForm();

  viewAddRecipe.addHandlerSubmitForm(loadSubmitForm);
};

init();
