import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';


const Home = {
  async render() {
    return `
      <section class="app-main__hero">
        <p class="app-main__hero__content">Welcome to Culinary Adventure!</p>
      </section>
      <section class="app-main__content">
        <h2 class="content__heading">Discover Amazing Restaurants</h2>
        <div id="restaurants" class="restaurant-list"></div>
      </section>
    `;
  },
 
  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};
 
export default Home;