import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestaurantContract";
import FavoriteRestaurantsIdb from "../src/scripts/data/favorite-restaurants-idb";

describe("Favorite Restaurants IDB Contract Test Implementation", () => {
	afterEach(async () => {
		(await FavoriteRestaurantsIdb.getAllRestaurants()).forEach(
			async (restaurant) => {
				await FavoriteRestaurantsIdb.deleteRestaurant(restaurant.id);
			}
		);
	});

	itActsAsFavoriteRestaurantModel(FavoriteRestaurantsIdb);
});
