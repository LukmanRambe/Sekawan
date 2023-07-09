import TheRestaurantSource from "../../data/restaurants";
import UrlParser from "../../routes/url-parser";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import FavoriteButtonInitiator from "../../utils/favorite-button-initiator";

const RestaurantDetail = {
	async render() {
		return `
			<!-- Start: Restaurant Detail -->
			<section class="restaurant-detail">
				<article class="restaurant-detail-content"></article>
			</section>

			<div id="favorite-button-container"></div>
			<!-- End: Restaurant Detail -->
		`;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		const restaurantData = await TheRestaurantSource.restaurantDetail(url.id);
		const restaurant = restaurantData?.restaurant;
		const restaurantDetailContainer = document.querySelector(
			".restaurant-detail-content"
		);
		const favoriteButtonContainer = document.querySelector(
			"#favorite-button-container"
		);

		restaurantDetailContainer.innerHTML =
			createRestaurantDetailTemplate(restaurant);
		FavoriteButtonInitiator.init({
			favoriteButtonContainer,
			restaurant: {
				id: restaurant.id,
				name: restaurant.name,
				rating: restaurant.rating,
				city: restaurant.city,
				address: restaurant.address,
				pictureId: restaurant.pictureId,
				categories: restaurant.categories,
				description: restaurant.description,
				menus: {
					foods: restaurant.menus.foods,
					drinks: restaurant.menus.drinks,
				},
				customerReviews: restaurant.customerReviews,
			},
		});
	},
};

export default RestaurantDetail;
