import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import '../components/loading';
import '../components/error-message';
import '../components/no-found-message';

const Like = {
  async render() {
    return `
      <div class="app-main__content">
        <h2 class="content__heading">Your Liked Restaurants</h2>
        <div id="no-restaurants-container"></div>
        <loading-indicator></loading-indicator>
        <div id="restaurants" class="restaurant-list"></div>
        <div id="error-container"></div>
      </div>
    `;
  },

  async afterRender() {
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantsContainer = document.querySelector('#restaurants');
    const errorContainer = document.querySelector('#error-container');
    const noRestaurantsContainer = document.querySelector('#no-restaurants-container');

    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      if (restaurants.length === 0) {
        noRestaurantsContainer.innerHTML = '<no-restaurants-message></no-restaurants-message>';
      } else {
        restaurantsContainer.innerHTML = '';
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      }
    } catch (error) {
      errorContainer.innerHTML = '<error-message message="Failed to load liked restaurants. Please try again later."></error-message>';
    } finally {
      loadingElement.style.display = 'none';
    }
  },
};

export default Like;
