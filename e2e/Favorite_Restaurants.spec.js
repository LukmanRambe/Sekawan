const assert = require("assert");

Feature("Add and Remove Favorite Restaurants");

Before(({ I }) => {
	I.amOnPage("/#/favorite-restaurants");
});

Scenario("showing empty favorite restaurants", ({ I }) => {
	I.see("No Favorite Restaurant", ".no-data p");
});

Scenario("add and remove one favorite restaurant", async ({ I }) => {
	I.see("No Favorite Restaurant", ".no-data p");

	I.amOnPage("/");

	I.waitForElement(".restaurant-card a", 5);
	I.seeElement(".restaurant-card a");

	const firstRestaurant = locate(".restaurant-card a").first();
	const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
	I.click(firstRestaurant);

	I.waitForElement("#favorite-button", 5);
	I.seeElement("#favorite-button");
	I.click("#favorite-button");

	I.amOnPage("/#/favorite-restaurants");
	I.waitForElement(".restaurant-card", 5);
	I.seeElement(".restaurant-card");
	const favoritedRestaurantName = await I.grabTextFrom(
		".restaurant-card-title"
	);

	assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

	I.waitForElement(".restaurant-card a", 5);
	I.seeElement(".restaurant-card a");
	I.click(".restaurant-card a");

	I.waitForElement("#favorite-button", 5);
	I.seeElement("#favorite-button");
	I.click("#favorite-button");

	I.amOnPage("/#/favorite-restaurants");
	I.see("No Favorite Restaurant", ".no-data p");
	I.dontSeeElement(".restaurant-card");
	I.dontSeeElement(".restaurant-card a");
});
