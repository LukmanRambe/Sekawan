import API_ENDPOINT from "../globals/api-endpoint";

class TheRestaurantSource {
	static async restaurantList() {
		const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
		const responseJson = await response.json();

		return responseJson;
	}

	static async restaurantDetail(id) {
		const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
		const responseJson = await response.json();

		return responseJson;
	}

	static async searchRestaurant(query) {
		const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT(query));
		const responseJson = await response.json();

		return responseJson;
	}

	static async addReview(id, name, review) {
		const data = {
			id,
			name,
			review,
		};

		const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const responseJson = response.json();

		return responseJson;
	}
}

export default TheRestaurantSource;
