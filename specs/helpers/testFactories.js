/* eslint-disable import/prefer-default-export */
import FavoriteRestaurantsIdb from "../../src/scripts/data/favorite-restaurants-idb";
import FavoriteButtonInitiator from "../../src/scripts/utils/favorite-button-presenter";

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
	await FavoriteButtonInitiator.init({
		favoriteButtonContainer: document.querySelector(
			"#favorite-button-container"
		),
		favoriteRestaurants: FavoriteRestaurantsIdb,
		restaurant,
	});
};

export { createFavoriteButtonPresenterWithRestaurant };
