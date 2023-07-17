Feature("Add Restaurant Review");

Before(({ I }) => {
	I.amOnPage("/#");
});

Scenario("success to add restaurant review", async ({ I }) => {
	I.waitForElement(".restaurant-card a", 10);
	I.seeElement(".restaurant-card a");

	const firstRestaurant = locate(".restaurant-card a").first();
	const firstRestaurantId = (await I.grabAttributeFrom(firstRestaurant, "href"))
		.split("/")
		.at(-1);
	I.click(firstRestaurant);

	I.waitForElement(".review-form", 5);
	I.seeElement(".review-form");

	const name = "Tes";
	const reviewText = "E2E Test Last";
	I.fillField("#name", name);
	I.fillField("#review", reviewText);
	I.click(".submit-review-button");
	I.seeTextEquals("Your Review Has Been Sent!", ".submit-review-button");

	I.sendGetRequest(`/detail/${firstRestaurantId}`);
	I.seeResponseCodeIsSuccessful();
	I.seeResponseContainsKeys(["restaurant"]);
	I.seeResponseContainsJson({
		restaurant: { customerReviews: [{ name, review: reviewText }] },
	});
});

Scenario("failed to add restaurant review", async ({ I }) => {
	I.waitForElement(".restaurant-card a", 10);
	I.seeElement(".restaurant-card a");

	const firstRestaurant = locate(".restaurant-card a").first();
	I.click(firstRestaurant);

	I.waitForElement(".review-form", 5);
	I.seeElement(".review-form");

	I.click(".submit-review-button");

	const nameError = locate(".review-form-error-text").first();
	const reviewError = locate(".review-form-error-text").at(2);
	I.seeTextEquals("Name is required!", nameError);
	I.seeTextEquals("Review is required!", reviewError);
});
