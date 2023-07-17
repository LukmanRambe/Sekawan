import FavoriteRestaurantsIdb from "../src/scripts/data/favorite-restaurants-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Favorite A Restaurant", () => {
	const favoriteButtonContainer = () => {
		document.body.innerHTML = '<div id="favorite-button-container"></div>';
	};

	beforeEach(() => {
		favoriteButtonContainer();
	});

	it("should display the add to favorite button when the restaurant has not been added to favorite before", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		expect(
			document.querySelector('[aria-label="add to favorite restaurant"]')
		).toBeTruthy();
	});

	it("should not display the remove from favorite button when the restaurant has not been added to favorite before", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		expect(
			document.querySelector('[aria-label="remove from favorite restaurant"]')
		).toBeFalsy();
	});

	it("should be able to add favorite restaurant", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		document
			.querySelector("#favorite-button")
			.dispatchEvent(new Event("click"));

		const restaurant = await FavoriteRestaurantsIdb.getRestaurant(1);

		expect(restaurant).toEqual({ id: 1 });

		await FavoriteRestaurantsIdb.deleteRestaurant(1);
	});

	it("should not add a restaurant again when it's already added to favorite", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

		await FavoriteRestaurantsIdb.putRestaurant({ id: 1 });

		document
			.querySelector("#favorite-button")
			.dispatchEvent(new Event("click"));

		expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([
			{ id: 1 },
		]);

		await FavoriteRestaurantsIdb.deleteRestaurant(1);
	});

	it("should not add a restaurant when it has no id", async () => {
		await TestFactories.createFavoriteButtonPresenterWithRestaurant({});

		document
			.querySelector("#favorite-button")
			.dispatchEvent(new Event("click"));

		expect(await FavoriteRestaurantsIdb.getAllRestaurants()).toEqual([]);
	});
});
