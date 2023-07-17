import API_ENDPOINT from "../globals/api-endpoint";

class TheRestaurantSource {
	static async restaurantList() {
		try {
			const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
			const responseJson = await response.json();

			return responseJson;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async restaurantDetail(id) {
		try {
			const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
			const responseJson = await response.json();

			return responseJson;
		} catch (error) {
			throw new Error(error);
		}
	}

	static async addReview(id, name, review) {
		const data = {
			id,
			name,
			review,
		};

		try {
			const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const responseJson = response.json();

			return responseJson;
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default TheRestaurantSource;
