'use strict';

import { API_URL, RESULTS_PER_PAGE, START_PAGE, KEY } from './config';
import * as helper from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    curPage: START_PAGE,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: JSON.parse(localStorage.getItem('bookmark'))
    ? [...JSON.parse(localStorage.getItem('bookmark'))]
    : [],
  addRecipe: JSON.parse(localStorage.getItem('addRecipe'))
    ? [...JSON.parse(localStorage.getItem('addRecipe'))]
    : [],
};

export const loadRecipe = async function (id) {
  try {
    const { recipe } = await helper.getJSON(`${API_URL}/${id}`);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      ...(recipe.key && { key: recipe.key }),
    };

    state.bookmarks.some((item) => item.id === id)
      ? (state.recipe.bookmarks = true)
      : (state.recipe.bookmarks = false);

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadResults = async function (query) {
  try {
    const { recipes } = await helper.getJSON(`${API_URL}?search=${query}`);

    console.log(recipes);

    const arrResults = recipes.map((item) => {
      return {
        id: item.id,
        title: item.title,
        publisher: item.publisher,
        image_url: item.image_url,
      };
    });

    state.search.recipes.unshift(...state.addRecipe);

    state.search.recipes.push(...arrResults);
  } catch (err) {
    throw err;
  }
};

export const loadResultsPerPage = function (pageNumber = state.search.curPage) {
  state.search.curPage = pageNumber;

  const startResult = (pageNumber - 1) * state.search.resultsPerPage;

  const endResult = pageNumber * state.search.resultsPerPage;

  const arrResults = state.search.recipes.slice(startResult, endResult);

  console.log(arrResults);

  return arrResults;
};

export const loadUpdateServings = function (number = state.recipe.servings) {
  state.recipe.ingredients.map((item) => {
    item.quantity = ((item.quantity * number) / state.recipe.servings).toFixed(
      2
    );
  });

  state.recipe.servings = number;

  return state.recipe;
};

export const addBookmark = function (recipe) {
  recipe.bookmarks = true;

  state.bookmarks.push(recipe);

  if (state.recipe.id === recipe.id) state.recipe.bookmarks = true;

  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);

  state.bookmarks.splice(index, 1);

  if (state.recipe.id === id) state.recipe.bookmarks = false;

  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const loadSubmitForm = async function (recipeData) {
  try {
    const convertRecipeToArr = Object.entries(recipeData);

    const arrIngredients = convertRecipeToArr
      .filter((item) => item[0].startsWith('ingredient') && item[1] !== '')
      .map((item) => {
        const [quantity, unit, description] = item[1].split(',');

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    console.log(arrIngredients);

    const convertRecipe = {
      title: recipeData.title,
      publisher: recipeData.publisher,
      source_url: recipeData.sourceUrl,
      image_url: recipeData.image,
      ingredients: arrIngredients,
      cooking_time: +recipeData.cookingTime,
      servings: +recipeData.servings,
    };

    const { recipe } = await helper.setJSON(
      `${API_URL}?key=${KEY}`,
      convertRecipe
    );

    const newRecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image_url: recipe.image_url,
      ingredients: recipe.ingredients,
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      ...(recipe.key && { key: recipe.key }),
    };

    addBookmark(newRecipe);

    state.recipe = newRecipe;

    state.addRecipe.unshift(newRecipe);

    state.search.recipes.unshift(...state.addRecipe);

    localStorage.setItem('addRecipe', JSON.stringify(state.addRecipe));
  } catch (err) {
    throw err;
  }
};
