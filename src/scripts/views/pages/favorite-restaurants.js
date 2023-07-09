import FavoriteRestaurantsIdb from "../../data/favorite-restaurants-idb";
import {
	createRestaurantItemTemplate,
	createItemSkeletonLoadingTemplate,
} from "../templates/template-creator";

const RestaurantList = {
	async render() {
		return `
		<!-- Start: Restaurant List -->
		<section class="restaurant-list favorite-restaurant-list">
			<h2 class="section-title restaurant-list-title">Favorite Restaurants</h2>

			<article class="restaurant-list-content">
				${createItemSkeletonLoadingTemplate(3)}
			</article>
		</section>
		<!-- End: Restaurant List -->
    `;
	},

	async afterRender() {
		const restaurantsData = await FavoriteRestaurantsIdb.getAllRestaurants();
		const restaurantsContainer = document.querySelector(
			".restaurant-list-content"
		);

		restaurantsContainer.innerHTML = "";
		if (restaurantsData?.length > 0) {
			restaurantsData.forEach((restaurant) => {
				restaurantsContainer.innerHTML +=
					createRestaurantItemTemplate(restaurant);
			});
		} else {
			restaurantsContainer.classList.remove("restaurant-list-content");
			restaurantsContainer.innerHTML += `
				<article class="no-data">
					<p>No Favorite Restaurant</p>
				</article>
			`;
		}
	},
};

export default RestaurantList;
