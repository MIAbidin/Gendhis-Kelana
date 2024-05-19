import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import App from './views/app';

import RestaurantList from './list';
import { fetchAllRecipes, createRecipeList } from './article-list.js';
import Footer from './footer';


const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#maincontent'),
}); 

window.addEventListener('hashchange', () => {
  app.renderPage();
});
 
window.addEventListener('load', () => {
  app.renderPage();
});






const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  document.body.appendChild(errorMessage);
};

const removeErrorMessage = () => {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
};

const checkInternetConnection = () => {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    displayErrorMessage('Tidak ada koneksi internet. Mohon periksa koneksi Anda.');
  } else {
    removeErrorMessage();
  }
};

window.addEventListener('load', checkInternetConnection);

window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);


fetch('./data/DATA.json')
  .then(response => response.json())
  .then(data => {
    const restaurants = data.restaurants;

    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = RestaurantList(restaurants);
      
  })
  .catch(error => console.error('Error fetching data:', error));


document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = 'e18bd0846c624a7d8c4aff44b5a6e6da';
  const numberOfRecipes = 5;

  try {
    const recipes = await fetchAllRecipes(apiKey, numberOfRecipes);
    const recipeList = createRecipeList(recipes);
    const articleListContainer = document.getElementById('article-list');
    articleListContainer.appendChild(recipeList);

  } catch (error) {
    console.error('Failed to load recipes:', error);
  }
});

const footerContainer = document.getElementById('footer');
footerContainer.innerHTML = Footer();

