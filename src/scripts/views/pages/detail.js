import TheRestaurantSource from "../../data/restaurants";
import UrlParser from "../../routes/url-parser";
import {
	createRestaurantDetailTemplate,
	createFailedToFetchDataTemplate,
} from "../templates/template-creator";
import FavoriteButtonPresenter from "../../utils/favorite-button-presenter";
import FavoriteRestaurantsIdb from "../../data/favorite-restaurants-idb";
import RestaurantReviewFormPresenter from "../../utils/restaurant-review-form-initiator";

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

		if (restaurantData.error) {
			restaurantDetailContainer.style.display = "flex";
			restaurantDetailContainer.innerHTML += createFailedToFetchDataTemplate(
				"Failed To Retrieve Restaurant Data"
			);

			return;
		}

		restaurantDetailContainer.innerHTML =
			createRestaurantDetailTemplate(restaurant);
		FavoriteButtonPresenter.init({
			favoriteButtonContainer,
			favoriteRestaurants: FavoriteRestaurantsIdb,
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

		const restaurantReviewForm = document.querySelector(".review-form");

		RestaurantReviewFormPresenter.init({
			restaurantReviewForm,
			restaurantReview: TheRestaurantSource,
			restaurantId: restaurant.id,
		});
	},
};

export default RestaurantDetail;
