import FavoriteRestaurantsIdb from "../../data/favorite-restaurants-idb";
import {
	createRestaurantItemTemplate,
	createItemSkeletonLoadingTemplate,
	createEmptyDataTemplate,
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
				const imageLink = document.createElement("link");
				imageLink.rel = "preload";
				imageLink.as = "image";
				imageLink.href = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
				document.body.appendChild(imageLink);

				restaurantsContainer.innerHTML += createRestaurantItemTemplate(
					restaurant,
					true
				);
			});
		} else {
			restaurantsContainer.style.display = "flex";
			restaurantsContainer.innerHTML += createEmptyDataTemplate(
				"There is No Favorite Restaurant"
			);
		}
	},
};

export default RestaurantList;
