const RestaurantList = (restaurants) => {
  return `
    <div class="restaurant-list-container">
      <h1 class="restaurant-list-title">Explore Restaurant</h1>
      <div class="restaurant-list">
        ${restaurants.map(restaurant => `
          <div class="restaurant-item">
            <div class="restaurant-item__image-container">
              <img class="restaurant-item__image" src="${restaurant.pictureId}" alt="${restaurant.name}">
            </div>
            <span class="restaurant-item__city">${restaurant.city}</span>
            <span class="restaurant-item__rating">${restaurant.rating}</span>
            <div class="restaurant-item__info">
              <h2 class="restaurant-item__name">${restaurant.name}</h2>
              <p class="restaurant-item__description">${restaurant.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

export default RestaurantList;