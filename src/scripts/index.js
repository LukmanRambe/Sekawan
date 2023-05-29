import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import DATA from '../DATA.json';

const drawer = document.querySelector('.nav-list');
const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', (event) => {
	event.stopPropagation();

	drawer.classList.toggle('open');
	if (drawer.classList.contains('open')) {
		menuButton.innerHTML = '&#10006';
	}
});

const restaurants = DATA;
const restaurantList = document.querySelector('.restaurant-list-content');

const showRestaurants = (data) => {
	let restaurantCards = '';

	data.restaurants.forEach((restaurant) => {
		restaurantCards += `
  <article id="${restaurant.id}" class="restaurant-card">
    <figure class="restaurant-card-header">
      <img src="${restaurant.pictureId}" alt="Foto ${restaurant.name}" />
    </figure>

    <article class="restaurant-card-body">
      <h3 class="restaurant-card-title">${restaurant.name}</h3>

      <div class="restaurant-card-subtitle">
        <h4 class="restaurant-card-city">${restaurant.city}</h4>
        <span> - </span>
        <div class="restaurant-card-rating">
          <img class="star-icon" src="/images/restaurant-card/star-icon.png" alt="Logo Bintang atau Rating" />
          <p>${restaurant.rating}</p>
        </div>
      </div>

      <p class="restaurant-card-description">
        ${restaurant.description.substring(0, 120)}...
      </p>
    </article>

    <a href="#" class="restaurant-card-overlay"></a>
  </article>
`;
	});

	restaurantList.innerHTML = restaurantCards;
};

showRestaurants(restaurants);
