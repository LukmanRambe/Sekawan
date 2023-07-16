import FavoriteRestaurantsIdb from "../src/scripts/data/favorite-restaurants-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Remove A Restaurant", () => {
	const favoriteButtonContainer = () => {
		document.body.innerHTML = '<div id="favorite-button-container"></div>';
	};

	beforeEach(async () => {
		favoriteButtonContainer();
		await FavoriteRestaurantsIdb.putRestaurant({ id: 1 });
	});

	afterEach(async () => {
		await FavoriteRestaurantsIdb.deleteRestaurant(1);
	});

	it("should display remove from restaurant button when the restaurant has been added to favorite", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		expect(
			document.querySelector('[aria-label="remove from favorite restaurant"]')
		).toBeTruthy();
	});

	it("should not display add to favorite restaurant button when the restaurant has been added to favorite", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		expect(
			document.querySelector('[aria-label="add to favorite restaurant"]')
		).toBeFalsy();
	});

	it("should be able to remove a restaurant from favorite list", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		document
			.querySelector('[aria-label="remove from favorite restaurant"]')
			.dispatchEvent(new Event("click"));

		expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
	});

	it("should not throw error if the removed from favorite restaurant is not in the list", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		await FavoriteRestaurantsIdb.deleteRestaurant(1);

		document
			.querySelector('[aria-label="remove from favorite restaurant"]')
			.dispatchEvent(new Event("click"));

		expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
	});
});
